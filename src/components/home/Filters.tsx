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
    SelectItem,
    // SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GetCategories, GetSuppliers } from "@/services/products";
import { useHomeProducts } from "@/app/hooks/HomeProducts";

const formSchema = z.object({
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    category: z.string().optional(),
    supplierId: z.string().optional(),
});

export default function Filters() {
    const {applyFilter} = useHomeProducts()

    const [categories, setCategories] = useState<
        { id: string; name: string }[]
    >([]);
    const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>(
        []
    );

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

            applyFilter({
                minPrice: data.minPrice,
                maxPrice: data.maxPrice,
                category: data.category,
                supplierId: data.supplierId,
            });
        }
    );

    useEffect(() => {
        GetCategories().then((res) => setCategories(res ?? []));
        GetSuppliers().then((res) => setSuppliers(res ?? []));
    }, []);

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
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        )
                                                    )}
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
                                                    {suppliers.map(
                                                        (supplier) => (
                                                            <SelectItem
                                                                key={
                                                                    supplier.id
                                                                }
                                                                value={
                                                                    supplier.id
                                                                }
                                                            >
                                                                {supplier.name}
                                                            </SelectItem>
                                                        )
                                                    )}
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
