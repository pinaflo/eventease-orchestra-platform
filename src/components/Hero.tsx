import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-black-culture-festival.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary-glow/20 to-purple-500/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/30">
              <span className="text-primary font-medium">✨ Complete Event Platform</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
            Seamless Events,
            <span className="bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
              {" "}Endless Possibilities
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Create, manage, and scale events effortlessly with our comprehensive platform. 
            From ticket sales to vendor coordination and restaurant bookings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/dashboard')}
            >
              Start Planning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 text-foreground hover:bg-primary/10 text-lg px-8 py-4 h-auto backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-foreground">Event Management</span>
            </div>
            <div className="flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
              <Users className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-foreground">Vendor Network</span>
            </div>
            <div className="flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-foreground">Real-time Booking</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-glow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl animate-glow" />
    </section>
  );
};

export default Hero;