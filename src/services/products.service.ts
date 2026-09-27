import type { Product } from "../types/product";
import type { ProductsResponse } from "../types/products-response";

const API_URL = "https://dummyjson.com/products";

export async function fetchProducts(): Promise<Product[]> {

    const response = await fetch(API_URL);

    if (!response.ok) {

        throw new Error('Error HTTP: ${response.status}');
    }

    const data: ProductsResponse = await response.json();
    return data.products;
}

