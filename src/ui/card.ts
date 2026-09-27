import type { Product } from "../types/product";

import { formatPrice, formatCategory, formatStock } from "../utils/format";

export function createProductCard(product: Product): HTMLElement {

    const card = document.createElement("article");
    card.className = "product-card";

    if (product.stock === 0) {

        card.classList.add("unavailable");
    }

    card.innerHTML = `
    <img src="${product.thumbnail}" alt="${product.title}" class="product-card__image" />
    <div class="product-card__info">
      <h2 class="product-card__title">${product.title}</h2>
      <p class="product-card__category">${formatCategory(product.category)}</p>
      <p class="product-card__price">${formatPrice(product.price)}</p>
      <p class="product-card__stock">${formatStock(product.stock)}</p>
    </div>
  `;

    return card;

}

