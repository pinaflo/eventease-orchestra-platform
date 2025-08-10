import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Clock, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const agendaItemSchema = z.object({
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  speaker: z.string().optional(),
});

const agendaSchema = z.object({
  items: z.array(agendaItemSchema).min(1, "At least one agenda item is required"),
});

type AgendaFormData = z.infer<typeof agendaSchema>;

const EventAgenda = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AgendaFormData>({
    resolver: zodResolver(agendaSchema),
    defaultValues: {
      items: [
        {
          time: "",
          title: "",
          description: "",
          speaker: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: AgendaFormData) => {
    console.log("Agenda data:", data);
    
    toast({
      title: "Event created successfully!",
      description: "Your event has been created and is ready to publish.",
    });

    // Navigate back to dashboard
    navigate("/dashboard");
  };

  const handlePrevious = () => {
    navigate("/dashboard/event-host");
  };

  const addAgendaItem = () => {
    append({
      time: "",
      title: "",
      description: "",
      speaker: "",
    });
  };

  const removeAgendaItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Event Agenda</h1>
          <p className="text-muted-foreground mt-2">
            Add a detailed schedule for your event. Include times, descriptions, and speakers for each activity to help attendees know what to expect.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Event Schedule
            </CardTitle>
            <CardDescription>
              Add an itinerary, schedule, or lineup for your event. You can include a time, a description of what will happen, and who will host or speak.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative border border-border rounded-lg p-4 bg-card/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-foreground">Schedule Item {index + 1}</h3>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAgendaItem(index)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.time`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Time *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 9:00 AM or 9:00 - 10:00 AM" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`items.${index}.speaker`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Speaker/Host
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., John Doe, Event Team" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Activity Title *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Welcome & Registration, Keynote Speech" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Provide additional details about this activity..."
                                  className="min-h-[80px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addAgendaItem}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Schedule Item
                </Button>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button type="submit">
                    Complete Event
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

export default EventAgenda;