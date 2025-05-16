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

/*
model suppliers {
  id                      String     @id @default(uuid())
  name                    String
  contact_info            String
  supplier_code           String
  business_license_number String
  tax_id                  String
  payment_terms           String
  rating                  Decimal    @db.Decimal(3, 2)
  notes                   String?
  products                products[]
}
*/

// Create a schema for supplier validation
const supplierFormSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  contact_info: z.string().min(1, "Contact information is required"),
  supplier_code: z.string().min(1, "Supplier code is required"),
  business_license_number: z.string().min(1, "Business license number is required"),
  tax_id: z.string().min(1, "Tax ID is required"),
  payment_terms: z.string().min(1, "Payment terms are required"),
  rating: z.coerce.number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .step(0.01, "Rating can have up to 2 decimal places"),
  notes: z.string().optional(),
});

// Define the form value type
type SupplierFormValues = z.infer<typeof supplierFormSchema>;

export default function AddSupplier() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      contact_info: "",
      supplier_code: "",
      business_license_number: "",
      tax_id: "",
      payment_terms: "Net 30",
      rating: 3.00,
      notes: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: SupplierFormValues) => {
    setIsSubmitting(true);
    try {
      // This would be replaced with your actual API call
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add supplier');
      }

      // Reset form on success
      form.reset();
      alert('Supplier added successfully!');
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Failed to add supplier. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter supplier name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Email, phone, or address" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="supplier_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Code</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="SUP-XXXX" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (0-5)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          min="0"
                          max="5"
                          placeholder="3.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="business_license_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business License Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="License number" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tax_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tax ID number" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="payment_terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Terms</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Net 30, Net 60, etc." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Additional notes about the supplier" 
                        className="min-h-[100px]"
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
                {isSubmitting ? "Adding Supplier..." : "Add Supplier"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}