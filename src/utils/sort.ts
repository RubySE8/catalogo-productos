import type { Product } from "../types/product";

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export function sortProducts(
  products: Product[],
  sort: SortOption
): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return sorted;
}

export function moveOutOfStockToEnd(products: Product[]): Product[] {
  const available = products.filter((product) => product.stock > 0);
  const outOfStock = products.filter((product) => product.stock === 0);
  return [...available, ...outOfStock];
}