import React from 'react';
import { ExternalLink, ArrowLeft, Palette } from 'lucide-react';

interface PortfolioProject {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  role?: string;
  year?: string;
  context?: string;
}

const portfolioProjects: PortfolioProject[] = [
  {
    title: "Rec.us Enterprise Platform",
    description: "Reimagined the Rec.us platform with an enterprise focus, creating a comprehensive design system that speaks to business clients while maintaining the brand's core values. The project included a new homepage design and a detailed features section that effectively communicates complex platform capabilities through visual storytelling.",
    images: [
      "https://i.imgur.com/QbBSDfg.png",
      "https://i.imgur.com/czDAkY5.png"
    ],
    tags: ["Enterprise Design", "B2B", "UX/UI", "Design System"],
    role: "Product Designer",
    year: "2024",
    context: "Interview Design Exercise",
    link: "https://rec.us"
  },
  {
    title: "Thumbprint Furniture Marketplace",
    description: "Led the redesign of Thumbprint's marketplace homepage, creating a modern and engaging shopping experience. The new design focuses on showcasing furniture pieces while improving navigation and discovery.",
    images: ["https://i.imgur.com/w7rOaeQ.png"],
    tags: ["E-commerce", "Marketplace", "Homepage"],
    role: "Head of Product",
    year: "2024",
    link: "https://thumbprintfurniture.com"
  },
  {
    title: "Thumbprint Furniture Configurator",
    description: "Rebuilt the core furniture configurator feature, enabling customers to customize and visualize their furniture selections in real-time. The new interface provides an intuitive and seamless customization experience.",
    images: ["https://i.imgur.com/AV2Te9X.png"],
    tags: ["Product Configurator", "UX/UI", "E-commerce"],
    role: "Head of Product",
    year: "2024",
    link: "https://thumbprintfurniture.com"
  },
  {
    title: "ProdJoy Website Redesign",
    description: "Completely reimagined the ProdJoy website with a fresh, modern aesthetic. The new design effectively communicates the platform's value proposition while maintaining a clean and professional appearance.",
    images: ["https://i.imgur.com/wnNezWt.png"],
    tags: ["Website Design", "B2B", "SaaS"],
    role: "Product Designer",
    year: "2024",
    link: "https://prodjoy.com"
  }
];

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Decorative elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent" />
        <div className="absolute left-0 right-0 top-[20%] h-px bg-gradient-to-r from-transparent via-orange-200/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <a 
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </a>

        <header className="mb-16">
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
              <Palette className="h-6 w-6" />
            </div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-100 via-purple-100 to-indigo-100 opacity-50 blur"></div>
              <h1 className="relative font-serif text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
                Design Portfolio
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            A collection of selected works showcasing my approach to product design, 
            user experience, and visual storytelling across various platforms and industries.
          </p>
        </header>

        <div className="space-y-24">
          {portfolioProjects.map((project, index) => (
            <div 
              key={project.title}
              className="group relative grid gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className="order-2 md:order-none">
                <div className="sticky top-8">
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-serif text-2xl font-light tracking-tight text-gray-900">
                        {project.title}
                      </h2>
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900"
                        >
                          View live
                          <ExternalLink className="h-3 w-3 transition-transform group-hover/link:scale-110" />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {project.role && <span>{project.role}</span>}
                      {project.year && <span>{project.year}</span>}
                      {project.context && (
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">
                          {project.context}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {project.images.map((image, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className="relative overflow-hidden rounded-lg bg-gray-100"
                  >
                    <img
                      src={image}
                      alt={`${project.title} - View ${imageIndex + 1}`}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}