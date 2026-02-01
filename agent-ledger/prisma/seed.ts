import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.actionLog.deleteMany()
  await prisma.alert.deleteMany()
  await prisma.agent.deleteMany()

  // Create Agent 1: Active with moderate usage
  const agent1 = await prisma.agent.create({
    data: {
      name: 'Research Assistant',
      role: 'Data analysis and report generation',
      ownerId: 'user_001',
      monthlyBudget: 50.00,
      perActionLimit: 2.00,
      status: 'active'
    }
  })

  // Create Agent 2: Paused (budget exceeded)
  const agent2 = await prisma.agent.create({
    data: {
      name: 'Code Generator',
      role: 'Automated code review and generation',
      ownerId: 'user_001',
      monthlyBudget: 25.00,
      perActionLimit: 5.00,
      status: 'paused'
    }
  })

  // Sample actions for Agent 1
  const agent1Actions = [
    { actionType: 'api_call', target: 'openai:gpt-4', cost: 0.15, outcome: 'success', metadata: '{"tokens": 2500}' },
    { actionType: 'api_call', target: 'openai:gpt-4', cost: 0.08, outcome: 'success', metadata: '{"tokens": 1200}' },
    { actionType: 'web_search', target: 'tavily:search', cost: 0.01, outcome: 'success', metadata: '{"queries": 3}' },
    { actionType: 'api_call', target: 'openai:gpt-4-turbo', cost: 0.25, outcome: 'success', metadata: '{"tokens": 4000}' },
    { actionType: 'file_write', target: 'reports/analysis.md', cost: 0.00, outcome: 'success', metadata: null },
    { actionType: 'api_call', target: 'anthropic:claude-3', cost: 0.18, outcome: 'failure', metadata: '{"error": "rate_limit"}' },
    { actionType: 'api_call', target: 'anthropic:claude-3', cost: 0.12, outcome: 'success', metadata: '{"tokens": 1800}' },
  ]

  for (const action of agent1Actions) {
    await prisma.actionLog.create({
      data: {
        agentId: agent1.id,
        ...action,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
      }
    })
  }

  // Sample actions for Agent 2 (showing why it got paused)
  const agent2Actions = [
    { actionType: 'api_call', target: 'openai:gpt-4', cost: 4.50, outcome: 'success', metadata: '{"tokens": 75000}' },
    { actionType: 'code_review', target: 'github:pr-123', cost: 3.20, outcome: 'success', metadata: '{"files": 45}' },
    { actionType: 'api_call', target: 'openai:gpt-4', cost: 4.80, outcome: 'success', metadata: '{"tokens": 80000}' },
    { actionType: 'code_gen', target: 'project:backend', cost: 4.90, outcome: 'success', metadata: '{"lines": 2500}' },
    { actionType: 'api_call', target: 'openai:gpt-4', cost: 4.60, outcome: 'success', metadata: '{"tokens": 77000}' },
    { actionType: 'api_call', target: 'openai:gpt-4', cost: 3.50, outcome: 'success', metadata: '{"tokens": 58000}' },
  ]

  for (const action of agent2Actions) {
    await prisma.actionLog.create({
      data: {
        agentId: agent2.id,
        ...action,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      }
    })
  }

  // Create alert for Agent 2
  await prisma.alert.create({
    data: {
      agentId: agent2.id,
      type: 'budget_exceeded',
      message: 'Agent auto-paused: monthly budget of $25.00 exceeded (total spend: $25.50)'
    }
  })

  console.log('Seed data created successfully!')
  console.log(`Agent 1 (${agent1.name}): ${agent1.id}`)
  console.log(`Agent 2 (${agent2.name}): ${agent2.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
