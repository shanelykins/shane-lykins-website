'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Agent {
  id: string
  name: string
  role: string
  ownerId: string
  status: string
  monthlyBudget: number
  perActionLimit: number
  monthlySpend: number
  budgetRemaining: number
  createdAt: string
  actions: Array<{
    id: string
    actionType: string
    target: string
    cost: number
    outcome: string
    metadata: string | null
    createdAt: string
  }>
  alerts: Array<{
    id: string
    type: string
    message: string
    createdAt: string
  }>
}

export default function AgentDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionPending, setActionPending] = useState(false)

  useEffect(() => {
    fetchAgent()
  }, [id])

  async function fetchAgent() {
    try {
      const res = await fetch(`/api/agents/${id}`)
      if (!res.ok) throw new Error('Agent not found')
      const data = await res.json()
      setAgent(data)
    } catch {
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function sendAction(cost: number, actionType: string) {
    if (!agent || actionPending) return
    setActionPending(true)
    try {
      const res = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          actionType,
          target: 'openai:gpt-4',
          cost,
          outcome: 'success',
          metadata: JSON.stringify({ simulated: true, tokens: Math.floor(cost * 15000) })
        })
      })
      await fetchAgent()
    } finally {
      setActionPending(false)
    }
  }

  async function resetDemo() {
    if (!agent || actionPending) return
    setActionPending(true)
    try {
      await fetch(`/api/agents/${id}/reset`, { method: 'POST' })
      await fetchAgent()
    } finally {
      setActionPending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!agent) {
    return null
  }

  const isPaused = agent.status === 'paused'
  const budgetPercentage = (agent.monthlySpend / agent.monthlyBudget) * 100

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push('/')}
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to agents
      </button>

      {/* Agent Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
              {isPaused ? (
                <span className="px-3 py-1 rounded text-sm font-semibold bg-red-600 text-white uppercase tracking-wide">
                  Stopped
                </span>
              ) : (
                <span className="px-3 py-1 rounded text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              )}
            </div>
            <p className="text-gray-500 mt-1">{agent.role}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Monthly Budget</div>
            <div className="text-2xl font-bold text-gray-900">${agent.monthlyBudget.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500">Spent this month</div>
            <div className={`text-xl font-semibold ${isPaused ? 'text-red-600' : 'text-gray-900'}`}>
              ${agent.monthlySpend.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Remaining</div>
            <div className={`text-xl font-semibold ${agent.budgetRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${agent.budgetRemaining.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Per-action limit</div>
            <div className="text-xl font-semibold text-gray-900">${agent.perActionLimit.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              budgetPercentage >= 100 ? 'bg-red-600' : budgetPercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* System Intervention Alert */}
      {isPaused && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-red-800">Agent Stopped by System</h3>
              <p className="text-sm text-red-700 mt-1">
                This agent was stopped because it exceeded its ${agent.monthlyBudget.toFixed(2)} monthly budget.
                You allowed a maximum of ${agent.perActionLimit.toFixed(2)} per action.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Demo Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => sendAction(2, 'api_call')}
              disabled={isPaused || actionPending}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                isPaused || actionPending
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Send safe action ($2)
            </button>
            <button
              onClick={() => sendAction(100, 'api_call')}
              disabled={isPaused || actionPending}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                isPaused || actionPending
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Send violating action ($100)
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={resetDemo}
              disabled={actionPending}
              className="px-4 py-2 rounded text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Reset demo state
            </button>
          </div>
          <span className="text-xs text-gray-400">
            Demo only
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Demo actions simulate agent behavior. No real money or APIs are used.
        </p>
      </div>

      {/* Activity Log - THE HERO */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Activity Log
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {agent.actions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No activity recorded
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {agent.actions.map((action, index) => (
                  <tr key={action.id} className={index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                      {new Date(action.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {action.actionType}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                      {action.target}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right font-mono">
                      ${action.cost.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          action.outcome === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {action.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
