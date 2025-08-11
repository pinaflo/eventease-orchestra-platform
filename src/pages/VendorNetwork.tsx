import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, Users } from "lucide-react";

const VendorNetwork = () => {
  const vendors = [
    {
      id: 1,
      name: "Elite Catering Co.",
      service: "Catering",
      rating: 4.8,
      reviews: 124,
      location: "Accra, Ghana",
      pricing: "₵₵₵",
      availability: "Available",
      phone: "+233 20 123 4567",
      email: "info@elitecatering.gh",
      description: "Premium catering services for corporate and private events",
      specialties: ["Corporate Events", "Weddings", "Private Parties"]
    },
    {
      id: 2,
      name: "SoundWave Productions",
      service: "Audio/Visual",
      rating: 4.9,
      reviews: 89,
      location: "Kumasi, Ghana",
      pricing: "₵₵",
      availability: "Booked",
      phone: "+233 24 987 6543",
      email: "bookings@soundwave.gh",
      description: "Professional sound and lighting solutions for all event types",
      specialties: ["Concerts", "Conferences", "Festivals"]
    },
    {
      id: 3,
      name: "Bloom & Blossom",
      service: "Floral Design",
      rating: 4.7,
      reviews: 156,
      location: "Tema, Ghana",
      pricing: "₵₵",
      availability: "Available",
      phone: "+233 26 456 7890",
      email: "hello@bloomblossom.gh",
      description: "Creative floral arrangements and event decoration services",
      specialties: ["Weddings", "Corporate", "Birthdays"]
    },
    {
      id: 4,
      name: "Ghana Event Security",
      service: "Security",
      rating: 4.6,
      reviews: 203,
      location: "Accra, Ghana",
      pricing: "₵₵₵",
      availability: "Available",
      phone: "+233 30 234 5678",
      email: "security@ghaevents.gh",
      description: "Professional security services for events of all sizes",
      specialties: ["VIP Protection", "Crowd Control", "Event Monitoring"]
    },
    {
      id: 5,
      name: "Tropical Transport",
      service: "Transportation",
      rating: 4.5,
      reviews: 78,
      location: "Takoradi, Ghana",
      pricing: "₵₵",
      availability: "Available",
      phone: "+233 31 345 6789",
      email: "fleet@tropicaltransport.gh",
      description: "Luxury transportation and shuttle services for events",
      specialties: ["Luxury Cars", "Buses", "Wedding Cars"]
    },
    {
      id: 6,
      name: "Digital Memories",
      service: "Photography",
      rating: 4.9,
      reviews: 167,
      location: "Cape Coast, Ghana",
      pricing: "₵₵₵",
      availability: "Limited",
      phone: "+233 33 567 8901",
      email: "capture@digitalmemories.gh",
      description: "Professional photography and videography for special moments",
      specialties: ["Weddings", "Corporate Events", "Portraits"]
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Limited":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Booked":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Network</h1>
          <p className="text-muted-foreground mt-1">
            Connect with trusted vendors for your events
          </p>
        </div>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add New Vendor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendors</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Now</p>
                <p className="text-2xl font-bold text-green-600">89</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">4.7</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-2xl font-bold text-foreground">34</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {vendor.location}
                  </CardDescription>
                </div>
                <Badge className={getAvailabilityColor(vendor.availability)}>
                  {vendor.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{vendor.service}</span>
                  <span className="text-sm text-muted-foreground">{vendor.pricing}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{vendor.rating}</span>
                  <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
                </div>
                <p className="text-sm text-muted-foreground">{vendor.description}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {vendor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  {vendor.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {vendor.email}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                  Contact
                </Button>
                <Button className="flex-1">
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorNetwork;