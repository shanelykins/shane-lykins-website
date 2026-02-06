import { Mail, Linkedin, Twitter, Music, Calendar, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookCall = () => {
    // Replace with your actual Calendly or booking link
    window.open("https://calendly.com/shanelykins", "_blank");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shanewlykins@gmail.com");
      toast.success("Email copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(0 0% 24%)', color: 'hsl(0 0% 100%)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'hsla(0 0% 24% / 0.9)', borderColor: 'hsl(0 0% 40% / 0.5)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg font-serif font-medium"
            >
              Shane Lykins
            </button>
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm uppercase tracking-widest font-light transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm uppercase tracking-widest font-light transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("highlights")}
                className="text-sm uppercase tracking-widest font-light transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm uppercase tracking-widest font-light transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                Connect
              </button>
              <Button
                onClick={handleBookCall}
                size="sm"
                className="px-4 py-2 text-sm font-medium tracking-wide"
                style={{ backgroundColor: 'hsl(4 68% 73%)', color: 'hsl(0 0% 100%)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73% / 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73%)'}
              >
                Schedule a Call
              </Button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: 'hsl(0 0% 100%)' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: 'hsl(0 0% 100%)' }} />
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ backgroundColor: 'hsl(0 0% 24%)', borderTopColor: 'hsl(0 0% 40% / 0.5)' }}>
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-sm uppercase tracking-widest font-light transition-colors"
                style={{ color: 'hsl(0 0% 70%)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-sm uppercase tracking-widest font-light transition-colors"
                style={{ color: 'hsl(0 0% 70%)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("highlights")}
                className="block w-full text-left text-sm uppercase tracking-widest font-light transition-colors"
                style={{ color: 'hsl(0 0% 70%)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-sm uppercase tracking-widest font-light transition-colors"
                style={{ color: 'hsl(0 0% 70%)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
              >
                Connect
              </button>
              <Button
                onClick={handleBookCall}
                size="sm"
                className="w-full px-4 py-2 text-sm font-medium tracking-wide mt-4"
                style={{ backgroundColor: 'hsl(4 68% 73%)', color: 'hsl(0 0% 100%)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73% / 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73%)'}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-16 h-1 mx-auto mb-8" style={{ backgroundColor: 'hsl(4 68% 73%)' }}></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-wide mb-6">
            Shane Lykins
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-widest uppercase mb-12" style={{ color: 'hsl(0 0% 70%)' }}>
            Fractional Product Developer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={handleBookCall}
              size="lg"
              className="px-8 py-6 text-base font-medium tracking-wide"
              style={{ backgroundColor: 'hsl(4 68% 73%)', color: 'hsl(0 0% 100%)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73% / 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73%)'}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium tracking-wide"
              style={{ borderColor: 'hsl(0 0% 100% / 0.2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'hsl(0 0% 100% / 0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              onClick={handleCopyEmail}
            >
              <Mail className="w-5 h-5 mr-2" />
              Copy Email
            </Button>
          </div>
          <div className="w-16 h-1 mx-auto" style={{ backgroundColor: 'hsl(4 68% 73%)' }}></div>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" style={{ color: 'hsl(0 0% 70%)' }} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[3/4] rounded-sm overflow-hidden relative" style={{ backgroundColor: 'hsl(0 0% 30%)' }}>
                <img
                  src="/avatar.jpg"
                  alt="Shane Lykins - Product Developer & Builder"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 w-2 h-1/3" style={{ backgroundColor: 'hsl(4 68% 73%)' }}></div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-1 bg-primary mb-8"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">About</h2>
              <div className="space-y-6 text-lg font-light leading-relaxed">
                <p>
                  Product leader and developer with over a decade of experience building and shipping products from concept to scale. 
                  Specialized in full-stack development, AI product development, and turning ideas into reality.
                </p>
                <p style={{ color: 'hsl(0 0% 70%)' }}>
                  Track record of building products that reach millions of users, raising venture capital, and scaling teams at 
                  companies like Pinterest, Airbnb, Outdoorsy, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6" style={{ backgroundColor: 'hsl(0 0% 20%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-primary mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium">What I Do</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-8 border transition-colors duration-300" style={{ backgroundColor: 'hsl(0 0% 24%)', borderColor: 'hsl(0 0% 40%)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(4 68% 73%)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'hsl(0 0% 40%)'}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: 'hsl(4 68% 73%)' }}></div>
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'hsl(4 68% 73%)' }}>Full-Stack Development</span>
              <h3 className="text-2xl font-serif font-medium mt-4 mb-6">Product Development</h3>
              <p className="font-light leading-relaxed" style={{ color: 'hsl(0 0% 70%)' }}>
                Build products from scratch or enhance existing ones. React, TypeScript, Node.js, AI integrations. 
                I code, design, and ship.
              </p>
            </div>
            <div className="relative p-8 bg-background border border-border hover:border-primary transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <span className="text-xs uppercase tracking-widest text-primary font-medium">AI Product Development</span>
              <h3 className="text-2xl font-serif font-medium mt-4 mb-6">AI Systems</h3>
              <p className="font-light leading-relaxed" style={{ color: 'hsl(0 0% 70%)' }}>
                Custom AI systems, generative AI features, and AI-powered product experiences. 
                From concept to production.
              </p>
            </div>
            <div className="relative p-8 bg-background border border-border hover:border-primary transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <span className="text-xs uppercase tracking-widest text-primary font-medium">Product Strategy</span>
              <h3 className="text-2xl font-serif font-medium mt-4 mb-6">Product Leadership</h3>
              <p className="font-light leading-relaxed" style={{ color: 'hsl(0 0% 70%)' }}>
                Product roadmaps, go-to-market strategy, team building, and scaling products from 
                zero to millions of users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section id="highlights" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-primary mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium">Professional Highlights</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-2" style={{ color: 'hsl(4 68% 73%)' }}>10+</div>
              <div className="text-sm uppercase tracking-widest font-medium mb-3">Years Experience</div>
              <p className="text-sm font-light" style={{ color: 'hsl(0 0% 70%)' }}>
                Building products from concept to scale
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary mb-2">$1.5M+</div>
              <div className="text-sm uppercase tracking-widest font-medium mb-3">Raised</div>
              <p className="text-sm font-light" style={{ color: 'hsl(0 0% 70%)' }}>
                Co-founded and led product at Bigfoot
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary mb-2">$100M+</div>
              <div className="text-sm uppercase tracking-widest font-medium mb-3">GMV Built</div>
              <p className="text-sm font-light" style={{ color: 'hsl(0 0% 70%)' }}>
                Built Wheelbase from concept to scale
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary mb-2">0→1</div>
              <div className="text-sm uppercase tracking-widest font-medium mb-3">Product Development</div>
              <p className="text-sm font-light" style={{ color: 'hsl(0 0% 70%)' }}>
                From PMF to GTM across multiple products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6" style={{ backgroundColor: 'hsl(0 0% 20%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-1 bg-primary mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">Build and Grow Your Product</h2>
          <p className="text-lg font-light mb-12 max-w-xl mx-auto" style={{ color: 'hsl(0 0% 70%)' }}>
            Book 30 minutes to learn how I can help build your product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleBookCall}
              size="lg"
              className="px-8 py-6 text-base font-medium tracking-wide"
              style={{ backgroundColor: 'hsl(4 68% 73%)', color: 'hsl(0 0% 100%)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73% / 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(4 68% 73%)'}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium tracking-wide"
              style={{ borderColor: 'hsl(0 0% 100% / 0.2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'hsl(0 0% 100% / 0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              onClick={handleCopyEmail}
            >
              <Mail className="w-5 h-5 mr-2" />
              Copy Email
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: 'hsl(0 0% 40%)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-light" style={{ color: 'hsl(0 0% 70%)' }}>
            © {new Date().getFullYear()} Shane Lykins. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/shanelykins/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/ShaneLykins"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@shanestartups"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'hsl(0 0% 70%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(0 0% 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(0 0% 70%)'}
            >
              <Music className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
