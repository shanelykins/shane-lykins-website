import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  color: string;
  tags: string[];
  link: string;
  index: number;
}

export function ProjectCard({ title, description, color, tags, link }: ProjectProps) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 transition-all duration-500 hover:shadow-lg"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-all duration-500 ease-out group-hover:opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium tracking-tight text-gray-900 transition-colors group-hover:text-white">{title}</h3>
            <ArrowUpRight className="h-5 w-5 transform text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-hover:opacity-100" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-white/90">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="rounded-full bg-gray-200/80 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm transition-colors group-hover:bg-black/10 group-hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}