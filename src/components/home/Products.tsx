"use client";
import { GetProducts } from "@/services/products";
import Product from "./Product";
import { Card } from "../ui/card";
import { useEffect } from "react";
import { useHomeProducts } from "@/app/hooks/HomeProducts";

export default function Products() {
    const { products, setProducts } = useHomeProducts();

    const fetchProducts = async () => {
        const productsData = await GetProducts();

        setProducts(productsData ?? []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <style>
                {`
          .grid-products {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        `}
            </style>
            <ul className="grid-products p-4">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id} className="list-none">
                            <Card className="h-full overflow-hidden">
                                <Product product={product} />
                            </Card>
                        </li>
                    ))
                ) : (
                    <li className="col-span-full text-center py-8 text-gray-500">
                        No products found
                    </li>
                )}
            </ul>
        </>
    );
}
