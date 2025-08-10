import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, CalendarPlus, BarChart3, Users, Settings, UserCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

const DashboardLayout = () => {
  const navItems = [
    { icon: CalendarPlus, label: "Create Event", path: "/dashboard/create-event" },
    { icon: UserCheck, label: "Event Host", path: "/dashboard/event-host" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Users, label: "Attendees", path: "/dashboard/attendees" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-foreground text-2xl font-extrabold">OUTSIDE</span>
            </div>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Right Navigation */}
        <nav className="w-64 border-l border-border bg-muted/30 p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Navigation</h3>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;