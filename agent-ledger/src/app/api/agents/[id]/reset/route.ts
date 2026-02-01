import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Reset agent status to active
    await prisma.agent.update({
      where: { id },
      data: { status: 'active' }
    })

    // Delete all actions for this agent (resets spend to $0)
    await prisma.actionLog.deleteMany({
      where: { agentId: id }
    })

    // Delete all alerts for this agent
    await prisma.alert.deleteMany({
      where: { agentId: id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting agent:', error)
    return NextResponse.json({ error: 'Failed to reset agent' }, { status: 500 })
  }
}
