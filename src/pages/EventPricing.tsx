import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, DollarSign, Clock, Globe, Lock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const pricingSchema = z.object({
  eventType: z.enum(["private", "public"], {
    required_error: "Please select an event type",
  }),
  maxCapacity: z.string().min(1, "Max capacity is required").transform((val) => parseInt(val, 10)),
  rsvpRequired: z.boolean(),
  rsvpDeadline: z.date().optional(),
  rsvpDescription: z.string().optional(),
  isPaid: z.boolean(),
  absorbTransactionFees: z.boolean().optional(),
  currency: z.string().default("GHS"),
}).refine(
  (data) => {
    if (data.rsvpRequired && !data.rsvpDeadline) {
      return false;
    }
    return true;
  },
  {
    message: "RSVP deadline is required when RSVP is required",
    path: ["rsvpDeadline"],
  }
);

type PricingFormData = z.infer<typeof pricingSchema>;

export default function EventPricing() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      eventType: undefined,
      maxCapacity: undefined,
      rsvpRequired: false,
      rsvpDeadline: undefined,
      rsvpDescription: "",
      isPaid: false,
      absorbTransactionFees: false,
      currency: "GHS",
    },
  });

  const watchRsvpRequired = form.watch("rsvpRequired");
  const watchIsPaid = form.watch("isPaid");

  const onSubmit = async (data: PricingFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Pricing data:", data);
      // Handle form submission here
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting pricing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Event Pricing & Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Event Type */}
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Type of Event
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Public
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Private
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Capacity */}
              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Maximum Capacity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter maximum number of attendees"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* RSVP Required */}
              <FormField
                control={form.control}
                name="rsvpRequired"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2 text-base">
                        <Clock className="w-4 h-4" />
                        RSVP Requirement
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Require attendees to RSVP for this event
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* RSVP Details - Only show if RSVP is required */}
              {watchRsvpRequired && (
                <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
                  <h3 className="font-medium">RSVP Details</h3>
                  
                  {/* RSVP Deadline */}
                  <FormField
                    control={form.control}
                    name="rsvpDeadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>RSVP Deadline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick RSVP deadline</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* RSVP Description */}
                  <FormField
                    control={form.control}
                    name="rsvpDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RSVP Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional instructions for RSVPs..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Is Event Paid */}
              <FormField
                control={form.control}
                name="isPaid"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Paid Event
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Charge attendees for this event
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Payment Details - Only show if event is paid */}
              {watchIsPaid && (
                <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
                  <h3 className="font-medium">Payment Details</h3>

                  {/* Currency */}
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="GHS">Ghana Cedi (GHS)</SelectItem>
                            <SelectItem value="USD">US Dollar (USD)</SelectItem>
                            <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Absorb Transaction Fees */}
                  <FormField
                    control={form.control}
                    name="absorbTransactionFees"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium">
                            Absorb Transaction Fees
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Cover transaction costs for attendees
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/dashboard/event-accessibility")}
                >
                  Previous
                </Button>
                
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}