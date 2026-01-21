import { useState, useEffect } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { IdeaCard, Idea, Participant } from "@/components/idea-card";
import { DetailView } from "@/components/detail-view";
import { Plus, Camera, Edit2, Send, Linkedin, Twitter, Music } from "lucide-react";
// Direct import of base64 data URL
import avatarImage from "@/assets/avatar-direct";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const MOCK_PARTICIPANTS: Participant[] = [
  { id: "p1", name: "Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { id: "p2", name: "Jordan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
  { id: "p3", name: "Sam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" },
];

const MOCK_IDEAS: Idea[] = [
  {
    id: "1",
    title: "Novi",
    description: "Building the worlds best startup ideation platform",
    status: "committed",
    link: "https://usenovi.com",
    participants: [MOCK_PARTICIPANTS[0], MOCK_PARTICIPANTS[1]],
    committedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString() // 6 months ago
  },
  {
    id: "2",
    title: "Commitment Canvas",
    description: "This website you are on!",
    status: "committed",
    committedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 1 week ago
  },
  {
    id: "3",
    title: "TikTok Took",
    description: "Help content creators post daily",
    status: "considering"
  },
  {
    id: "4",
    title: "User Feedback and Research Tool",
    description: "Tool for collecting and analyzing user feedback",
    status: "considering"
  },
  {
    id: "5",
    title: "Testimonial Tools",
    description: "Platform for managing and displaying customer testimonials",
    status: "considering"
  },
  {
    id: "6",
    title: "Launch Videos",
    description: "Create and manage product launch videos",
    status: "considering"
  },
  {
    id: "7",
    title: "Talk Notes",
    description: "Take notes while running",
    status: "considering"
  },
  {
    id: "8",
    title: "Automated SEO Page Generator",
    description: "Generate SEO-optimized pages automatically",
    status: "considering"
  },
  {
    id: "9",
    title: "Professional Memes",
    description: "Create professional memes for marketing",
    status: "considering"
  },
  {
    id: "10",
    title: "Explainer Video Platform",
    description: "Platform for creating explainer videos",
    status: "considering"
  },
  {
    id: "11",
    title: "Ask Questions About the Webpage",
    description: "Tool to ask questions about the webpage you are on",
    status: "considering"
  },
  {
    id: "12",
    title: "AI Tools Tracker",
    description: "Simple tool to keep track of all the AI tools you are using",
    status: "considering"
  },
  {
    id: "13",
    title: "Pastor Tools",
    description: "Bringing AI to churches to operate and reach their congregation more efficiently",
    status: "considering"
  }
];

const formSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().min(5, "Description is too short"),
  nextStep: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
});

const profileSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  tagline: z.string().min(2),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  tiktok: z.string().url().optional().or(z.literal("")),
});

const inviteSchema = z.object({
  email: z.string().email(),
  projectIds: z.array(z.string()).min(1, "Select at least one project"),
});

const betaSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Board() {
  const [ideas, setIdeas] = useState<Idea[]>(MOCK_IDEAS);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForProjectId, setInviteForProjectId] = useState<string | null>(null);
  const [newProjectId, setNewProjectId] = useState<string | null>(null);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  
  // Load profile from localStorage or use defaults
  const getInitialProfile = () => {
    if (typeof window !== 'undefined') {
      return {
        name: localStorage.getItem('profileName') || "Shane Lykins",
        title: localStorage.getItem('profileTitle') || "Personal Commitment Wall",
        tagline: localStorage.getItem('profileTagline') || "Building the future, one idea at a time.",
        avatar: localStorage.getItem('profileAvatar') || avatarImage,
        linkedin: localStorage.getItem('profileLinkedIn') || "https://www.linkedin.com/in/shanelykins/",
        twitter: localStorage.getItem('profileTwitter') || "https://x.com/ShaneLykins",
        tiktok: localStorage.getItem('profileTikTok') || "https://www.tiktok.com/@shanestartups"
      };
    }
    return {
      name: "Shane Lykins",
      title: "Personal Commitment Wall",
      tagline: "Building the future, one idea at a time.",
      avatar: avatarImage,
      linkedin: "https://www.linkedin.com/in/shanelykins/",
      twitter: "https://x.com/ShaneLykins",
      tiktok: "https://www.tiktok.com/@shanestartups"
    };
  };

  const [profile, setProfile] = useState(getInitialProfile());


  const committedIdeas = ideas.filter(i => i.status === "committed");
  const consideringIdeas = ideas.filter(i => i.status === "considering");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", nextStep: "", link: "" },
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { 
      name: profile.name, 
      title: profile.title, 
      tagline: profile.tagline,
      linkedin: profile.linkedin || "",
      twitter: profile.twitter || "",
      tiktok: profile.tiktok || ""
    },
  });

  const inviteForm = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "", projectIds: [] },
  });

  const betaForm = useForm<z.infer<typeof betaSignupSchema>>({
    resolver: zodResolver(betaSignupSchema),
    defaultValues: { email: "" },
  });

  // Initialize form when invite dialog opens with a pre-selected project
  useEffect(() => {
    if (isInviteOpen) {
      const projectId = inviteForProjectId || newProjectId;
      if (projectId) {
        inviteForm.setValue("projectIds", [projectId]);
      } else {
        inviteForm.setValue("projectIds", []);
      }
    }
  }, [isInviteOpen, inviteForProjectId, newProjectId]);

  const checkBetaAccess = (action: () => void) => {
    // Check if user has already signed up
    const hasSignedUp = localStorage.getItem('betaSignupEmail');
    if (hasSignedUp) {
      action();
    } else {
      setPendingAction(() => action);
      setIsBetaModalOpen(true);
    }
  };

  const onBetaSignup = async (values: z.infer<typeof betaSignupSchema>) => {
    try {
      // Store email using Formspree (free form submission service)
      const formspreeEndpoint = 'https://formspree.io/f/mlggzvrv';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          source: 'Commitment Canvas Beta',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // Also store locally as backup
        localStorage.setItem('betaSignupEmail', values.email);
        
        toast.success("Thanks for signing up! You're in the private beta.");
        setIsBetaModalOpen(false);
        betaForm.reset();
        
        // Execute the pending action
        if (pendingAction) {
          pendingAction();
          setPendingAction(null);
        }
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      // Fallback to localStorage if Formspree fails
      localStorage.setItem('betaSignupEmail', values.email);
      const emails = JSON.parse(localStorage.getItem('betaEmails') || '[]');
      emails.push({
        email: values.email,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('betaEmails', JSON.stringify(emails));
      
      toast.success("Thanks for signing up! You're in the private beta.");
      setIsBetaModalOpen(false);
      betaForm.reset();
      
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newIdea: Idea = {
      id: newId,
      title: values.title,
      description: values.description,
      status: "considering",
      nextStep: values.nextStep,
      link: values.link || undefined,
      participants: []
    };
    setIdeas([...ideas, newIdea]);
    setIsAddOpen(false);
    form.reset();
    toast.success("Idea captured");
    // Open invite dialog for the new project
    setNewProjectId(newId);
    setIsInviteOpen(true);
    inviteForm.setValue("projectIds", [newId]);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setProfile({ ...profile, avatar: dataUrl });
        localStorage.setItem('profileAvatar', dataUrl);
        toast.success("Avatar updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    setProfile({ ...profile, ...values });
    localStorage.setItem('profileName', values.name);
    localStorage.setItem('profileTitle', values.title);
    localStorage.setItem('profileTagline', values.tagline);
    if (values.linkedin) localStorage.setItem('profileLinkedIn', values.linkedin);
    if (values.twitter) localStorage.setItem('profileTwitter', values.twitter);
    if (values.tiktok) localStorage.setItem('profileTikTok', values.tiktok);
    setIsProfileOpen(false);
    toast.success("Profile updated");
  };

  const onInviteSubmit = (values: z.infer<typeof inviteSchema>) => {
    // Generate a random participant for demo purposes
    const randomParticipant = MOCK_PARTICIPANTS[Math.floor(Math.random() * MOCK_PARTICIPANTS.length)];
    
    // Add participant to all selected projects
    setIdeas(ideas.map(i => {
      if (values.projectIds.includes(i.id)) {
        const participants = i.participants || [];
        if (!participants.find(p => p.id === randomParticipant.id)) {
          return { ...i, participants: [...participants, randomParticipant] };
        }
      }
      return i;
    }));
    
    // Update selected idea if it's one of the invited projects
    if (selectedIdea && values.projectIds.includes(selectedIdea.id)) {
      const participants = selectedIdea.participants || [];
      if (!participants.find(p => p.id === randomParticipant.id)) {
        setSelectedIdea({ ...selectedIdea, participants: [...participants, randomParticipant] });
      }
    }
    
    toast.success(`Invite sent to ${values.email} for ${values.projectIds.length} project${values.projectIds.length > 1 ? 's' : ''}`);
    setIsInviteOpen(false);
    setInviteForProjectId(null);
    setNewProjectId(null);
    inviteForm.reset();
  };

  const handleStatusChange = (id: string, newStatus: "considering" | "committed") => {
    const idea = ideas.find(i => i.id === id);
    const wasConsidering = idea?.status === "considering";
    
    setIdeas(ideas.map(i => i.id === id ? { 
      ...i, 
      status: newStatus,
      committedAt: newStatus === "committed" ? new Date().toISOString() : undefined
    } : i));
    setSelectedIdea(prev => prev ? { 
      ...prev, 
      status: newStatus,
      committedAt: newStatus === "committed" ? new Date().toISOString() : undefined
    } : null);
    
    // Celebrate with confetti when upgrading to committed!
    if (wasConsidering && newStatus === "committed") {
      triggerConfetti();
      toast.success("🎉 Commitment made! Let's build this!");
    }
  };

  const handleDelete = (id: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea && window.confirm(`Are you sure you want to delete "${idea.title}"?`)) {
      setIdeas(ideas.filter(i => i.id !== id));
      if (selectedIdea?.id === id) {
        setSelectedIdea(null);
      }
      toast.success("Idea deleted");
    }
  };

  const triggerConfetti = () => {
    // Simple confetti effect using canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, color: string}> = [];
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        if (p.y > canvas.height) {
          particles.splice(i, 1);
        }
      });
      
      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(canvas);
      }
    };
    
    animate();
  };

  const handleInvite = (id: string) => {
    // Open invite dialog for this specific project
    setInviteForProjectId(id);
    setIsInviteOpen(true);
    inviteForm.setValue("projectIds", [id]);
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-12 lg:p-16 font-sans selection:bg-primary/10 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto space-y-16">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-border/40">
          <div className="flex items-center gap-6 group relative">
            <div 
              className="h-16 w-16 rounded-full overflow-hidden ring-4 ring-white shadow-xl relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (event: Event) => {
                  const target = event.target as HTMLInputElement;
                  const file = target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const dataUrl = reader.result as string;
                      setProfile({ ...profile, avatar: dataUrl });
                      localStorage.setItem('profileAvatar', dataUrl);
                      toast.success("Avatar updated");
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            >
              <img 
                src={profile.avatar} 
                alt="Shane Lykins" 
                className="h-full w-full object-cover rounded-full"
                style={{ objectFit: 'cover', display: 'block', width: '100%', height: '100%', minWidth: '100%', minHeight: '100%' }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-3xl font-bold text-foreground">{profile.name}</h1>
                <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">{profile.title}</p>
              <p className="text-xs text-muted-foreground/60 italic">{profile.tagline}</p>
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-3">
                {profile.linkedin && (
                  <a 
                    href={profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.twitter && (
                  <a 
                    href={profile.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {profile.tiktok && (
                  <a 
                    href={profile.tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Music className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
               <div className="flex -space-x-3 overflow-hidden p-1">
                {MOCK_PARTICIPANTS.map((p) => (
                  <Avatar key={p.id} className="h-10 w-10 border-4 border-background ring-0 shadow-sm">
                    <AvatarImage src={p.avatar} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                {/* 4th Ellipsis/Plus Avatar */}
                <div 
                  className="h-10 w-10 rounded-full bg-muted border-4 border-background flex items-center justify-center text-muted-foreground hover:bg-muted/80 hover:scale-105 cursor-pointer transition-all shadow-sm z-10"
                  onClick={() => {
                    checkBetaAccess(() => {
                      setInviteForProjectId(null);
                      setNewProjectId(null);
                      setIsInviteOpen(true);
                      inviteForm.setValue("projectIds", []);
                    });
                  }}
                >
                  <Plus className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all gap-2"
                  onClick={() => checkBetaAccess(() => setIsAddOpen(true))}
                >
                  <Plus className="w-5 h-5" /> New Idea
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader><DialogTitle className="font-serif text-2xl">Capture a new idea</DialogTitle></DialogHeader>
                <div className="mt-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Title</FormLabel>
                          <FormControl>
                            <Input className="h-12 bg-muted/30 border-none" placeholder="What's the idea?" {...field} />
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Description</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[120px] bg-muted/30 border-none resize-none" placeholder="Briefly describe it..." {...field} />
                          </FormControl>
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="nextStep" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Next Step</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-muted/30 border-none" placeholder="First action item" {...field} />
                            </FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="link" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Link</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-muted/30 border-none" placeholder="https://..." {...field} />
                            </FormControl>
                          </FormItem>
                        )} />
                      </div>
                      <Button type="submit" className="w-full h-12 text-lg font-medium shadow-md">Capture Idea</Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Board Sections */}
        <LayoutGroup>
          <div className="space-y-24">
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/40" />
                <div className="flex items-center gap-3">
                   <h2 className="font-serif text-4xl text-foreground tracking-tight">Committed</h2>
                   <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{committedIdeas.length}</div>
                </div>
                <div className="h-px flex-1 bg-border/40" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {committedIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} onClick={setSelectedIdea} />)}
                  {committedIdeas.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-24 text-center text-muted-foreground border-2 border-dashed border-border/30 rounded-3xl bg-muted/10">
                      <p className="font-serif italic text-xl">"Focus is a matter of deciding what things you're not going to do."</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/40" />
                <div className="flex items-center gap-3">
                   <h2 className="font-serif text-3xl text-muted-foreground/80 tracking-tight">Considering</h2>
                   <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">{consideringIdeas.length}</div>
                </div>
                <div className="h-px flex-1 bg-border/40" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence mode="popLayout">
                  {consideringIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} onClick={setSelectedIdea} className="bg-transparent border-dashed border-border/60 hover:border-solid hover:bg-white/50" />)}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/5 rounded-2xl hover:bg-primary/5 hover:border-primary/20 cursor-pointer transition-all min-h-[180px] group" onClick={() => checkBetaAccess(() => setIsAddOpen(true))}>
                     <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-primary" /></div>
                     <span className="text-sm text-muted-foreground font-medium">Add New Idea</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </LayoutGroup>

        {/* Profile Dialog */}
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader><DialogTitle className="font-serif text-2xl">Edit Profile</DialogTitle></DialogHeader>
            <div className="mt-4">
              {/* Avatar Upload - SIMPLE AND DIRECT */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    <img 
                      src={profile.avatar} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    id="avatar-upload-input"
                    className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer border border-border rounded-md p-2"
                  />
                  <p className="text-xs text-muted-foreground text-center">Select an image file to upload as your avatar</p>
                </div>
              </div>

              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField control={profileForm.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={profileForm.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={profileForm.control} name="tagline" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <div className="space-y-4 pt-4 border-t border-border/40">
                    <label className="text-sm font-medium">Social Links</label>
                    <FormField control={profileForm.control} name="linkedin" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/..." {...field} />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={profileForm.control} name="twitter" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Twitter className="w-4 h-4" /> Twitter/X
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://x.com/..." {...field} />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={profileForm.control} name="tiktok" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Music className="w-4 h-4" /> TikTok
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://tiktok.com/@..." {...field} />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Global Invite Dialog */}
        <Dialog open={isInviteOpen} onOpenChange={(open) => {
          setIsInviteOpen(open);
          if (!open) {
            setInviteForProjectId(null);
            setNewProjectId(null);
            inviteForm.reset();
          }
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {inviteForProjectId ? `Invite to ${ideas.find(i => i.id === inviteForProjectId)?.title}` : 
                 newProjectId ? `Invite to ${ideas.find(i => i.id === newProjectId)?.title}` :
                 "Invite Collaborators"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Form {...inviteForm}>
                <form onSubmit={inviteForm.handleSubmit(onInviteSubmit)} className="space-y-8">
                  <FormField control={inviteForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invite by Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <div className="space-y-4">
                    <label className="text-sm font-medium leading-none">Select Projects {inviteForProjectId || newProjectId ? "(one pre-selected)" : ""}</label>
                    <div className="max-h-[200px] overflow-y-auto space-y-2 p-2 border rounded-lg bg-muted/20">
                      {(ideas || []).map((idea) => {
                        const isPreSelected = inviteForProjectId === idea.id || newProjectId === idea.id;
                        const currentProjectIds = inviteForm.watch("projectIds") || [];
                        const isChecked = currentProjectIds.includes(idea.id) || isPreSelected;
                        return (
                          <div key={idea.id} className="flex items-center space-x-2 p-2 rounded hover:bg-background transition-colors">
                            <Checkbox 
                              id={`proj-${idea.id}`}
                              checked={isChecked}
                              disabled={isPreSelected}
                              onCheckedChange={(checked) => {
                                if (!isPreSelected) {
                                  const current = inviteForm.getValues("projectIds") || [];
                                  inviteForm.setValue("projectIds", checked ? [...current, idea.id] : current.filter(id => id !== idea.id));
                                }
                              }}
                            />
                            <label htmlFor={`proj-${idea.id}`} className={`text-sm font-medium leading-none cursor-pointer flex-1 ${isPreSelected ? 'opacity-60' : ''}`}>
                              {idea.title} {isPreSelected && <span className="text-xs text-muted-foreground">(required)</span>}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 gap-2"><Send className="w-4 h-4" /> Send Invitation</Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>

        <DetailView idea={selectedIdea} isOpen={!!selectedIdea} onClose={() => setSelectedIdea(null)} onStatusChange={handleStatusChange} onInvite={(id) => checkBetaAccess(() => handleInvite(id))} onDelete={handleDelete} />

        {/* Beta Signup Modal */}
        <Dialog open={isBetaModalOpen} onOpenChange={setIsBetaModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Join the Private Beta</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-6">
                Commitment Canvas is currently in private beta. Sign up with your email to get access and start building your commitment wall.
              </p>
              <Form {...betaForm}>
                <form onSubmit={betaForm.handleSubmit(onBetaSignup)} className="space-y-4">
                  <FormField control={betaForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full h-12 gap-2">
                    Join Private Beta
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
