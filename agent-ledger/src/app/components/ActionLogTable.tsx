'use client'

interface ActionLog {
  id: string
  actionType: string
  target: string
  cost: number
  outcome: string
  metadata: string | null
  createdAt: string
}

interface ActionLogTableProps {
  actions: ActionLog[]
}

export default function ActionLogTable({ actions }: ActionLogTableProps) {
  if (actions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No actions logged yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Target
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Outcome
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions.map((action) => (
            <tr key={action.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {new Date(action.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {action.actionType}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {action.target}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                ${action.cost.toFixed(4)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
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
    </div>
  )
}
