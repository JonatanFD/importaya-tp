import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <AppHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <AppFooter />
        </>
    );
}
