export function formatPrice(precio: number): string {

    return `$${precio.toFixed(2)}`;
}

export function formatCategory(categoria: string): string {

    return categoria.charAt(0).toUpperCase() + categoria.slice(1);
}

export function formatStock(stock: number): string {

    if (stock === 0) return "Sin stock";
    if (stock < 10) return `Ultimas ${stock} unidades`;
    return `${stock} disponibles`;
}