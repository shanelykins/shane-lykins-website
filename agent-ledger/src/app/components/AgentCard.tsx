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
}

export default function AgentCard({ agent }: AgentCardProps) {
  const budgetPercentage = (agent.monthlySpend / agent.monthlyBudget) * 100
  const isOverBudget = budgetPercentage >= 100
  const isWarning = budgetPercentage >= 80

  return (
    <Link href={`/agents/${agent.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              agent.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {agent.status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monthly Budget</span>
            <span className="font-medium">${agent.monthlyBudget.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Spent</span>
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-900'}`}>
              ${agent.monthlySpend.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                isOverBudget ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Per-action limit: ${agent.perActionLimit.toFixed(2)}</span>
            <span>{budgetPercentage.toFixed(0)}% used</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
