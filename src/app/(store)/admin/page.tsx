import { createClient } from "@/lib/supabase/server";
import { GetUserByEmail } from "@/services/auth";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddSupplier from "./AddSupplier";

export default async function AdminPage() {
    const supabase = await createClient();
    const session = await supabase.auth.getSession();

    if (session.error) {
        return <div>Unauthorized</div>;
    }
    if (!session.data.session) {
        return <div>Unauthorized</div>;
    }

    const user = await GetUserByEmail(session.data.session.user.email!);

    if (!user) {
        return <div>Unauthorized</div>;
    }
    if (user.role !== "admin") {
        return <div>Unauthorized</div>;
    }

    return (
        <main className="max-w-7xl px-4 w-full mx-auto">
            <AddProduct></AddProduct>
            <AddCategory></AddCategory>
            <AddSupplier></AddSupplier>
        </main>
    );
}
