import React from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="text-sm font-medium text-gray-900">
            Shane Lykins
          </a>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#work" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Work</a>
              <a href="#about" className="text-sm text-gray-600 transition-colors hover:text-gray-900">About</a>
              <a href="#contact" className="text-sm text-gray-600 transition-colors hover:text-gray-900">Contact</a>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-1 px-6 py-4">
            <a href="#work" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">Work</a>
            <a href="#about" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">About</a>
            <a href="#contact" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}