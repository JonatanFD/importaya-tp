import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Product({
    product,
}: {
    product: {
        name: string;
        id: string;
        description: string;
        price: number; // Now properly transformed in Products component
        stock_quantity?: number;
        category_id: string;
        supplier_id: string;
        url?: string;
    };
}) {
    return (
        <section className="flex flex-col gap-4 h-full p-4">
            {product.url && (
                <div className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                    {/* Using next/image component for optimization */}
                    <Image 
                        src={product.url} 
                        alt={product.name} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}
            <main className="flex-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="mt-2">{product.description}</CardDescription>
                <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            </main>
            <footer className="flex justify-end mt-auto">
                <Button>Add to Cart</Button>
            </footer>
        </section>
    );
}
