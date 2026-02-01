import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: {
        actions: {
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        alerts: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const agentsWithSpend = agents.map(agent => {
      const monthlySpend = agent.actions.reduce((sum, action) => sum + action.cost, 0)
      return {
        ...agent,
        monthlySpend,
        budgetRemaining: agent.monthlyBudget - monthlySpend
      }
    })

    return NextResponse.json(agentsWithSpend)
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        role: body.role,
        ownerId: body.ownerId,
        monthlyBudget: body.monthlyBudget,
        perActionLimit: body.perActionLimit,
        status: body.status || 'active'
      }
    })

    return NextResponse.json(agent, { status: 201 })
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 })
  }
}
