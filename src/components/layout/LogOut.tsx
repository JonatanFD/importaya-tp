"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";

export default function LogOut() {
    const supabase = createClient();
    return (
            <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    );
}
