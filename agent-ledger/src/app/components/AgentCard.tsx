'use client'

import Link from 'next/link'

interface AgentCardProps {
  agent: {
    id: string
    name: string
    role: string
    status: string
    monthlyBudget: number
    perActionLimit: number
    monthlySpend: number
    budgetRemaining: number
  }
  isSimulating?: boolean
}

function getAvatarUrl(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const seed = Math.abs(hash) % 70 + 1
  return `https://i.pravatar.cc/150?img=${seed}`
}

export default function AgentCard({ agent, isSimulating }: AgentCardProps) {
  const budgetPercentage = (agent.monthlySpend / agent.monthlyBudget) * 100
  const isOverBudget = budgetPercentage >= 100
  const isWarning = budgetPercentage >= 80
  const avatarUrl = getAvatarUrl(agent.name)
  const isActive = agent.status === 'active'

  return (
    <Link href={`/agents/${agent.id}`}>
      <div className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-white ${isSimulating && isActive ? 'ring-2 ring-blue-200' : ''}`}>
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar with activity indicator */}
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={agent.name}
              className={`w-11 h-11 rounded-full object-cover ${!isActive ? 'opacity-50 grayscale' : ''}`}
            />
            {/* Activity pulse */}
            {isActive && isSimulating && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
              </span>
            )}
            {isActive && !isSimulating && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
              </span>
            )}
            {!isActive && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
            </div>
            <p className="text-sm text-gray-500 truncate">{agent.role}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Budget</span>
            <span className="font-medium">${agent.monthlyBudget.toFixed(0)}/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Spent</span>
            <span className={`font-medium font-mono ${isOverBudget ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-900'}`}>
              ${agent.monthlySpend.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                isOverBudget ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
              {isActive ? 'Running' : 'Stopped'}
            </span>
            <span className="text-xs text-gray-400">
              {budgetPercentage.toFixed(0)}% used
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
