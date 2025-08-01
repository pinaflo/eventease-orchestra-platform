import { Button } from "@/components/ui/button";
import { Calendar, Users, Utensils, Ticket } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold text-foreground">EventEase</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-muted-foreground hover:text-foreground transition-colors">
              Events
            </a>
            <a href="#vendors" className="text-muted-foreground hover:text-foreground transition-colors">
              Vendors
            </a>
            <a href="#restaurants" className="text-muted-foreground hover:text-foreground transition-colors">
              Restaurants
            </a>
            <a href="#tickets" className="text-muted-foreground hover:text-foreground transition-colors">
              Tickets
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;