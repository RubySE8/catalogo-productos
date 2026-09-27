import type { Product } from "../types/product";
import { createProductCard } from "./card";

export function renderCatalog(products: Product[]): HTMLElement {
    const container = document.createElement("div");
    container.className = "catalog";

    if (products.length === 0) {
        const message = document.createElement("p");
        message.className = "catalog_empty";
        message.textContent = "No se encontraron productos"; 
        container.appendChild(message);
        return container;
    }

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    return container;
}