import "./styles/index.css";
import { fetchProducts } from "./services/products.service";
import { renderCatalog } from "./ui/catalog";
import { renderForm } from "./ui/form";
import { formatCategory } from "./utils/format";
import { filterBySearch, filterByCategory } from "./utils/filter";
import { sortProducts, moveOutOfStockToEnd } from "./utils/sort";
import type { SortOption } from "./utils/sort";
import type { Product } from "./types/product";
import { setupFormHandler } from "./ui/formHandler";
import { debounce } from "./utils/debounce";
import { setupCatalogHandler } from "./ui/catalogHandler";

interface AppState {
  allProducts: Product[];
  search: string;
  category: string;
  sort: SortOption;
}

const state: AppState = {
  allProducts: [],
  search: "",
  category: "all",
  sort: "default",
};


const app = document.querySelector<HTMLDivElement>("#app")!;


async function init(): Promise<void> {
  app.innerHTML = `<p class="loading">Cargando productos...</p>`;

  try {
    state.allProducts = await fetchProducts();

    renderLayout();
    renderFormInContainer();
    attachListeners();
    setupCatalogHandler(() => render());
    render();
  } catch (error) {
    app.innerHTML = `<p class="error">Error al cargar los productos: ${(error as Error).message}</p>`;
    console.error(error);
  }
}

function renderFormInContainer(): void {
  const container = document.querySelector<HTMLDivElement>("#form-container")!;
  const form = renderForm(state.allProducts);

  container.innerHTML = "";
  container.appendChild(form);

  setupFormHandler(state.allProducts);
}

function renderLayout(): void {
  const categories = getUniqueCategories(state.allProducts);

  app.innerHTML = `
    <header class="app-header">
      <h1>Catálogo de Productos</h1>
      <div class="filters">
        <input
          type="search"
          id="search"
          class="search"
          placeholder="Buscar productos..."
        />
        <select id="category" class="category-select">
          <option value="all">Todas las categorías</option>
          ${categories
      .map(
        (cat) => `<option value="${cat}">${formatCategory(cat)}</option>`
      )
      .join("")}
        </select>
        <select id="sort" class="sort-select">
          <option value="default">Ordenar por...</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre: A a Z</option>
          <option value="stock-desc">Stock: mayor a menor</option>
        </select>
      </div>
    </header>
    <div id="catalog"></div>
    <div id="form-container"></div>
  `;
}


function attachListeners(): void {
  const searchInput = document.querySelector<HTMLInputElement>("#search")!;
  const categorySelect = document.querySelector<HTMLSelectElement>("#category")!;
  const sortSelect = document.querySelector<HTMLSelectElement>("#sort")!;

  const handleSearch = debounce((value: string) => {
    state.search = value;
    render();
  }, 300);

  searchInput.addEventListener("input", (event) => {
    handleSearch((event.target as HTMLInputElement).value);
  });

  categorySelect.addEventListener("change", (event) => {
    state.category = (event.target as HTMLSelectElement).value;
    render();
  });

  sortSelect.addEventListener("change", (event) => {
    state.sort = (event.target as HTMLSelectElement).value as SortOption;
    render();
  });
}


function render(): void {
  const catalogContainer = document.querySelector<HTMLDivElement>("#catalog")!;
  const products = applyFilters(state);

  catalogContainer.innerHTML = "";
  catalogContainer.appendChild(renderCatalog(products));
}

function applyFilters(state: AppState): Product[] {
  let result = [...state.allProducts];

  result = filterBySearch(result, state.search);
  result = filterByCategory(result, state.category);
  result = sortProducts(result, state.sort);
  result = moveOutOfStockToEnd(result);

  return result;
}


function getUniqueCategories(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.category))];
}

init();