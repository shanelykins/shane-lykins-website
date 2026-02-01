import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TARGETS = [
  'openai:gpt-4',
  'openai:gpt-4-turbo',
  'anthropic:claude-3',
  'anthropic:claude-3-opus',
  'google:gemini-pro',
  'cohere:command-r',
  'mistral:large',
]

const ACTION_TYPES = ['api_call', 'embedding', 'completion', 'chat', 'web_search', 'code_review']

function randomTarget() {
  return TARGETS[Math.floor(Math.random() * TARGETS.length)]
}

function randomActionType() {
  return ACTION_TYPES[Math.floor(Math.random() * ACTION_TYPES.length)]
}

function randomCost(max: number) {
  return Math.round(Math.random() * max * 100) / 100
}

async function createAgentWithActions(
  name: string,
  role: string,
  monthlyBudget: number,
  perActionLimit: number,
  status: 'active' | 'paused',
  actionCount: number,
  maxActionCost: number
) {
  const agent = await prisma.agent.create({
    data: {
      name,
      role,
      ownerId: 'acme_corp',
      monthlyBudget,
      perActionLimit,
      status
    }
  })

  for (let i = 0; i < actionCount; i++) {
    const cost = randomCost(maxActionCost)
    await prisma.actionLog.create({
      data: {
        agentId: agent.id,
        actionType: randomActionType(),
        target: randomTarget(),
        cost,
        outcome: Math.random() > 0.1 ? 'success' : 'failure',
        metadata: JSON.stringify({ tokens: Math.floor(cost * 15000) }),
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      }
    })
  }

  if (status === 'paused') {
    await prisma.alert.create({
      data: {
        agentId: agent.id,
        type: 'budget_exceeded',
        message: `Agent auto-paused: monthly budget of $${monthlyBudget.toFixed(2)} exceeded`
      }
    })
  }

  return agent
}

async function main() {
  // Clear existing data
  await prisma.actionLog.deleteMany()
  await prisma.alert.deleteMany()
  await prisma.agent.deleteMany()

  // Create agents with first names only
  const agents = [
    { name: 'Alex', role: 'Research Analyst', budget: 150, limit: 5, status: 'active' as const, actions: 24, maxCost: 4 },
    { name: 'Sarah', role: 'Customer Support', budget: 75, limit: 2, status: 'active' as const, actions: 45, maxCost: 1.5 },
    { name: 'Marcus', role: 'Code Reviewer', budget: 200, limit: 8, status: 'active' as const, actions: 18, maxCost: 6 },
    { name: 'Elena', role: 'Content Writer', budget: 50, limit: 2, status: 'active' as const, actions: 32, maxCost: 1.8 },
    { name: 'James', role: 'Data Pipeline', budget: 300, limit: 10, status: 'active' as const, actions: 12, maxCost: 8 },
    { name: 'Priya', role: 'QA Tester', budget: 100, limit: 3, status: 'active' as const, actions: 28, maxCost: 2.5 },
    { name: 'David', role: 'Security Auditor', budget: 125, limit: 4, status: 'active' as const, actions: 15, maxCost: 3.5 },
    { name: 'Rachel', role: 'Marketing Analyst', budget: 80, limit: 2.5, status: 'active' as const, actions: 38, maxCost: 2 },
    { name: 'Michael', role: 'DevOps Assistant', budget: 25, limit: 5, status: 'paused' as const, actions: 8, maxCost: 4.5 },
    { name: 'Lisa', role: 'Financial Reports', budget: 60, limit: 2, status: 'active' as const, actions: 22, maxCost: 1.8 },
    { name: 'Chris', role: 'Sales Intelligence', budget: 90, limit: 3, status: 'active' as const, actions: 35, maxCost: 2.8 },
    { name: 'Nina', role: 'HR Documentation', budget: 40, limit: 1.5, status: 'paused' as const, actions: 42, maxCost: 1.2 },
  ]

  console.log('Creating agents...')

  for (const agentData of agents) {
    const agent = await createAgentWithActions(
      agentData.name,
      agentData.role,
      agentData.budget,
      agentData.limit,
      agentData.status,
      agentData.actions,
      agentData.maxCost
    )
    console.log(`  Created: ${agent.name} (${agentData.status})`)
  }

  console.log('\nSeed data created successfully!')
  console.log(`Total agents: ${agents.length}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
