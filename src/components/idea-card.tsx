import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Check, X, ArrowRight, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { differenceInDays } from "date-fns";

export type IdeaStatus = "considering" | "committed";

export interface Participant {
  id: string;
  name: string;
  avatar: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  nextStep?: string;
  link?: string;
  participants?: Participant[];
  committedAt?: string;
}

interface IdeaCardProps {
  idea: Idea;
  onClick: (idea: Idea) => void;
  className?: string;
}

export function IdeaCard({ idea, onClick, className }: IdeaCardProps) {
  const isCommitted = idea.status === "committed";
  const daysCommitted = idea.committedAt ? differenceInDays(new Date(), new Date(idea.committedAt)) : 0;

  return (
    <motion.div
      layoutId={`card-${idea.id}`}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(idea)}
      className={cn(
        "cursor-pointer group relative overflow-hidden rounded-xl border p-6 transition-colors flex flex-col justify-between min-h-[220px]",
        isCommitted 
          ? "bg-white border-primary/10 shadow-sm hover:shadow-md" 
          : "bg-white/50 border-transparent hover:bg-white hover:border-border hover:shadow-sm",
        className
      )}
      data-testid={`card-idea-${idea.id}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <motion.h3 
            className={cn(
              "font-serif text-xl leading-tight tracking-tight",
              isCommitted ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
            )}
          >
            {idea.title}
          </motion.h3>
          {isCommitted && (
            <div className="rounded-full bg-accent/50 p-1.5 text-accent-foreground">
              <Sparkles className="w-3 h-3" />
            </div>
          )}
        </div>
        
        <p className={cn(
          "text-sm font-sans leading-relaxed line-clamp-3",
          isCommitted ? "text-foreground/80" : "text-muted-foreground"
        )}>
          {idea.description}
        </p>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div className="flex -space-x-2 overflow-hidden">
          {idea.participants?.map((p) => (
            <Avatar key={p.id} className="h-6 w-6 border-2 border-background ring-0 shadow-sm">
              <AvatarImage src={p.avatar} alt={p.name} />
              <AvatarFallback className="text-[10px]">{p.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        {isCommitted && (
          <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 bg-muted/30 px-2 py-1 rounded-full">
            <Clock className="w-2.5 h-2.5" />
            {daysCommitted === 0 ? "Started Today" : `${daysCommitted} Days`}
          </div>
        )}
      </div>
    </motion.div>
  );
}
