import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Store, MapPin, Phone, Mail, DollarSign, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EventVendorSetup = () => {
  const { toast } = useToast();
  const [isVendorModeEnabled, setIsVendorModeEnabled] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    serviceCategory: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    priceRange: "",
    specialties: [] as string[],
  });

  const serviceCategories = [
    "Catering",
    "Audio/Visual",
    "Floral Design",
    "Photography",
    "Transportation",
    "Security",
    "Entertainment",
    "Decoration",
    "Planning & Coordination",
    "Venues",
    "Cleaning Service",
    "Make Up Artist",
    "Hair Stylist",
    "Bartender",
    "Marketing Specialist",
    "DJ"
  ];

  const priceRanges = [
    "₵ - Budget Friendly",
    "₵₵ - Moderate",
    "₵₵₵ - Premium",
    "₵₵₵₵ - Luxury"
  ];

  const availableSpecialties = [
    "Weddings", "Corporate Events", "Private Parties", "Conferences", 
    "Festivals", "Birthdays", "Anniversaries", "Product Launches",
    "Networking Events", "Charity Events"
  ];

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSave = () => {
    if (!formData.businessName || !formData.serviceCategory) {
      toast({
        title: "Please fill required fields",
        description: "Business name and service category are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Vendor profile saved!",
      description: isVendorModeEnabled 
        ? "Your vendor profile is now active and visible to event organizers."
        : "Your vendor profile has been saved. Enable vendor mode to start receiving bookings.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/vendor-network">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendor Network
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Vendor Setup</h1>
          <p className="text-muted-foreground mt-1">
            Configure your Event Vendor profile to start offering services to event organizers
          </p>
        </div>
      </div>

      {/* Vendor Mode Toggle */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Event Vendor Mode</CardTitle>
                <CardDescription>
                  Enable to offer your services to event organizers
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={isVendorModeEnabled}
              onCheckedChange={setIsVendorModeEnabled}
            />
          </div>
        </CardHeader>
        {isVendorModeEnabled && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Your vendor profile is now active and visible to event organizers
            </div>
          </CardContent>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Essential details about your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={(e) => setFormData(prev => ({...prev, businessName: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Service Category *</Label>
              <Select
                value={formData.serviceCategory}
                onValueChange={(value) => setFormData(prev => ({...prev, serviceCategory: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your service category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your services and what makes you unique"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              How event organizers can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="City, Region, Ghana"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="+233 20 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range
              </Label>
              <Select
                value={formData.priceRange}
                onValueChange={(value) => setFormData(prev => ({...prev, priceRange: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Event Specialties
          </CardTitle>
          <CardDescription>
            Select the types of events you specialize in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {availableSpecialties.map((specialty) => (
              <Badge
                key={specialty}
                variant={formData.specialties.includes(specialty) ? "default" : "outline"}
                className="cursor-pointer justify-center py-2 transition-colors"
                onClick={() => handleSpecialtyToggle(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
          {formData.specialties.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected specialties:</p>
              <div className="flex flex-wrap gap-1">
                {formData.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          Save Vendor Profile
        </Button>
        <Button variant="outline" asChild>
          <Link to="/dashboard/vendor-network">
            Cancel
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventVendorSetup;