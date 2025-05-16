import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogOut from "./LogOut";
import ImportaYaLogo from "../icons/ImportaYaLogo";
import { GetUserByEmail } from "@/services/auth";

export default async function AppHeader() {
    const supabase = await createClient();
    const session = await supabase.auth.getSession();

    const username = session?.data.session?.user.user_metadata.name;
    
    const dbUser = await GetUserByEmail(
        session?.data.session?.user.email as string
    );
    const role = dbUser?.role;

    return (
        <header className="px-4 h-16 border-b">
            <section className="max-w-7xl mx-auto w-full flex items-center justify-between h-full">
                <div className="flex flex-1 basis-0 items-center gap-2">
                    <ImportaYaLogo className="size-10" />
                    <h1 className="text-2xl font-bold font-roboto">
                        ImportaYa
                    </h1>
                </div>

                <div className="flex flex-1 basis-0 justify-end font-mono">
                    <nav className="font-mono">
                        <ul className="flex items-center gap-4">
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
