'use client'

import { useState, useEffect, useCallback } from 'react'
import AgentCard from './components/AgentCard'

interface Agent {
  id: string
  name: string
  role: string
  status: string
  monthlyBudget: number
  perActionLimit: number
  monthlySpend: number
  budgetRemaining: number
}

const TARGETS = [
  'openai:gpt-4',
  'openai:gpt-4-turbo',
  'anthropic:claude-3',
  'google:gemini-pro',
  'mistral:large',
]

const ACTION_TYPES = ['api_call', 'embedding', 'completion', 'chat']

export default function HomePage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [simulating, setSimulating] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState<'slow' | 'fast'>('slow')

  const fetchAgents = useCallback(async () => {
    try {
      const res = await fetch('/api/agents')
      const data = await res.json()
      setAgents(data)
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAgents()
  }, [fetchAgents])

  useEffect(() => {
    if (!simulating) return

    const interval = setInterval(async () => {
      // Pick a random active agent
      const activeAgents = agents.filter(a => a.status === 'active')
      if (activeAgents.length === 0) {
        setSimulating(false)
        return
      }

      const agent = activeAgents[Math.floor(Math.random() * activeAgents.length)]
      const cost = Math.round(Math.random() * agent.perActionLimit * 0.8 * 100) / 100
      const target = TARGETS[Math.floor(Math.random() * TARGETS.length)]
      const actionType = ACTION_TYPES[Math.floor(Math.random() * ACTION_TYPES.length)]

      try {
        await fetch('/api/actions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentId: agent.id,
            actionType,
            target,
            cost,
            outcome: 'success',
            metadata: JSON.stringify({ simulated: true, tokens: Math.floor(cost * 15000) })
          })
        })
        await fetchAgents()
      } catch (error) {
        console.error('Simulation action failed:', error)
      }
    }, simulationSpeed === 'fast' ? 800 : 2000)

    return () => clearInterval(interval)
  }, [simulating, simulationSpeed, agents, fetchAgents])

  const activeCount = agents.filter(a => a.status === 'active').length
  const pausedCount = agents.filter(a => a.status === 'paused').length

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeCount} active, {pausedCount} stopped
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-3">
          {simulating && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Speed:</span>
              <button
                onClick={() => setSimulationSpeed('slow')}
                className={`px-2 py-1 rounded text-xs ${simulationSpeed === 'slow' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                1x
              </button>
              <button
                onClick={() => setSimulationSpeed('fast')}
                className={`px-2 py-1 rounded text-xs ${simulationSpeed === 'fast' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                3x
              </button>
            </div>
          )}
          <button
            onClick={() => setSimulating(!simulating)}
            disabled={activeCount === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              simulating
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {simulating ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Stop Simulation
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Run Simulation
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulation Banner */}
      {simulating && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900">Simulation running</p>
            <p className="text-xs text-blue-700">Agents are autonomously executing tasks. Watch budgets update in real-time.</p>
          </div>
        </div>
      )}

      {agents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No agents registered yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Use the API to create agents and log actions.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} isSimulating={simulating} />
          ))}
        </div>
      )}

      {/* Footer note */}
      <p className="text-xs text-gray-400 text-center mt-8">
        Demo simulation only. No real APIs or money involved.
      </p>
    </div>
  )
}
