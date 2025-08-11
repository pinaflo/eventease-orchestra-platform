import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface TicketData {
  id: string;
  eventId: string;
  attendeeName: string;
  ticketType: string;
  price: number;
  purchaseDate: string;
  eventName: string;
  eventDate: string;
  venue: string;
}

interface TicketQRCodeProps {
  ticket: TicketData;
  size?: number;
}

export const TicketQRCode = ({ ticket, size = 200 }: TicketQRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // Generate unique ticket data for QR code
  const generateQRData = () => {
    return JSON.stringify({
      ticketId: ticket.id,
      eventId: ticket.eventId,
      attendee: ticket.attendeeName,
      type: ticket.ticketType,
      event: ticket.eventName,
      date: ticket.eventDate,
      venue: ticket.venue,
      verified: true,
      timestamp: Date.now()
    });
  };

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current) {
        try {
          const qrData = generateQRData();
          await QRCode.toCanvas(canvasRef.current, qrData, {
            width: size,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          
          // Also generate data URL for download
          const dataUrl = await QRCode.toDataURL(qrData, {
            width: size,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          setQrDataUrl(dataUrl);
        } catch (error) {
          console.error('Error generating QR code:', error);
          toast.error('Failed to generate QR code');
        }
      }
    };

    generateQR();
  }, [ticket, size]);

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = `ticket-${ticket.id}-qr.png`;
      link.href = qrDataUrl;
      link.click();
      toast.success('QR code downloaded');
    }
  };

  const copyQRData = async () => {
    try {
      const qrData = generateQRData();
      await navigator.clipboard.writeText(qrData);
      setIsCopied(true);
      toast.success('Ticket data copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy ticket data');
    }
  };

  return (
    <Card className="w-fit">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg">Ticket QR Code</CardTitle>
        <p className="text-sm text-muted-foreground">
          Scan at event entrance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="border rounded-lg" />
        </div>
        
        <div className="space-y-2 text-sm text-center">
          <p className="font-medium">{ticket.eventName}</p>
          <p className="text-muted-foreground">{ticket.attendeeName}</p>
          <p className="text-muted-foreground">{ticket.ticketType}</p>
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={downloadQR} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={copyQRData} variant="outline" size="sm">
            {isCopied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {isCopied ? 'Copied' : 'Copy Data'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};