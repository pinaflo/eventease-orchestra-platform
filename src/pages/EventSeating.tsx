import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Users, Layout, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const seatingSchema = z.object({
  layout: z.enum(["theater", "classroom", "rounds", "banquet", "cocktail", "custom"], {
    required_error: "Please select a seating layout",
  }),
  totalCapacity: z.string().min(1, "Total capacity is required"),
  tables: z.string().optional(),
  seatsPerTable: z.string().optional(),
  hasReservedSeating: z.boolean().default(false),
  accessibilitySeating: z.boolean().default(false),
  accessibilityCount: z.string().optional(),
  vipSeating: z.boolean().default(false),
  vipCount: z.string().optional(),
  specialRequirements: z.string().optional(),
  layoutNotes: z.string().optional(),
});

type SeatingFormData = z.infer<typeof seatingSchema>;

const seatingLayouts = [
  {
    value: "theater",
    label: "Theater Style",
    description: "Rows of chairs facing forward",
  },
  {
    value: "classroom",
    label: "Classroom Style", 
    description: "Tables with chairs facing forward",
  },
  {
    value: "rounds",
    label: "Round Tables",
    description: "Circular tables for social interaction",
  },
  {
    value: "banquet",
    label: "Banquet Style",
    description: "Long rectangular tables",
  },
  {
    value: "cocktail",
    label: "Cocktail Style",
    description: "Standing with high tables",
  },
  {
    value: "custom",
    label: "Custom Layout",
    description: "Custom arrangement",
  },
];

const EventSeating = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SeatingFormData>({
    resolver: zodResolver(seatingSchema),
    defaultValues: {
      layout: undefined,
      totalCapacity: "",
      tables: "",
      seatsPerTable: "",
      hasReservedSeating: false,
      accessibilitySeating: false,
      accessibilityCount: "",
      vipSeating: false,
      vipCount: "",
      specialRequirements: "",
      layoutNotes: "",
    },
  });

  const watchLayout = form.watch("layout");
  const watchAccessibility = form.watch("accessibilitySeating");
  const watchVip = form.watch("vipSeating");

  const onSubmit = (data: SeatingFormData) => {
    console.log("Seating data:", data);
    toast({
      title: "Seating arrangements saved!",
      description: "Your event seating has been configured.",
    });
    // Navigate to next step or complete setup
    navigate("/dashboard");
  };

  const needsTables = watchLayout === "rounds" || watchLayout === "banquet" || watchLayout === "classroom" || watchLayout === "cocktail";

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seating Arrangements</h1>
        <p className="text-muted-foreground">
          Set up seating arrangements for your event to ensure a great experience for all attendees.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Seating Layout */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Seating Layout
              </CardTitle>
              <CardDescription>
                Choose the seating arrangement that best fits your event style.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="layout"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {seatingLayouts.map((layout) => (
                          <div key={layout.value} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent">
                            <RadioGroupItem value={layout.value} id={layout.value} />
                            <Label htmlFor={layout.value} className="flex-1 cursor-pointer">
                              <div className="font-medium">{layout.label}</div>
                              <div className="text-sm text-muted-foreground">{layout.description}</div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Capacity & Tables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Capacity & Tables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Capacity *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 150"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {needsTables && (
                  <>
                    <FormField
                      control={form.control}
                      name="tables"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Tables</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 15"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seatsPerTable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seats per Table</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 8"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Special Seating */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Special Seating
              </CardTitle>
              <CardDescription>
                Configure reserved seating, accessibility, and VIP sections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasReservedSeating"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Reserved Seating</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Enable assigned seating for attendees
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accessibilitySeating"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accessibility Seating</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Reserve seats for attendees with accessibility needs
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {watchAccessibility && (
                  <FormField
                    control={form.control}
                    name="accessibilityCount"
                    render={({ field }) => (
                      <FormItem className="ml-6">
                        <FormLabel>Number of Accessibility Seats</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="vipSeating"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>VIP Seating</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Premium seating section for VIP attendees
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {watchVip && (
                  <FormField
                    control={form.control}
                    name="vipCount"
                    render={({ field }) => (
                      <FormItem className="ml-6">
                        <FormLabel>Number of VIP Seats</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special seating requirements or notes..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="layoutNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layout Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes about the seating layout..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/event-faq")}
            >
              Back
            </Button>
            <Button type="submit">
              Complete Event Setup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventSeating;