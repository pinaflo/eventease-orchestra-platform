import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  User, 
  Clock, 
  HelpCircle, 
  Layout,
  Eye,
  Check,
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EventReview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in a real app this would come from form state/context
  const eventData = {
    basic: {
      title: "Annual Tech Conference 2024",
      type: "Conference",
      description: "A comprehensive technology conference featuring the latest innovations and industry leaders.",
      date: "March 15, 2024",
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      location: "San Francisco Convention Center",
      parkingAvailable: true,
      wheelchairAccess: true,
      liftAccess: true,
    },
    pricing: {
      ticketType: "paid",
      price: "$299",
      currency: "USD",
      earlyBird: true,
      earlyBirdPrice: "$249",
      earlyBirdDeadline: "February 15, 2024",
    },
    host: {
      name: "Tech Innovations Inc.",
      email: "events@techinnovations.com",
      jobTitle: "Event Director",
      phone: "+1 (555) 123-4567",
      adminAccess: true,
      eventPageVisible: true,
    },
    agenda: [
      { time: "9:00 AM", title: "Registration & Welcome Coffee", speaker: "Event Team" },
      { time: "10:00 AM", title: "Opening Keynote", speaker: "Dr. Sarah Johnson" },
      { time: "11:30 AM", title: "Panel: Future of AI", speaker: "Industry Experts" },
    ],
    faqs: [
      { question: "What's included in the ticket?", answer: "Access to all sessions, lunch, coffee breaks, and networking events." },
      { question: "Is parking available?", answer: "Yes, complimentary parking is available at the venue." },
    ],
    seating: {
      layout: "Theater Style",
      capacity: "500",
      hasReservedSeating: true,
      accessibilitySeating: true,
      accessibilityCount: "10",
      vipSeating: true,
      vipCount: "50",
    },
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Event published successfully!",
      description: "Your event is now live and ready for registrations.",
    });
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const handleEdit = (section: string) => {
    // Navigate to specific section for editing
    switch (section) {
      case 'basic':
        navigate("/dashboard/create-event");
        break;
      case 'pricing':
        navigate("/dashboard/event-pricing");
        break;
      case 'host':
        navigate("/dashboard/event-host");
        break;
      case 'agenda':
        navigate("/dashboard/event-agenda");
        break;
      case 'faq':
        navigate("/dashboard/event-faq");
        break;
      case 'seating':
        navigate("/dashboard/event-seating");
        break;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Information</h1>
        <p className="text-muted-foreground">
          Preview your event details before publishing. You can edit any section if needed.
        </p>
      </div>

      <div className="space-y-6">
        {/* Event Basics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit('basic')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{eventData.basic.title}</h3>
              <Badge variant="secondary" className="mt-1">{eventData.basic.type}</Badge>
            </div>
            <p className="text-muted-foreground">{eventData.basic.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{eventData.basic.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{eventData.basic.startTime} - {eventData.basic.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{eventData.basic.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Wheelchair accessible</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit('pricing')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Regular Price</p>
                <p className="text-2xl font-bold">{eventData.pricing.price}</p>
              </div>
              <div>
                <p className="font-medium">Early Bird Price</p>
                <p className="text-2xl font-bold text-green-600">{eventData.pricing.earlyBirdPrice}</p>
                <p className="text-sm text-muted-foreground">Until {eventData.pricing.earlyBirdDeadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Host Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Host Information
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit('host')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Host:</span> {eventData.host.name}</p>
              <p><span className="font-medium">Email:</span> {eventData.host.email}</p>
              <p><span className="font-medium">Role:</span> {eventData.host.jobTitle}</p>
              <p><span className="font-medium">Phone:</span> {eventData.host.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Agenda */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Event Agenda
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit('agenda')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventData.agenda.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 border rounded-lg">
                  <div className="font-medium text-sm w-20">{item.time}</div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.speaker}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit('faq')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventData.faqs.map((faq, index) => (
                <div key={index}>
                  <p className="font-medium">{faq.question}</p>
                  <p className="text-muted-foreground text-sm mt-1">{faq.answer}</p>
                  {index < eventData.faqs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seating */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Seating Arrangements
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit('seating')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-medium">Layout:</span> {eventData.seating.layout}</p>
                <p><span className="font-medium">Total Capacity:</span> {eventData.seating.capacity} seats</p>
              </div>
              <div>
                <p><span className="font-medium">VIP Seats:</span> {eventData.seating.vipCount}</p>
                <p><span className="font-medium">Accessibility Seats:</span> {eventData.seating.accessibilityCount}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline">Reserved Seating</Badge>
              <Badge variant="outline">Wheelchair Accessible</Badge>
              <Badge variant="outline">VIP Section</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard/event-seating")}
              >
                Back to Seating
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview Event Page
                </Button>
                
                <Button
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  {isSubmitting ? "Publishing..." : "Publish Event"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventReview;