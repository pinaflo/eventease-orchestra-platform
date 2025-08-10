import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Dashboard />
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">Sign in to access your dashboard and start creating events.</p>
          <Button asChild size="lg">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
