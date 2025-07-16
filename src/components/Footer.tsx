import { Calendar, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold text-foreground">EventEase</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Complete event management platform for seamless event planning, vendor coordination, and real-time bookings.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Event Management</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Vendor Network</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Ticketing System</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Restaurant Booking</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Developer Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Best Practices</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 EventEase. Built with modern web technologies.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Scalable • Secure • Reliable
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;