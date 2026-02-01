'use client'

import Link from 'next/link'
import Image from 'next/image'

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
}

function getAvatarUrl(name: string): string {
  // Generate consistent avatar based on name hash
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const seed = Math.abs(hash) % 70 + 1
  return `https://i.pravatar.cc/150?img=${seed}`
}

export default function AgentCard({ agent }: AgentCardProps) {
  const budgetPercentage = (agent.monthlySpend / agent.monthlyBudget) * 100
  const isOverBudget = budgetPercentage >= 100
  const isWarning = budgetPercentage >= 80
  const avatarUrl = getAvatarUrl(agent.name)

  return (
    <Link href={`/agents/${agent.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
        <div className="flex items-start gap-3 mb-3">
          <img
            src={avatarUrl}
            alt={agent.name}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                  agent.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-600 text-white'
                }`}
              >
                {agent.status === 'active' ? 'Active' : 'Stopped'}
              </span>
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
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-900'}`}>
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
          <div className="text-xs text-gray-400 text-right">
            {budgetPercentage.toFixed(0)}% used
          </div>
        </div>
      </div>
    </Link>
  )
}
