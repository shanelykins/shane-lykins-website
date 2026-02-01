import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. Check agent exists
    const agent = await prisma.agent.findUnique({
      where: { id: body.agentId }
    })

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    // 2. Check agent is active
    if (agent.status === 'paused') {
      return NextResponse.json({ error: 'Agent is paused' }, { status: 403 })
    }

    // 3. Check per-action limit
    if (body.cost > agent.perActionLimit) {
      return NextResponse.json(
        { error: `Exceeds per-action limit of $${agent.perActionLimit}` },
        { status: 400 }
      )
    }

    // 4. Calculate current month's spend
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    const monthlySpendResult = await prisma.actionLog.aggregate({
      where: {
        agentId: body.agentId,
        createdAt: { gte: monthStart }
      },
      _sum: { cost: true }
    })

    const currentSpend = monthlySpendResult._sum.cost || 0
    const totalSpend = currentSpend + body.cost

    // 5. Check monthly budget
    if (totalSpend > agent.monthlyBudget) {
      // Auto-pause agent and create alert
      await prisma.$transaction([
        prisma.agent.update({
          where: { id: agent.id },
          data: { status: 'paused' }
        }),
        prisma.alert.create({
          data: {
            agentId: agent.id,
            type: 'budget_exceeded',
            message: `Agent auto-paused: monthly budget of $${agent.monthlyBudget} exceeded (attempted spend: $${totalSpend.toFixed(2)})`
          }
        })
      ])

      return NextResponse.json(
        { error: 'Monthly budget exceeded. Agent has been paused.' },
        { status: 403 }
      )
    }

    // 6. Log the action
    const action = await prisma.actionLog.create({
      data: {
        agentId: body.agentId,
        actionType: body.actionType,
        target: body.target,
        cost: body.cost,
        outcome: body.outcome,
        metadata: body.metadata || null
      }
    })

    return NextResponse.json(action, { status: 201 })
  } catch (error) {
    console.error('Error logging action:', error)
    return NextResponse.json({ error: 'Failed to log action' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')

    const actions = await prisma.actionLog.findMany({
      where: agentId ? { agentId } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        agent: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json(actions)
  } catch (error) {
    console.error('Error fetching actions:', error)
    return NextResponse.json({ error: 'Failed to fetch actions' }, { status: 500 })
  }
}
