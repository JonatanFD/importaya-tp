"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
// supabase pass: XQiaD5sSGFLQZBj5

export async function AutoSignUp(role: string) {
    try {
        if (role === "admin") {
            return false;
        }

        const supabase = await createClient();
        const user = await supabase.auth.getSession();

        const { data :{ session}, error } = user

        if (error) {
            throw new Error("User session not found");
        }
        if (!session) {
            throw new Error("User session not found");
        }

        const userDto = {
            email: session.user.email,
            username: session.user.user_metadata.full_name,
            role,
            password: session.user.user_metadata.password_hash,
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
            }
        })

        console.log("User created successfully");
        return true;
    } catch (error) {
        console.error("Error signing up:", error);
        return false;
    }
}
