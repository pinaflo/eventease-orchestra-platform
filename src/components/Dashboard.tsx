import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Star,
  Plus,
  Settings,
  BarChart3,
  MessageCircle,
  Mail,
  UserCheck,
  Ticket,
  MapPin,
  Palette,
  CreditCard,
  ChevronRight,
  Search
} from "lucide-react";

const Dashboard = () => {
  const quickActions = [
    {
      title: "Create Event",
      description: "Start planning your next amazing event",
      icon: Plus,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
      action: "Go to create event",
      href: "/dashboard/create-event"
    },
    {
      title: "Manage Events",
      description: "View and manage your existing events",
      icon: Calendar,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
      action: "Go to manage events",
      href: "/dashboard/events"
    },
    {
      title: "Guest List",
      description: "Manage your guest lists and RSVPs",
      icon: Users,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
      action: "Go to guest list",
      href: "/dashboard/guests"
    },
    {
      title: "Tickets",
      description: "Track ticket sales and manage pricing",
      icon: Ticket,
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      iconColor: "text-orange-600",
      action: "Go to tickets",
      href: "/dashboard/tickets"
    },
    {
      title: "Invite Friends",
      description: "Invite friends and earn Bashcoins rewards",
      icon: Mail,
      color: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
      iconColor: "text-cyan-600",
      action: "Go to invite friends",
      href: "/dashboard/invite"
    },
    {
      title: "Analytics",
      description: "View event performance and insights",
      icon: BarChart3,
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
      iconColor: "text-pink-600",
      action: "Go to analytics",
      href: "/dashboard/analytics"
    }
  ];

  const managementTools = [
    {
      title: "Settings",
      description: "Customize your event preferences",
      icon: Settings,
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      iconColor: "text-gray-600",
      action: "Go to settings",
      href: "/dashboard/settings"
    },
    {
      title: "Vendor Configuration",
      description: "Configure and manage your vendor profile",
      icon: Star,
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
      iconColor: "text-indigo-600",
      action: "Go to vendor configuration",
      href: "/dashboard/vendors"
    },
    {
      title: "Theme Customization",
      description: "Personalize your event site appearance",
      icon: Palette,
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      iconColor: "text-violet-600",
      action: "Go to theme customization",
      href: "/dashboard/themes"
    },
    {
      title: "RSVP Management",
      description: "Track and manage event responses",
      icon: UserCheck,
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      iconColor: "text-emerald-600",
      action: "Go to rsvp management",
      href: "/dashboard/rsvp"
    },
    {
      title: "Communications",
      description: "Send messages and updates to guests",
      icon: MessageCircle,
      color: "bg-sky-50 border-sky-200 hover:bg-sky-100",
      iconColor: "text-sky-600",
      action: "Go to communications",
      href: "/dashboard/communications"
    },
    {
      title: "Booking Management",
      description: "Track payments and booking status",
      icon: CreditCard,
      color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
      iconColor: "text-teal-600",
      action: "Go to booking management",
      href: "/dashboard/bookings"
    },
    {
      title: "Seating Arrangement",
      description: "Organize and assign table seating",
      icon: MapPin,
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      iconColor: "text-amber-600",
      action: "Go to seating arrangement",
      href: "/dashboard/seating"
    }
  ];

  const stats = [
    { label: "Total Events", value: "24", icon: Calendar },
    { label: "Total Attendees", value: "1,542", icon: Users },
    { label: "Revenue", value: "$48,350", icon: DollarSign },
    { label: "Active Vendors", value: "12", icon: Star }
  ];

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Event Dashboard
              </h1>
              <p className="text-muted-foreground">
                Create, manage, and track your events with our comprehensive suite of tools designed for success
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search events or features..." 
              className="pl-10 bg-card border-border/50"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card border-border/50 hover:shadow-sm transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className="w-5 h-5 text-primary opacity-80" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Events Message */}
        <Card className="bg-blue-50 border-blue-200 mb-8">
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">No Events with Bookings</h3>
            <p className="text-blue-700">No events have bookings at this time</p>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className={`${action.color} border transition-all duration-200 hover:shadow-md cursor-pointer group`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-8 h-8 ${action.iconColor}`} />
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {action.action} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Management Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {managementTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={index} 
                className={`${tool.color} border transition-all duration-200 hover:shadow-md cursor-pointer group`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-7 h-7 ${tool.iconColor}`} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{tool.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{tool.description}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs font-medium text-gray-700 hover:text-gray-900"
                  >
                    {tool.action} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;