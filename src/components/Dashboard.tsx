import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, MapPin, Clock, Star } from "lucide-react";

const Dashboard = () => {
  const recentEvents = [
    {
      id: 1,
      name: "Annual Conference 2024",
      date: "Dec 15, 2024",
      status: "upcoming",
      attendees: 250,
      revenue: "₵12,500"
    },
    {
      id: 2,
      name: "Product Launch Party",
      date: "Nov 28, 2024",
      status: "planning",
      attendees: 150,
      revenue: "₵8,750"
    },
    {
      id: 3,
      name: "Team Building Retreat",
      date: "Nov 10, 2024",
      status: "completed",
      attendees: 85,
      revenue: "₵5,200"
    }
  ];

  const vendors = [
    {
      name: "Elite Photography",
      service: "Photography",
      rating: 4.9,
      price: "₵500-800",
      availability: "Available"
    },
    {
      name: "Bloom Decorators",
      service: "Decoration",
      rating: 4.8,
      price: "₵300-600",
      availability: "Busy"
    },
    {
      name: "DJ ProSound",
      service: "Music & Audio",
      rating: 4.7,
      price: "₵400-700",
      availability: "Available"
    }
  ];

  const restaurants = [
    {
      name: "The Grand Ballroom",
      cuisine: "Fine Dining",
      capacity: "50-200 guests",
      priceRange: "$$$",
      availability: "3 slots today"
    },
    {
      name: "Garden Terrace",
      cuisine: "Mediterranean",
      capacity: "20-80 guests",
      priceRange: "$$",
      availability: "5 slots today"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Event Management
            <span className="bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
              {" "}Dashboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor your events, manage vendors, and track performance all in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Attendees</p>
                  <p className="text-2xl font-bold text-foreground">1,542</p>
                </div>
                <Users className="w-8 h-8 text-primary-glow" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₵48,350</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Vendors</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <Star className="w-8 h-8 text-primary-glow" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Events</CardTitle>
              <CardDescription>Your latest event activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">{event.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={event.status === 'completed' ? 'default' : event.status === 'upcoming' ? 'secondary' : 'outline'}
                        className="mb-2"
                      >
                        {event.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{event.attendees} attendees</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vendor Network */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Vendor Network</CardTitle>
              <CardDescription>Top-rated service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.map((vendor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">{vendor.name}</h4>
                      <p className="text-sm text-muted-foreground">{vendor.service}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{vendor.price}</p>
                      <Badge 
                        variant={vendor.availability === 'Available' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {vendor.availability}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Booking */}
        <Card className="bg-gradient-card border-border/50 mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Restaurant Reservations</CardTitle>
            <CardDescription>Real-time availability for dining reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {restaurants.map((restaurant, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-foreground">{restaurant.name}</h4>
                    <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4" />
                      {restaurant.capacity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{restaurant.priceRange}</p>
                    <Badge variant="default" className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                      {restaurant.availability}
                    </Badge>
                    <Button size="sm" className="mt-2 w-full bg-gradient-primary hover:opacity-90">
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;