import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Package, MapPin, Plus, X, Clock, Users } from "lucide-react";

const EventVendorPricing = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([
    { id: 1, name: "Basic Package", price: "", description: "", duration: "", capacity: "" }
  ]);
  const [travelRadius, setTravelRadius] = useState("");
  const [travelFee, setTravelFee] = useState("");
  const [willingToTravel, setWillingToTravel] = useState(false);
  const [baseRate, setBaseRate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [setupFee, setSetupFee] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  const addPackage = () => {
    const newId = Math.max(...packages.map(p => p.id)) + 1;
    setPackages([...packages, {
      id: newId,
      name: "",
      price: "",
      description: "",
      duration: "",
      capacity: ""
    }]);
  };

  const removePackage = (id: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const updatePackage = (id: number, field: string, value: string) => {
    setPackages(packages.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = () => {
    toast({
      title: "Pricing saved!",
      description: "Your pricing information has been saved successfully.",
    });
  };

  const handleNext = () => {
    handleSubmit();
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Set Your Pricing</h1>
        <p className="text-muted-foreground">
          Define your rates, packages, and travel preferences to attract potential clients
        </p>
      </div>

      <div className="grid gap-6">
        {/* Base Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Base Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baseRate">Base Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₵</span>
                  <Input
                    id="baseRate"
                    type="number"
                    placeholder="500"
                    value={baseRate}
                    onChange={(e) => setBaseRate(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₵</span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="75"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="setupFee">Setup Fee</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₵</span>
                  <Input
                    id="setupFee"
                    type="number"
                    placeholder="100"
                    value={setupFee}
                    onChange={(e) => setSetupFee(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Packages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Service Packages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Package {index + 1}</Badge>
                  {packages.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePackage(pkg.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Package Name</Label>
                    <Input
                      placeholder="e.g., Wedding Photography Basic"
                      value={pkg.name}
                      onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₵</span>
                      <Input
                        type="number"
                        placeholder="800"
                        value={pkg.price}
                        onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </Label>
                    <Select onValueChange={(value) => updatePackage(pkg.id, 'duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-hour">1 Hour</SelectItem>
                        <SelectItem value="2-hours">2 Hours</SelectItem>
                        <SelectItem value="4-hours">4 Hours</SelectItem>
                        <SelectItem value="6-hours">6 Hours</SelectItem>
                        <SelectItem value="8-hours">8 Hours</SelectItem>
                        <SelectItem value="full-day">Full Day</SelectItem>
                        <SelectItem value="multi-day">Multiple Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Guest Capacity
                    </Label>
                    <Input
                      placeholder="e.g., Up to 50 guests"
                      value={pkg.capacity}
                      onChange={(e) => updatePackage(pkg.id, 'capacity', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Package Description</Label>
                  <Textarea
                    placeholder="Describe what's included in this package..."
                    value={pkg.description}
                    onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button variant="outline" onClick={addPackage} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Package
            </Button>
          </CardContent>
        </Card>

        {/* Travel Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Willing to Travel</Label>
                <p className="text-sm text-muted-foreground">
                  Are you willing to travel for events?
                </p>
              </div>
              <Switch
                checked={willingToTravel}
                onCheckedChange={setWillingToTravel}
              />
            </div>
            
            {willingToTravel && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelRadius">Travel Radius (miles)</Label>
                    <Input
                      id="travelRadius"
                      type="number"
                      placeholder="25"
                      value={travelRadius}
                      onChange={(e) => setTravelRadius(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelFee">Travel Fee</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₵</span>
                      <Input
                        id="travelFee"
                        type="number"
                        placeholder="50"
                        value={travelFee}
                        onChange={(e) => setTravelFee(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Cancellation Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">Policy Details</Label>
              <Textarea
                id="cancellationPolicy"
                placeholder="Describe your cancellation and refund policy..."
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/dashboard/vendor-videos")}>
            Previous: Service Videos
          </Button>
          <Button onClick={handleNext}>
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventVendorPricing;