import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function Product({
    product,
}: {
    product: {
        name: string;
        id: number;
        description: string;
        price: number;
        stock_quantity: number;
        category_id: number;
        supplier_id: number;
    };
}) {
    return (
        <section className="p-0 flex flex-col gap-4">
            <header></header>
            <main className="p-0 flex-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </main>
            <footer className="p-0 flex justify-end">
                <Button>Add to Cart</Button>
            </footer>
        </section>
    );
}
