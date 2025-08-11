import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, Calendar, Car, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EventVendorAvailability = () => {
  const { toast } = useToast();
  const [availability, setAvailability] = useState({
    workingDays: [] as string[],
    startTime: "",
    endTime: "",
    advanceNotice: "",
    travelDistance: "",
    canTravelOutsideRegion: false,
    canTravelNationally: false,
    minimumBookingHours: "",
  });

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
  ];

  const advanceNoticeOptions = [
    "24 hours",
    "48 hours", 
    "1 week",
    "2 weeks",
    "1 month"
  ];

  const travelDistanceOptions = [
    "Within city only",
    "Up to 50km",
    "Up to 100km",
    "Up to 200km",
    "Anywhere in region"
  ];

  const minimumBookingOptions = [
    "2 hours",
    "4 hours",
    "6 hours",
    "8 hours",
    "Full day (8+ hours)"
  ];

  const handleDayToggle = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleSave = () => {
    if (availability.workingDays.length === 0) {
      toast({
        title: "Please select working days",
        description: "You must select at least one working day.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Availability settings saved!",
      description: "Your working hours and travel preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/vendor-setup">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendor Setup
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Set Availability</h1>
          <p className="text-muted-foreground mt-1">
            Define your working hours and travel preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Working Hours
            </CardTitle>
            <CardDescription>
              Set your available days and operating hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Working Days</Label>
              <div className="grid grid-cols-2 gap-2">
                {daysOfWeek.map((day) => (
                  <Badge
                    key={day}
                    variant={availability.workingDays.includes(day) ? "default" : "outline"}
                    className="cursor-pointer justify-center py-2 transition-colors"
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={availability.startTime}
                  onChange={(e) => setAvailability(prev => ({...prev, startTime: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={availability.endTime}
                  onChange={(e) => setAvailability(prev => ({...prev, endTime: e.target.value}))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="advanceNotice">Minimum Advance Notice</Label>
              <Select
                value={availability.advanceNotice}
                onValueChange={(value) => setAvailability(prev => ({...prev, advanceNotice: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum notice required" />
                </SelectTrigger>
                <SelectContent>
                  {advanceNoticeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumBooking">Minimum Booking Duration</Label>
              <Select
                value={availability.minimumBookingHours}
                onValueChange={(value) => setAvailability(prev => ({...prev, minimumBookingHours: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum booking duration" />
                </SelectTrigger>
                <SelectContent>
                  {minimumBookingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Travel Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Travel Preferences
            </CardTitle>
            <CardDescription>
              Define your service area and travel options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="travelDistance">Service Area</Label>
              <Select
                value={availability.travelDistance}
                onValueChange={(value) => setAvailability(prev => ({...prev, travelDistance: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your service area" />
                </SelectTrigger>
                <SelectContent>
                  {travelDistanceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Travel Outside Region</Label>
                    <p className="text-xs text-muted-foreground">
                      Accept bookings outside your current region
                    </p>
                  </div>
                </div>
                <Switch
                  checked={availability.canTravelOutsideRegion}
                  onCheckedChange={(checked) => 
                    setAvailability(prev => ({...prev, canTravelOutsideRegion: checked}))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">National Travel</Label>
                    <p className="text-xs text-muted-foreground">
                      Accept bookings anywhere in Ghana
                    </p>
                  </div>
                </div>
                <Switch
                  checked={availability.canTravelNationally}
                  onCheckedChange={(checked) => 
                    setAvailability(prev => ({...prev, canTravelNationally: checked}))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendar Integration
          </CardTitle>
          <CardDescription>
            Sync with your calendar to automatically block unavailable dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Connect Google Calendar
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Connect Outlook Calendar
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Manual Calendar Setup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {availability.workingDays.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Availability Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Working Days:</strong> {availability.workingDays.join(", ")}</p>
              {availability.startTime && availability.endTime && (
                <p><strong>Hours:</strong> {availability.startTime} - {availability.endTime}</p>
              )}
              {availability.travelDistance && (
                <p><strong>Service Area:</strong> {availability.travelDistance}</p>
              )}
              {availability.advanceNotice && (
                <p><strong>Advance Notice:</strong> {availability.advanceNotice}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          Save Availability Settings
        </Button>
        <Button variant="outline" asChild>
          <Link to="/dashboard/vendor-setup">
            Back to Setup
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/dashboard/vendor-gallery">
            Next: Service Gallery
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventVendorAvailability;