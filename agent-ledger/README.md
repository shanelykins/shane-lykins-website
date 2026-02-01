# Agent Ledger

A minimal, production-grade web app for observing and governing autonomous AI agents through action logging, budget enforcement, and alerting.

## Features

- **Agent Management**: Register and manage autonomous AI agents
- **Action Logging**: Track every action your agents take with associated costs
- **Budget Enforcement**: Set monthly budgets and per-action limits with automatic enforcement
- **Auto-Pause**: Agents are automatically paused when they exceed their budget
- **Alerting**: Get notified when budget thresholds are exceeded
- **Dashboard**: Visual overview of all agents and their spending

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite via Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
# Run migrations to create database tables
npx prisma migrate dev --name init

# Seed with example data
npx prisma db seed
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## API Reference

### Create an Agent

```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Agent",
    "role": "Task automation",
    "ownerId": "user_123",
    "monthlyBudget": 100.00,
    "perActionLimit": 5.00
  }'
```

### Log an Action

This is the core endpoint that agents should call before performing any action.

```bash
curl -X POST http://localhost:3000/api/actions \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "YOUR_AGENT_ID",
    "actionType": "api_call",
    "target": "openai:gpt-4",
    "cost": 0.05,
    "outcome": "success",
    "metadata": "{\"tokens\": 1500}"
  }'
```

**Response Codes:**
- `201`: Action logged successfully
- `400`: Cost exceeds per-action limit
- `403`: Agent is paused OR monthly budget exceeded (agent will be auto-paused)
- `404`: Agent not found

### Get All Agents

```bash
curl http://localhost:3000/api/agents
```

### Get Single Agent with Actions

```bash
curl http://localhost:3000/api/agents/YOUR_AGENT_ID
```

### Update Agent (Pause/Resume)

```bash
curl -X PATCH http://localhost:3000/api/agents/YOUR_AGENT_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'
```

### Get Alerts

```bash
# All alerts
curl http://localhost:3000/api/alerts

# Alerts for specific agent
curl http://localhost:3000/api/alerts?agentId=YOUR_AGENT_ID
```

## Budget Enforcement Logic

When an action is logged:

1. **Agent Status Check**: Reject if agent is paused
2. **Per-Action Limit**: Reject if cost exceeds `perActionLimit`
3. **Monthly Budget**: Calculate total spend for current month
   - If `currentSpend + actionCost > monthlyBudget`:
     - Auto-pause the agent
     - Create a `budget_exceeded` alert
     - Reject the action

## Database Schema

```prisma
model Agent {
  id             String      @id @default(cuid())
  name           String
  role           String
  ownerId        String
  monthlyBudget  Float
  perActionLimit Float
  status         String      @default("active") // "active" | "paused"
  createdAt      DateTime    @default(now())
  actions        ActionLog[]
  alerts         Alert[]
}

model ActionLog {
  id         String   @id @default(cuid())
  agentId    String
  actionType String
  target     String
  cost       Float
  outcome    String   // "success" | "failure"
  metadata   String?  // JSON string
  createdAt  DateTime @default(now())
}

model Alert {
  id        String   @id @default(cuid())
  agentId   String
  type      String   // "budget_exceeded" | "action_failed" | etc.
  message   String
  createdAt DateTime @default(now())
}
```

## Development

```bash
# Run development server
npm run dev

# View/edit database with Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```
