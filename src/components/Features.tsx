import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Ticket, Utensils, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Create and manage events with comprehensive timeline, guest lists, and vendor coordination.",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Vendor Network",
      description: "Connect with photographers, decorators, DJs, caterers and more. Book services seamlessly.",
      color: "text-green-400"
    },
    {
      icon: Ticket,
      title: "Smart Ticketing",
      description: "Sell tickets with QR codes, manage seat selection, and handle check-ins effortlessly.",
      color: "text-purple-400"
    },
    {
      icon: Utensils,
      title: "Restaurant Booking",
      description: "Real-time table reservations with instant availability updates and time slot management.",
      color: "text-orange-400"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with OAuth2, JWT authentication, and role-based access control.",
      color: "text-red-400"
    },
    {
      icon: Zap,
      title: "Microservice Architecture",
      description: "Scalable, resilient platform built with modern microservices for maximum performance.",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
              {" "}Perfect Events
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and services you need to create memorable events.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 group"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;