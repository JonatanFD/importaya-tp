"use server";
import { PrismaClient } from "@prisma/client";
// supabase pass: XQiaD5sSGFLQZBj5

export async function AutoSignUp(data: {
    email: string;
    password: string;
    role: "customer" | "supplier" | "admin";
    firstName: string;
    lastName: string;
    phone: string;
}) {
    try {
        const { email, password, role, firstName, lastName, phone } = data;

        if (role === "admin") {
            return false;
        }

        const userDto = {
            email: email,
            username: firstName.trim() + lastName.trim(),
            role,
            password: password,
            firstName,
            lastName,
            phone
        };

        if (!userDto.email || !userDto.username) {
            throw new Error("User data is incomplete");
        }

        const prisma = new PrismaClient();

        // configurar el prisma para que use uuid en lugar de int
        prisma.users.create({
            data: {
                email: userDto.email,
                username: userDto.username,
                role: userDto.role as "customer" | "supplier",
                password_hash: userDto.password,
                first_name: userDto.firstName,
                last_name: userDto.lastName,
                phone: userDto.phone,
            }
        })

        console.log("User created successfully");
        return true;
    } catch (error) {
        console.error("Error signing up:", error);
        return false;
    }
}
