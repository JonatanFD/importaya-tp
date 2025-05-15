"use client";
import { ListFilter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    // SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const formSchema = z.object({
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    category: z.string().min(1).optional(),
    supplierId: z.string().min(1).optional(),
});

export default function Filters() {
    const formState = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            minPrice: 0,
            maxPrice: 1000,
            category: "",
            supplierId: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = formState.handleSubmit(
        (data: z.infer<typeof formSchema>) => {
            console.log(data);
        }
    );

    return (
        <>
            <div className="h-16 flex items-center justify-between border-b px-4">
                <h2>Filters</h2>
                <ListFilter />
            </div>

            <Form {...formState}>
                <form onSubmit={onSubmit} className="border-r flex-1">
                    <Accordion type="multiple" className="overflow-visible">
                        <AccordionItem value="price">
                            <AccordionTrigger className="px-4">
                                Price
                            </AccordionTrigger>
                            <AccordionContent className="overflow-visible px-4">
                                <FormField
                                    control={formState.control}
                                    name="minPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Min Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="min price"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formState.control}
                                    name="maxPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="max price"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="category">
                            <AccordionTrigger className="px-4">
                                Category
                            </AccordionTrigger>
                            <AccordionContent className="overflow-visible px-4">
                                <FormField
                                    control={formState.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a Category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {/* TODO: Add options */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="supplier">
                            <AccordionTrigger className="px-4">
                                Supplier
                            </AccordionTrigger>
                            <AccordionContent className="overflow-visible px-4">
                                <FormField
                                    control={formState.control}
                                    name="supplierId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a supplier" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {/* TODO: Add options */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="p-4 text-end border-t">
                        <Button>Apply</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
