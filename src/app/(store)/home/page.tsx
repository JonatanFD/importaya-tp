import Filters from "@/components/home/Filters";
import Products from "@/components/home/Products";

export default function Home() {
    return (
        <main className="flex-1">
            <section className="max-w-7xl mx-auto py-12 px-4 border-b space-y-4">
                <h2 className="text-5xl font-bold">Search what you need</h2>
                <p className="text-2xl font-medium text-balance max-w-2xl">
                    Simplify the way you sell imported products
                    <br /> your inventory effortlessly.
                </p>
            </section>

            <section className="max-w-7xl mx-auto flex">
                <section className="min-w-64 flex flex-col font-mono">
                    <Filters />
                </section>

                <section className="flex-1">
                    <div className="h-16 flex items-center border-b"></div>
                    <Products />
                </section>
            </section>
        </main>
    );
}
