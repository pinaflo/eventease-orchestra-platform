import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const faqSchema = z.object({
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
});

type FAQFormData = z.infer<typeof faqSchema>;

const EventFAQ = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faqs: [{ question: "", answer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const onSubmit = (data: FAQFormData) => {
    console.log("FAQ data:", data);
    toast({
      title: "FAQ saved successfully!",
      description: "Your event FAQ has been saved.",
    });
    // Navigate to next step or dashboard
    navigate("/dashboard");
  };

  const addFAQ = () => {
    append({ question: "", answer: "" });
  };

  const removeFAQ = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Event FAQ</h1>
        <p className="text-muted-foreground">
          Add frequently asked questions about your event to help attendees get the information they need.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Frequently Asked Questions
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFAQ}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add FAQ
                </Button>
              </CardTitle>
              <CardDescription>
                Create a list of questions and answers that attendees commonly ask about your event.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFAQ(index)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <div className="space-y-4 pr-8">
                    <FormField
                      control={form.control}
                      name={`faqs.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question {index + 1}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., What time does the event start?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`faqs.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a clear and helpful answer..."
                              className="min-h-[100px]"
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

              {fields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No FAQs added yet.</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFAQ}
                    className="mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First FAQ
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/event-agenda")}
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

export default EventFAQ;