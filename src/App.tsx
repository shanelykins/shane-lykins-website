import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import Board from "@/pages/board";
import Resume from "@/pages/resume";
import { queryClient } from "@/lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/resume" component={Resume} />
          <Route path="/" component={Board} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;