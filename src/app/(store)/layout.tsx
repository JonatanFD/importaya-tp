import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <AppHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <AppFooter />
            <Toaster />
        </>
    );
}
