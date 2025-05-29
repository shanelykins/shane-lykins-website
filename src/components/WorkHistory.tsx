import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const companies = [
  {
    name: "Thumbprint",
    role: "Product",
    logo: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=64",
    period: "Jun 2023 - Present"
  },
  {
    name: "ProdJoy",
    role: "Founder",
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=64",
    period: "Jul 2022 - Present"
  },
  {
    name: "Bigfoot",
    role: "Head of Product",
    logo: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=64",
    period: "May 2021 - Jun 2023"
  },
  {
    name: "Pinterest",
    role: "Senior Manager, Product Operations",
    logo: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=64",
    period: "Oct 2019 - May 2021"
  }
];

export function WorkHistory() {
  return (
    <section className="py-8">
      <h2 className="mb-8 font-serif text-3xl font-light tracking-tight text-gray-900">Work</h2>
      <div className="space-y-6">
        {companies.map((company) => (
          <div key={company.name} className="flex items-center gap-4">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-12 w-12 rounded-full bg-gray-100 object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{company.name}</h3>
              <p className="text-sm text-gray-600">{company.role} · {company.period}</p>
            </div>
          </div>
        ))}
      </div>
      
      <a 
        href="https://linkedin.com/in/yourprofile" 
        className="mt-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        View full history on LinkedIn
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}