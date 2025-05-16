"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { CreateCategory } from "@/services/products";
import { toast } from "sonner";

/*
model categories {
  id       String     @id @default(uuid())
  name     String
  products products[]
}
*/

// Create a schema for category validation
const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

// Define the form value type
type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function AddCategory() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
        console.log("TODO: Add category to database", data);
        await CreateCategory(data);
        toast.success("Category added successfully");

    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter category name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Category..." : "Add Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}