// ui/catalogHandler.ts

import { toggleFavorite } from "../utils/favorites";

export function setupCatalogHandler(onFavoriteToggle: () => void): void {
  const catalogContainer = document.querySelector<HTMLDivElement>("#catalog")!;

  catalogContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (!target.classList.contains("product-card__favorite")) return;

    const productId = Number(target.dataset.favoriteId);
    if (!productId) return;

    toggleFavorite(productId);

    onFavoriteToggle();
  });
}