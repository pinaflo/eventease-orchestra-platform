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
import { CalendarIcon, Users, DollarSign, Clock, Globe, Lock, Tag, Ticket, Percent, Plus, Trash2, ShoppingBag, Image } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const addOnSchema = z.object({
  name: z.string().min(1, "Add-on name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform((val) => parseFloat(val)),
  quantity: z.string().min(1, "Quantity is required").transform((val) => parseInt(val, 10)),
  image: z.string().optional(),
});

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
  pricingType: z.enum(["standard", "early_bird", "vip"]).optional(),
  ticketPrice: z.string().optional().transform((val) => val ? parseFloat(val) : undefined),
  totalTickets: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined),
  enableDiscount: z.boolean().optional(),
  discountPercentage: z.string().optional().transform((val) => val ? parseFloat(val) : undefined),
  refundPolicy: z.boolean().optional(),
  addOns: z.array(addOnSchema).optional(),
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
).refine(
  (data) => {
    if (data.isPaid && (!data.pricingType || !data.ticketPrice || !data.totalTickets)) {
      return false;
    }
    return true;
  },
  {
    message: "Pricing details are required for paid events",
    path: ["pricingType"],
  }
).refine(
  (data) => {
    if (data.enableDiscount && (!data.discountPercentage || data.discountPercentage <= 0 || data.discountPercentage >= 100)) {
      return false;
    }
    return true;
  },
  {
    message: "Valid discount percentage (1-99) is required when discount is enabled",
    path: ["discountPercentage"],
  }
);

type PricingFormData = z.infer<typeof pricingSchema>;

export default function EventPricing() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addOns, setAddOns] = useState([{ name: "", description: "", price: "", quantity: "", image: "" }]);

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
      pricingType: undefined,
      ticketPrice: undefined,
      totalTickets: undefined,
      enableDiscount: false,
      discountPercentage: undefined,
      refundPolicy: false,
      addOns: [],
    },
  });

  const watchRsvpRequired = form.watch("rsvpRequired");
  const watchIsPaid = form.watch("isPaid");
  const watchEnableDiscount = form.watch("enableDiscount");

  const addNewAddOn = () => {
    setAddOns([...addOns, { name: "", description: "", price: "", quantity: "", image: "" }]);
  };

  const removeAddOn = (index: number) => {
    if (addOns.length > 1) {
      setAddOns(addOns.filter((_, i) => i !== index));
    }
  };

  const updateAddOn = (index: number, field: string, value: string) => {
    const updatedAddOns = [...addOns];
    updatedAddOns[index] = { ...updatedAddOns[index], [field]: value };
    setAddOns(updatedAddOns);
  };

  const onSubmit = async (data: PricingFormData) => {
    setIsSubmitting(true);
    try {
      // Include add-ons in the submission data
      const formattedAddOns = addOns
        .filter(addOn => addOn.name.trim() !== "")
        .map(addOn => ({
          name: addOn.name,
          description: addOn.description,
          price: parseFloat(addOn.price) || 0,
          quantity: parseInt(addOn.quantity) || 0,
        }));
      
      const submissionData = {
        ...data,
        addOns: formattedAddOns,
      };
      
      console.log("Pricing data:", submissionData);
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

                  {/* Pricing Type */}
                  <FormField
                    control={form.control}
                    name="pricingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Pricing Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="early_bird">Early Bird</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Ticket Price and Total Tickets */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ticketPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Ticket Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalTickets"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Ticket className="w-4 h-4" />
                            Total Tickets
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter total tickets"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Enable Discount */}
                  <FormField
                    control={form.control}
                    name="enableDiscount"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="flex items-center gap-2 text-sm font-medium">
                            <Percent className="w-4 h-4" />
                            Enable Discount
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Offer discounted tickets
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

                  {/* Discount Details - Only show if discount is enabled */}
                  {watchEnableDiscount && (
                    <FormField
                      control={form.control}
                      name="discountPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Percentage</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="99"
                              placeholder="Enter discount percentage (1-99)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Refund Policy */}
                  <FormField
                    control={form.control}
                    name="refundPolicy"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium">
                            Refund Policy
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Allow refunds up to 7 days before event
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

              {/* Add-ons Section */}
              <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Add-ons & Merchandise
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sell additional items like merchandise, food, or services
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addNewAddOn}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>
                </div>

                {addOns.map((addOn, index) => (
                  <div key={index} className="space-y-3 rounded-lg border p-3 bg-background">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Item {index + 1}</h4>
                      {addOns.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAddOn(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`addon-name-${index}`} className="text-xs">Name *</Label>
                        <Input
                          id={`addon-name-${index}`}
                          placeholder="e.g., T-shirt, Food, Drink"
                          value={addOn.name}
                          onChange={(e) => updateAddOn(index, "name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`addon-price-${index}`} className="text-xs">Price *</Label>
                        <Input
                          id={`addon-price-${index}`}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={addOn.price}
                          onChange={(e) => updateAddOn(index, "price", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`addon-quantity-${index}`} className="text-xs">Available Quantity *</Label>
                        <Input
                          id={`addon-quantity-${index}`}
                          type="number"
                          placeholder="e.g., 50"
                          value={addOn.quantity}
                          onChange={(e) => updateAddOn(index, "quantity", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`addon-description-${index}`} className="text-xs">Description</Label>
                        <Input
                          id={`addon-description-${index}`}
                          placeholder="Optional description"
                          value={addOn.description}
                          onChange={(e) => updateAddOn(index, "description", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <Label htmlFor={`addon-image-${index}`} className="text-xs flex items-center gap-2">
                        <Image className="w-3 h-3" />
                        Product Image
                      </Label>
                      <div className="mt-1 space-y-2">
                        <Input
                          id={`addon-image-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // For now, just store the file name
                              // In production, you would upload to storage
                              updateAddOn(index, "image", file.name);
                            }
                          }}
                          className="cursor-pointer"
                        />
                        {addOn.image && (
                          <p className="text-xs text-muted-foreground">
                            Selected: {addOn.image}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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