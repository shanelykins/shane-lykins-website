import React from 'react';
import { Coffee, Waves, MapPin, Plane, ArrowUpRight } from 'lucide-react';

const companies = [
  {
    name: "Thumbprint",
    role: "Head of Product",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAnFBMVEVHcEz/ipr/ipr/f6j/gKb/hp7/i5n/ipr/jJf/gaT/h53/lYv/kZH/lor/h53/lor/l4j/pnf/l4n/pHn/mIj/m4P/oXz/pnX/noD/p3T/r2r/oX3/noD/pnb/rmz/rmz/qXL/r2v/vVn/vVn/q2//u1z/tGP/qHT/rG//t2D/tmH/rWz/vlf/v1X/wlP/vlf/vlf/x0v/yEr/y0d+oNYtAAAANHRSTlMAOJru///+3EvFgtX+6mT/uwiqQYX9//Ft/73LkIMc5mH/N5zZ0u93of9mKXv/5E6K//C9nGxfPAAAAZpJREFUeAGNj0Vi40AUBUus2GIyCloyiUxz/7tNdzhZpZa/Pj3+hqYbpmXZjq7xG9cwzRd9sdCXnue7/ODFNALeCfww4ovYMBcQOLZte0kKWe7HfGCYGq68F+nJMgx9jbRYfe3U0C37/dI6zzPSzfb9F3PBwnqBzPHCyIVdsafcpCgMA81ycOWb0TLM/YqdNKsaQDMDHBvN8zSAdVFUbDY0ogV5Dc1e4Hmwz/OE6tU0iA5wHHSbzEvx8+WuKEg3JeLA8QRYOo6P78s3z0hz4SC4CLoeUCsjwoQoZ7/jsOEsqqEfpw+ZoGRBokyaiqqRcgY8nTAiX7Iv4mbTImrg2NMp6S/VwUQ9smazZRCn7th3HK+AHrLP47SQZsVFDNxOfX+HuQO0sBnzjJU6N1CrumJ4tAB+zq6k2ZypxSiv9d10v/F8onCLEpAmjkXfcjvO89xNjxsKoiIFRrGlkmNARfv4xzurjbKXHtjOM0j35IN4JUpgBGhbuD+eMV9sxWngneH5sfMDFe7YTVN3fDyeN37Tdlf55uPatfyJ/8bXJ1RIghd7AAAAAElFTkSuQmCC",
    url: "https://thumbprintfurniture.com"
  },
  {
    name: "Bigfoot",
    role: "Cofounder, Product",
    logo: "https://meetbigfoot.com/favicon.ico",
    url: "https://meetbigfoot.com"
  },
  {
    name: "Pinterest",
    role: "Head of Product Operations",
    logo: "https://pinterest.com/favicon.ico",
    url: "https://pinterest.com"
  },
  {
    name: "Outdoorsy",
    role: "Senior Product Manager",
    logo: "https://outdoorsy.com/favicon.ico",
    url: "https://outdoorsy.com"
  },
  {
    name: "Airbnb",
    role: "Product Specialist",
    logo: "https://airbnb.com/favicon.ico",
    url: "https://airbnb.com"
  }
];

export function Header() {
  return (
    <header className="flex min-h-[60vh] flex-col justify-center py-16">
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <h1 className="font-serif text-[12vw] font-light leading-none tracking-tight text-gray-900 sm:text-8xl">
            Shane Lykins
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="group flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-indigo-500">
              <MapPin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm">San Francisco</span>
            </div>
            <div className="group flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-blue-500">
              <Plane className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm">Pilot</span>
            </div>
            <div className="group flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-amber-500">
              <Coffee className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm">Coffee Enthusiast</span>
            </div>
            <div className="group flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-cyan-500">
              <Waves className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm">Surfer</span>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-600">
            Product Manager & full-stack AI builder. Passion for marketplaces, AI, and innovative technology.
          </p>
        </div>
        
        <div className="relative ml-8 hidden lg:block">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 opacity-50 blur-lg"></div>
          <img 
            src="https://media.licdn.com/dms/image/v2/D5603AQGRxX0yJzrqOQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710956231770?e=1744848000&v=beta&t=q_7LBk_egB04JIvPaKYVd9O-Otibsuqtig8Y8j-iQvE"
            alt="Shane Lykins"
            className="relative h-48 w-48 rounded-2xl object-cover shadow-lg ring-1 ring-gray-900/10"
          />
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="font-serif text-3xl font-light tracking-tight text-gray-900">Work</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {companies.map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-colors duration-300 hover:text-gray-900"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-900">
                {company.role}
              </div>
            </a>
          ))}
        </div>
        
        <a 
          href="https://www.linkedin.com/in/shanelykins" 
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-blue-500"
        >
          View full history on LinkedIn
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}