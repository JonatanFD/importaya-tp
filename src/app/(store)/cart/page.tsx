"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";


export default function Cart() {


    const onAddOrder = () => {

    }

    useEffect(() => {
      
    }, []);

    return (
        <section className="max-w-7xl w-full mx-auto py-12 px-4 border-b space-y-4">

            <header>
                <h2 className="text-5xl font-bold">Cart</h2>
                <Button onClick={onAddOrder}>Add Order</Button>
            </header>
        </section>
    );
}
