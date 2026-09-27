import type { Product } from "../types/product";

export function filterBySearch(products: Product[], search: string): Product[] {
  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch === "") {
    return products;
  }

  return products.filter((product) =>
    product.title.toLowerCase().includes(normalizedSearch)
  );
}

export function filterByCategory(products: Product[], category: string): Product[] {
  if (category === "all") {
    return products;
  }

  return products.filter((product) => product.category === category);
}