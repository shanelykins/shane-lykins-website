import React from 'react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: "Agentic AI Recruiter",
    description: "AI-powered recruiter that handles phone screens autonomously.",
    color: "from-violet-600 to-purple-500",
    link: "https://fancy-dusk-5f9959.netlify.app/",
    tags: ["AI", "Recruiting", "Career"]
  },
  {
    title: "Event Flyer to Calendar",
    description: "Transform event flyer images into Google Calendar events automatically",
    color: "from-emerald-600 to-teal-500",
    link: "https://guileless-basbousa-2f889a.netlify.app",
    tags: ["AI", "OCR", "Calendar"]
  },
  {
    title: "ResumeGPT",
    description: "AI-powered resume builder that crafts custom tailored resumes and cover letters",
    color: "from-cyan-600 to-blue-500",
    link: "https://lovely-flan-bb36b3.netlify.app/",
    tags: ["AI", "Career", "Productivity"]
  },
  {
    title: "Chnglog",
    description: "Making feature updates fun again. Press record and we handle the rest",
    color: "from-purple-600 to-pink-500",
    link: "https://www.chnglog.co/",
    tags: ["AI", "Product", "Video"]
  },
  {
    title: "Voice-to-Invoice",
    description: "Convert voice recordings into professional invoices instantly using AI",
    color: "from-indigo-600 to-blue-500",
    link: "https://whimsical-kashata-fc9950.netlify.app/",
    tags: ["AI", "Voice", "Productivity"]
  },
  {
    title: "Startup Meme Generator",
    description: "AI-powered meme generator for the startup ecosystem",
    color: "from-amber-600 to-orange-500",
    link: "https://adorable-klepon-4a1c12.netlify.app/",
    tags: ["AI", "Social", "Memes"]
  },
  {
    title: "What's for dinner?",
    description: "Finally agree with your partner what you are having for dinner. A tinder like experince for food decisions.",
    color: "from-rose-600 to-red-500",
    link: "https://radiant-moxie-4b236b.netlify.app/",
    tags: ["AI", "Food", "Social"]
  }
];

export function Projects() {
  return (
    <section className="py-8">
      <h2 className="mb-6 font-serif text-3xl font-light tracking-tight text-gray-900">Projects</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}