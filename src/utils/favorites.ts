const STORAGE_KEY = "favorite-product-ids";

export function getFavorites(): number[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function isFavorite(productId: number): boolean {
  return getFavorites().includes(productId);
}

export function toggleFavorite(productId: number): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(productId);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites.includes(productId);
}