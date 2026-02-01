import AgentCard from './components/AgentCard'
import { prisma } from '@/lib/prisma'

async function getAgents() {
  const agents = await prisma.agent.findMany({
    include: {
      actions: {
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return agents.map(agent => {
    const monthlySpend = agent.actions.reduce((sum, action) => sum + action.cost, 0)
    return {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      status: agent.status,
      monthlyBudget: agent.monthlyBudget,
      perActionLimit: agent.perActionLimit,
      monthlySpend,
      budgetRemaining: agent.monthlyBudget - monthlySpend
    }
  })
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const agents = await getAgents()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
        <span className="text-sm text-gray-500">{agents.length} agent(s)</span>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No agents registered yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Use the API to create agents and log actions.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  )
}
