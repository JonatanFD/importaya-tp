import { create } from "zustand";

interface Filter {
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    category?: string | undefined;
    supplierId?: string | undefined;
}

interface HomeProducts {
    products: {
        price: number;
        name: string;
        id: string;
        description: string;
        category_id: string;
        supplier_id: string;
        url: string;
    }[];
    setProducts: (
        products: {
            price: number;
            name: string;
            id: string;
            description: string;
            category_id: string;
            supplier_id: string;
            url: string;
        }[]
    ) => void;
    applyFilter: (filter: Filter) => void;
}

export const useHomeProducts = create<HomeProducts>((set, get) => ({
    products: [],
    setProducts: (products) => set({ products }),
    applyFilter: (filter) => {
        console.log("Filter:", filter);
        const { products } = get();
        
        // Create a new array with all products first
        const allProducts = [...products];
        
        // Apply all filters in one pass for better performance
        const filteredProducts = allProducts.filter(product => {
            // Apply price filter if either min or max is provided
            const hasPriceFilter = filter.minPrice !== undefined || filter.maxPrice !== undefined;
            const minPrice = filter.minPrice ?? 0;
            const maxPrice = filter.maxPrice ?? Number.MAX_VALUE;
            
            const passesPrice = !hasPriceFilter || (product.price >= minPrice && product.price <= maxPrice);
            
            // Apply category filter if provided
            const hasCategoryFilter = filter.category !== undefined && filter.category !== '';
            const passesCategory = !hasCategoryFilter || product.category_id === filter.category;
            
            // Apply supplier filter if provided
            const hasSupplierFilter = filter.supplierId !== undefined && filter.supplierId !== '';
            const passesSupplier = !hasSupplierFilter || product.supplier_id === filter.supplierId;
            
            // Product must pass all applied filters
            return passesPrice && passesCategory && passesSupplier;
        });
        
        // Update state with filtered products
        set({ products: filteredProducts });
    },
}));
