import { useEffect, useRef } from "react";
import { Mail, Linkedin, Twitter, Music, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    trackEvent("resume_view_download", { action: "download" });
    // Simple approach: Use browser's native print dialog
    // User can save as PDF from there
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to download PDF');
      return;
    }
    
    if (!resumeRef.current) {
      toast.error('Resume content not found');
      return;
    }
    
    // Get the resume content HTML
    const resumeHTML = resumeRef.current.innerHTML;
    
    // Create a clean HTML document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Shane Lykins - Resume</title>
          <style>
            @media print {
              @page {
                margin: 0.5in;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 8.5in;
              margin: 0 auto;
              padding: 20px;
              color: #000;
              background: #fff;
            }
            * {
              color: #000 !important;
              background: #fff !important;
            }
            a {
              color: #0066cc !important;
              text-decoration: underline;
            }
            ${document.querySelector('style')?.innerHTML || ''}
          </style>
        </head>
        <body>
          ${resumeHTML.replace(/<button[^>]*>.*?<\/button>/gi, '')}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
      toast.success('Print dialog opened - choose "Save as PDF"');
    }, 250);
  };

  useEffect(() => {
    trackEvent("resume_view_download", { action: "view" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-12 lg:p-16 font-sans relative">
      <div className="max-w-4xl mx-auto">
        <div ref={resumeRef} className="bg-white p-8 md:p-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="font-serif text-5xl font-bold text-foreground mb-2">Shane Lykins</h1>
              <p className="text-xl text-muted-foreground mb-6">Product Developer & Builder</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 border border-border/60 bg-background hover:bg-muted/50 text-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="mailto:shanewlykins@gmail.com"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              shanewlykins@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/shanelykins/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a 
              href="https://x.com/ShaneLykins" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Twitter/X
            </a>
            <a 
              href="https://www.tiktok.com/@shanestartups" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Music className="w-4 h-4" />
              TikTok
            </a>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Summary */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            Product leader and developer with over a decade of experience building and shipping products from concept to scale. 
            Specialized in full-stack development, AI product development, and turning ideas into reality. Track record of 
            building products that reach millions of users, raising venture capital, and scaling teams. Passionate about 
            creating tools that solve real problems and building platforms that empower others to build.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Experience</h2>
          
          <div className="space-y-8">
            {/* Prodjoy */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Founder & AI Product Builder</h3>
                  <p className="text-muted-foreground">Prodjoy</p>
                </div>
                <span className="text-sm text-muted-foreground">June 2022 - Present</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Building and shipping custom AI systems for founders and teams
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Architected and developed full-stack AI-powered applications using modern React, TypeScript, and Node.js</li>
                <li>Built scalable product platforms from ground up, handling both frontend and backend development</li>
                <li>Designed and implemented AI integrations and custom AI systems for client products</li>
                <li>Led product strategy and technical execution across multiple product lines simultaneously</li>
                <li>Managed technical infrastructure and deployment pipelines for multiple products</li>
              </ul>
              <a 
                href="https://www.prodjoy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
              >
                prodjoy.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Thumbprint */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Product + Design Leader</h3>
                  <p className="text-muted-foreground">Thumbprint Furniture</p>
                </div>
                <span className="text-sm text-muted-foreground">June 2023 - January 2026</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Generative AI platform that automates the design and specification process for the commercial furniture industry
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Led end-to-end product development from discovery and user research through MVP build, beta, and public launch</li>
                <li>Built and scaled the product from concept to seven-figure revenue as first employee</li>
                <li>Developed AI-powered design automation features and multi-sided marketplace functionality</li>
                <li>Architected technical solutions for complex space planning and furniture specification workflows</li>
                <li>Led product strategy, design systems, and technical implementation across desktop and web platforms</li>
              </ul>
            </div>

            {/* Bigfoot */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Founder, Head of Product</h3>
                  <p className="text-muted-foreground">Bigfoot Full-time</p>
                </div>
                <span className="text-sm text-muted-foreground">May 2021 - June 2023</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Generative AI marketplace to discover, find, and book your best day ever
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Cofounded and led product development from idea to $1.5MM+ raised and 30k+ MAUs</li>
                <li>Built 0-1 product across Desktop, Mobile (iOS), and Mobile Web platforms</li>
                <li>Developed marketplace platform surfacing 80k+ experiences across 160 cities globally</li>
                <li>Architected and implemented AI-powered discovery and recommendation systems</li>
                <li>Hired and managed a team of 15 FTEs, establishing product and engineering culture</li>
                <li>Led technical architecture, product design, and full-stack development efforts</li>
              </ul>
            </div>

            {/* Pinterest */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Senior Manager, Product Operations</h3>
                  <p className="text-muted-foreground">Pinterest</p>
                </div>
                <span className="text-sm text-muted-foreground">October 2019 - May 2021</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Built out and led Product Operations across all user facing products (30+ product teams)
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Led development of high-performing team that leveraged user data to shape product strategy across core products and monetization</li>
                <li>Recruited and managed team of five direct reports, impacting over 30 product teams</li>
                <li>Built data infrastructure and analytics tools to improve product decision-making</li>
                <li>Streamlined processes to reduce Trust & Safety incidents and product rollbacks</li>
                <li>Developed internal tools and systems to improve launch quality across key products</li>
              </ul>
            </div>

            {/* Outdoorsy */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Senior Product Manager</h3>
                  <p className="text-muted-foreground">Outdoorsy</p>
                </div>
                <span className="text-sm text-muted-foreground">March 2018 - October 2019</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Led product on a $100MM GMV vertical SaaS enabled product called Wheelbase
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>First Product Manager and employee #20 (grew to 400+ during tenure)</li>
                <li>Built and scaled Wheelbase (wheelbasepro.com) from concept to $100MM GMV</li>
                <li>Led growth and global expansion efforts into 12 new countries</li>
                <li>Developed SaaS features and integrations for commercial fleet management</li>
                <li>Architected product roadmap and technical requirements for complex marketplace and SaaS platform</li>
              </ul>
              <a 
                href="https://wheelbasepro.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
              >
                wheelbasepro.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Airbnb */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Product Operations</h3>
                  <p className="text-muted-foreground">Airbnb</p>
                </div>
                <span className="text-sm text-muted-foreground">March 2015 - July 2017</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Founding team-member of Airbnb Experiences
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Built an AI chatbot concept that won "Most Innovative" at an internal hackathon</li>
                <li>Developed the original growth playbook for Airbnb for Business</li>
                <li>Built product tools and systems to support Experiences marketplace launch</li>
                <li>Worked on product operations and technical infrastructure for new product vertical</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Technical Skills */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Frontend Development</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React, TypeScript, JavaScript (ES6+)</li>
                <li>• Tailwind CSS, CSS3, HTML5</li>
                <li>• Next.js, Vite, Webpack</li>
                <li>• Framer Motion, React Query</li>
                <li>• Mobile Web & iOS Development</li>
                <li>• Responsive Design & UI/UX</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Backend & Infrastructure</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Node.js, Express, REST APIs</li>
                <li>• Database Design & Management</li>
                <li>• AI/ML Integration & Development</li>
                <li>• Git, GitHub, Version Control</li>
                <li>• CI/CD, Deployment & DevOps</li>
                <li>• Product Analytics & A/B Testing</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Product Skills */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Product Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product Strategy</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Product Roadmapping & Planning</li>
                <li>• User Research & Validation</li>
                <li>• Feature Prioritization</li>
                <li>• Go-to-Market Strategy</li>
                <li>• Product-Market Fit Analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Development & Execution</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Full-Stack Product Development</li>
                <li>• Agile & Iterative Development</li>
                <li>• Technical Architecture</li>
                <li>• Performance Optimization</li>
                <li>• Quality Assurance & Testing</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Tool Stack */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Tool Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">AI Development Tools</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• v0, Cursor, Suno, Assembly</li>
                <li>• AI model integration & fine-tuning</li>
                <li>• Generative AI product development</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product & Collaboration</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Notion, Coda, Google Docs</li>
                <li>• Linear, Trello, Asana, Jira</li>
                <li>• Product analytics & A/B testing tools</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Current Projects */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Current Projects</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Commitment Canvas</h3>
              <p className="text-sm text-muted-foreground">
                Personal commitment tracking platform - This website! Built with React, TypeScript, and modern web technologies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Novi</h3>
              <p className="text-sm text-muted-foreground">
                Startup ideation platform helping entrepreneurs organize, validate, and commit to their ideas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Prodjoy</h3>
              <p className="text-sm text-muted-foreground">
                Fractional holdco building custom AI systems and products for founders and teams.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">
            Built with React, TypeScript, and Tailwind CSS • Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </footer>
        </div>
      </div>
    </div>
  );
}
