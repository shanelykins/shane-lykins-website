import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ExternalLink, ArrowRight, UserPlus, Users, Trash2 } from "lucide-react";
import { Idea } from "./idea-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DetailViewProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: "considering" | "committed") => void;
  onInvite?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DetailView({ idea, isOpen, onClose, onStatusChange, onInvite, onDelete }: DetailViewProps) {
  if (!idea) return null;

  const isCommitted = idea.status === "committed";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-background border-none shadow-2xl gap-0">
        <div className={cn(
          "h-2 w-full",
          isCommitted ? "bg-primary" : "bg-muted-foreground/20"
        )} />
        
        <div className="p-10 flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-xs font-medium uppercase tracking-widest",
                isCommitted ? "text-primary" : "text-muted-foreground"
              )}>
                {isCommitted ? "Committed" : "Considering"}
              </span>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStatusChange(idea.id, isCommitted ? "considering" : "committed")}
                  className="h-8 px-3 text-xs hover:bg-transparent"
                >
                  {isCommitted ? (
                    <span className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      Downgrade to Considering
                    </span>
                  ) : (
                    <span className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                      Commit to this <ArrowRight className="ml-1.5 w-3 h-3" />
                    </span>
                  )}
                </Button>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`Delete "${idea.title}"?`)) {
                        onDelete(idea.id);
                        onClose();
                      }
                    }}
                    className="h-8 px-3 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <h2 className="font-serif text-3xl text-foreground leading-tight">
              {idea.title}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-foreground/80 font-sans leading-relaxed">
              {idea.description}
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Collaborators</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs border-dashed gap-2"
                onClick={() => onInvite?.(idea.id)}
              >
                <UserPlus className="w-3 h-3" /> Invite
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {idea.participants && idea.participants.length > 0 ? (
                idea.participants.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={p.avatar} />
                      <AvatarFallback className="text-[10px]">{p.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{p.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No collaborators yet</p>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            {idea.nextStep && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Step</h4>
                <p className="text-sm text-foreground font-medium">{idea.nextStep}</p>
              </div>
            )}
            
            {idea.link && (
              <a 
                href={idea.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline hover:text-primary/80 transition-colors group"
              >
                View Resources <ExternalLink className="ml-1.5 w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
