import React from 'react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400">Find me</h3>
            <div className="mt-4 flex gap-6">
              <a 
                href="https://www.linkedin.com/in/shanelykins"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-gray-400 transition-colors duration-300 hover:text-blue-500"
              >
                <Linkedin className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a 
                href="https://x.com/ShaneLykins"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-gray-400 transition-colors duration-300 hover:text-gray-900"
              >
                <Twitter className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a 
                href="mailto:shanewlykins@gmail.com"
                className="group text-gray-400 transition-colors duration-300 hover:text-red-500"
              >
                <Mail className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 opacity-0">Made with</h3>
            <p className="mt-4 text-sm text-gray-400">
              Made with ❤️ and ☕️ in 🌉
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}