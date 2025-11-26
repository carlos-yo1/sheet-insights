import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Marketing Analytics
              </h1>
            </div>
            
            <nav className="flex gap-1">
              <NavLink
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-muted-foreground transition-smooth hover:text-foreground hover:bg-secondary/50"
                activeClassName="!text-primary bg-primary/10"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
              
              <NavLink
                to="/chat"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-muted-foreground transition-smooth hover:text-foreground hover:bg-secondary/50"
                activeClassName="!text-accent bg-accent/10"
              >
                <Sparkles className="w-4 h-4" />
                Leão AI
              </NavLink>
            </nav>
          </div>
          
          <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
            <span className="text-sm font-medium text-accent">Google Sheets</span>
          </div>
        </div>
      </div>
    </header>
  );
};
