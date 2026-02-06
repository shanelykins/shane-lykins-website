import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import Board from "@/pages/board";
import Resume from "@/pages/resume";
import Home from "@/pages/home";
import { queryClient } from "@/lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/resume" component={Resume} />
          <Route path="/board" component={Board} />
          <Route path="/" component={Home} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;