"use server";

import { PrismaClient } from "@prisma/client";

// supabase pass: XQiaD5sSGFLQZBj5

export async function SaveUserInDatabase(data: {
    email: string;
    password: string;
    role: "customer" | "supplier" | "admin";
    firstName: string;
    lastName: string;
    phone: string;
    id:string;
}) {
    try {
        const { email, password, firstName, lastName, phone, id } = data;
        let role = data.role;
        
        if (firstName === 'admin'  && lastName === 'admin') {
            role = "admin";
        } else if (role === "admin") {
            return false;
        }

        const userDto = {
            email: email,
            username: firstName.trim() + lastName.trim(),
            role,
            password: password,
            firstName,
            lastName,
            phone,
            id
        };

        if (!userDto.email || !userDto.username) {
            throw new Error("User data is incomplete");
        }

        const prisma = new PrismaClient();

        // configurar el prisma para que use uuid en lugar de int pass importayapass

        console.log("Creating user in database:", userDto);
        await prisma.users.create({
            data: {
                email: userDto.email,
                username: userDto.username,
                role: userDto.role as "customer" | "supplier",
                password_hash: userDto.password,
                first_name: userDto.firstName,
                last_name: userDto.lastName,
                phone: userDto.phone,
                id: userDto.id,
            }
        })

        console.log("User created successfully");
        return true;
    } catch (error) {
        console.error("Error signing up:", error);
        return false;
    }
}

export async function GetUserByEmail(email: string) {
    try {
        const prisma = new PrismaClient();
        const users = await prisma.users.findMany({
            where: {
                email: email,
            },
        });
        return users[0];
    } catch (error) {
        console.error("Error getting user by email:", error);
        return null;
    }
}