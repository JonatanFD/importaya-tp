"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 space-y-4">
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p className="text-gray-600">Choose an option to continue:</p>
            <div className="flex space-x-4">
                <Button
                    className="px-4 py-2"
                    onClick={() => router.push("/login")}
                >
                    Log In
                </Button>
                <Button
                    className="px-4 py-2"
                    onClick={() => router.push("/register")}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}
