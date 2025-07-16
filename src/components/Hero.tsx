import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-eventease.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/30">
              <span className="text-primary-glow font-medium">✨ Microservice Event Platform</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Seamless Events,
            <span className="bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
              {" "}Endless Possibilities
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create, manage, and scale events effortlessly with our comprehensive platform. 
            From ticket sales to vendor coordination and restaurant bookings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto"
            >
              Start Planning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-4 h-4 mr-2 text-primary-glow" />
              <span className="text-sm">Event Management</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Users className="w-4 h-4 mr-2 text-primary-glow" />
              <span className="text-sm">Vendor Network</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2 text-primary-glow" />
              <span className="text-sm">Real-time Booking</span>
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