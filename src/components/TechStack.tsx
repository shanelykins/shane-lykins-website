import React from 'react';

const tools = [
  {
    category: "Development",
    items: [
      { name: "Cursor", description: "AI-powered IDE" },
      { name: "Bolt", description: "AI Code Builder" },
      { name: "Codebuff", description: "AI code Generator in terminal" },
      { name: "Replit", description: "Cloud development environment" },
      { name: "Vercel", description: "Frontend deployment platform" }
    ]
  },
  {
    category: "No-Code & Automation",
    items: [
      { name: "Framer", description: "No Code website builder" },
      { name: "Zapier", description: "Simple automations" },
      { name: "v0", description: "AI Front end developer" },
      { name: "Orb", description: "Dynamic usage based billing" },
      { name: "Supabase", description: "Open source backend and auth" }
    ]
  },
  {
    category: "AI & Content",
    items: [
      { name: "Assembly AI", description: "Transcriptions" },
      { name: "HeyGen", description: "AI Avatars" },
      { name: "Suno", description: "AI Music generator" },
      { name: "Midjourney", description: "AI Art" },
      { name: "Pika", description: "AI motion art" },
      { name: "Runaway", description: "AI video" },
      { name: "Replicate", description: "AI model deployment" }
    ]
  },
  {
    category: "AI Assistants",
    items: [
      { name: "Perplexity", description: "Search" },
      { name: "Claude", description: "Code synthesis" },
      { name: "ChatGPT", description: "Creative & data processing" }
    ]
  }
];

export function TechStack() {
  return (
    <section className="py-16">
      <h2 className="mb-6 font-serif text-3xl font-light tracking-tight text-gray-900">AI Tech Stack</h2>
      <div className="grid gap-12 md:grid-cols-2">
        {tools.map((category) => (
          <div key={category.category}>
            <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-gray-400">{category.category}</h3>
            <div className="space-y-4">
              {category.items.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                  <div>
                    <span className="font-medium text-gray-900">{tool.name}</span>
                    <span className="ml-2 text-sm text-gray-500">{tool.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}