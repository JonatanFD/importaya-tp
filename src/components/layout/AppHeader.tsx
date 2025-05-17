import { createClient } from "@/lib/supabase/server";
import { GetUserByEmail } from "@/services/auth";
import ImportaYaLogo from "../icons/ImportaYaLogo";
import Link from "next/link";
import LogOut from "./LogOut";

export default async function AppHeader() {
    const supabase = await createClient();
    const session = await supabase.auth.getSession();

    const username = session?.data.session?.user.user_metadata.name;
    const email = session?.data.session?.user.email;
    console.log("SESSION", email);

    let role: string = "";

    if (email) {
        const dbUser = await GetUserByEmail(email!);

        if (dbUser) {
            role = dbUser?.role;
            console.log("EMAIL", dbUser?.email);
            console.log("ROLE", role);
        }
    }

    return (
        <header className="px-4 md:h-16 border-b py-4 md:py-0">
            <section className="max-w-7xl mx-auto w-full flex md:items-center justify-between h-full flex-col md:flex-row gap-4 md:gap-0">
                <div className="flex flex-1 basis-0 items-center gap-2">
                    <ImportaYaLogo className="size-10" />
                    <h1 className="text-2xl font-bold font-roboto">
                        ImportaYa
                    </h1>
                </div>

                <div className="flex flex-1 basis-0 md:justify-end font-mono">
                    <nav className="font-mono">
                        <ul className="flex md:items-center gap-4 flex-col md:flex-row">
                            <li>
                                <Link href="/home">Home</Link>
                            </li>
                            {role === "admin" && (
                                <li>
                                    <Link href="/admin">Admin</Link>
                                </li>
                            )}
                            {session?.data.session ? (
                                <>
                                    <li>
                                        <Link href="/cart">Cart</Link>
                                    </li>
                                    <li>
                                        <LogOut />
                                    </li>

                                    <li>Welcome {username}</li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link href="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
}
