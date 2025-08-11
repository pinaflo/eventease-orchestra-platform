import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TicketQRCode } from "@/components/TicketQRCode";
import { Search, Ticket, Users, Download, Mail } from "lucide-react";
import { toast } from "sonner";

// Mock ticket data - in real app, this would come from your database
const mockTickets = [
  {
    id: "TKT-001",
    eventId: "EVT-001",
    attendeeName: "John Doe",
    email: "john@example.com",
    ticketType: "VIP",
    price: 1500,
    purchaseDate: "2024-01-15",
    eventName: "Ghana Culture Festival 2024",
    eventDate: "2024-02-20",
    venue: "Accra International Conference Centre",
    status: "confirmed"
  },
  {
    id: "TKT-002",
    eventId: "EVT-001",
    attendeeName: "Jane Smith",
    email: "jane@example.com",
    ticketType: "Standard",
    price: 800,
    purchaseDate: "2024-01-16",
    eventName: "Ghana Culture Festival 2024",
    eventDate: "2024-02-20",
    venue: "Accra International Conference Centre",
    status: "confirmed"
  },
  {
    id: "TKT-003",
    eventId: "EVT-001",
    attendeeName: "Kwame Asante",
    email: "kwame@example.com",
    ticketType: "Student",
    price: 400,
    purchaseDate: "2024-01-17",
    eventName: "Ghana Culture Festival 2024",
    eventDate: "2024-02-20",
    venue: "Accra International Conference Centre",
    status: "confirmed"
  }
];

const TicketManagement = () => {
  const [tickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);

  const filteredTickets = tickets.filter(ticket =>
    ticket.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateAllQRCodes = () => {
    toast.success(`Generating QR codes for ${tickets.length} tickets...`);
    // In a real app, you'd batch generate and email QR codes to all attendees
  };

  const emailQRCode = (ticket: typeof selectedTicket) => {
    toast.success(`QR code emailed to ${ticket.email}`);
    // In a real app, you'd send the QR code via email
  };

  const totalRevenue = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management</h1>
          <p className="text-muted-foreground">
            Manage tickets and QR codes for your events
          </p>
        </div>
        <Button onClick={generateAllQRCodes} className="gap-2">
          <Download className="w-4 h-4" />
          Generate All QR Codes
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">
              All confirmed tickets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">
              Unique attendees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-sm">₵</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From ticket sales
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket List */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ticket ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTicket.id === ticket.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ticket.attendeeName}</span>
                      <Badge variant="outline">{ticket.ticketType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{ticket.email}</p>
                    <p className="text-sm text-muted-foreground">ID: {ticket.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₵{ticket.price}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        emailQRCode(ticket);
                      }}
                      variant="ghost"
                      size="sm"
                      className="gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Email QR
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Attendee</Label>
                  <p className="font-medium">{selectedTicket.attendeeName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ticket Type</Label>
                  <p className="font-medium">{selectedTicket.ticketType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Price</Label>
                  <p className="font-medium">₵{selectedTicket.price}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Purchase Date</Label>
                  <p className="font-medium">{selectedTicket.purchaseDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Component */}
          <div className="flex justify-center">
            <TicketQRCode ticket={selectedTicket} size={250} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;