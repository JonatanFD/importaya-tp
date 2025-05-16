"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LogOut() {
    const supabase = createClient();
    const router = useRouter();
    const onClick = () => {
        supabase.auth.signOut().then(() => router.refresh());
    };
    return <Button onClick={onClick}>Logout</Button>;
}
