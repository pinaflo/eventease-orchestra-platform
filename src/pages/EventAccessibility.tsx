import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Car, Building, Accessibility, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const accessibilitySchema = z.object({
  location: z.string().min(1, "Event location is required"),
  parkingAvailable: z.boolean(),
  liftAccess: z.boolean(),
  wheelchairAccess: z.boolean(),
});

type AccessibilityFormData = z.infer<typeof accessibilitySchema>;

const EventAccessibility = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AccessibilityFormData>({
    resolver: zodResolver(accessibilitySchema),
    defaultValues: {
      location: "",
      parkingAvailable: false,
      liftAccess: false,
      wheelchairAccess: false,
    },
  });

  const onSubmit = async (data: AccessibilityFormData) => {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log("Accessibility data:", data);
      // Navigate to next step
      navigate("/dashboard/event-pricing");
    } catch (error) {
      console.error("Error submitting accessibility data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/create-event")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Event Details
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location & Accessibility
            </CardTitle>
            <CardDescription>
              Provide location details and accessibility information for your event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event venue or address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Accessibility Features</h3>
                  
                  <FormField
                    control={form.control}
                    name="parkingAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Car className="w-4 h-4" />
                            Parking Available
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="liftAccess"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Lift Access
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wheelchairAccess"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Accessibility className="w-4 h-4" />
                            Wheelchair Access
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/dashboard/create-event")}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventAccessibility;