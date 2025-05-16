"use server";
import { PrismaClient } from "@prisma/client";


export async function GetCategories() {
    try
    {
        const prisma = new PrismaClient();
        const categories = await prisma.categories.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories:", error);
        return null;
    }
}


export async function GetSuppliers() {
    try
    {
        const prisma = new PrismaClient();
        const suppliers = await prisma.suppliers.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return suppliers;
    } catch (error) {
        console.error("Error getting suppliers:", error);
        return null;
    }
}

// create supplier
export async function CreateSupplier(data: {
    name: string;
    contact_info: string;
    supplier_code: string;
    business_license_number: string;
    tax_id: string;
    payment_terms: string;
    rating: number;
    notes: string;
}) {
    try {
        const prisma = new PrismaClient();

        console.log("Creating supplier in database:", data);
        await prisma.suppliers.create({
            data: {
                name: data.name,
                contact_info: data.contact_info,
                supplier_code: data.supplier_code,
                business_license_number: data.business_license_number,
                tax_id: data.tax_id,
                payment_terms: data.payment_terms,
                rating: data.rating,
                notes: data.notes,
            }
        })

        console.log("Supplier created successfully");
        return true;
    } catch (error) {
        console.error("Error creating supplier:", error);
        return false;
    }
}

// create category
export async function CreateCategory(data: {
    name: string;
}) {
    try {
        const prisma = new PrismaClient();

        console.log("Creating category in database:", data);
        await prisma.categories.create({
            data: {
                name: data.name,
            }
        })

        console.log("Category created successfully");
        return true;
    } catch (error) {
        console.error("Error creating category:", error);
        return false;
    }
}       


export async function GetProducts() {
    try {
        const prisma = new PrismaClient();
        const products = await prisma.products.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                url: true,
                category_id: true,
                supplier_id: true,
            },
        });
        return products;
    } catch (error) {
        console.error("Error getting products:", error);
        return null;
    }
}