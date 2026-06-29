import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EcoProvider } from "@/context/EcoContext";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Lessons from "@/pages/Lessons";
import Quiz from "@/pages/Quiz";
import Challenges from "@/pages/Challenges";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EcoProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </EcoProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
