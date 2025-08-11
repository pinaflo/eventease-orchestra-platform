import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MapPin, Globe, ArrowLeft, Check } from "lucide-react";

const EventVendorLocation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    address: "",
    travelRadius: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.city || !formData.country) {
      toast({
        title: "Missing Information",
        description: "Please enter both city and country.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Location Settings Saved",
      description: "Your location information has been updated successfully.",
    });

    // Navigate to vendor network or dashboard
    navigate("/dashboard/vendor-network");
  };

  const handleBack = () => {
    navigate("/dashboard/vendor-pricing");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Set Your Location</h1>
          <p className="text-muted-foreground text-lg">
            Enter your city and country to help clients find you
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g., Accra"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  placeholder="e.g., Ghana"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address (Optional)</Label>
              <Input
                id="address"
                placeholder="Street address, postal code"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Travel Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="travelRadius">Travel Radius (km)</Label>
              <Input
                id="travelRadius"
                type="number"
                placeholder="e.g., 50"
                value={formData.travelRadius}
                onChange={(e) => handleInputChange("travelRadius", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Maximum distance you're willing to travel for events
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any specific notes about your location or travel preferences..."
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
          <Check className="w-4 h-4 mr-2" />
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default EventVendorLocation;