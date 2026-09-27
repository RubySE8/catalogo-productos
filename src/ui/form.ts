import type { Product } from "../types/product";

export function renderForm(products: Product[]): HTMLElement {
  const form = document.createElement("form");
  form.className = "request-form";
  form.id = "request-form";

  form.innerHTML = `
    <h2 class="request-form__title">Solicitar producto</h2>

    <div class="form-field">
      <label for="name" class="form-field__label">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        class="form-field__input"
        placeholder="Tu nombre completo"
      />
      <span class="form-field__error" data-error-for="name"></span>
    </div>

    <div class="form-field">
      <label for="email" class="form-field__label">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        class="form-field__input"
        placeholder="tu@email.com"
      />
      <span class="form-field__error" data-error-for="email"></span>
    </div>

    <div class="form-field">
      <label for="product" class="form-field__label">Producto</label>
      <select id="product" name="product" class="form-field__input">
        <option value="">Selecciona un producto</option>
        ${products
          .map(
            (product) =>
              `<option value="${product.id}">${product.title} (stock: ${product.stock})</option>`
          )
          .join("")}
      </select>
      <span class="form-field__error" data-error-for="product"></span>
    </div>

    <div class="form-field">
      <label for="quantity" class="form-field__label">Cantidad</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        class="form-field__input"
        min="1"
        placeholder="1"
      />
      <span class="form-field__error" data-error-for="quantity"></span>
    </div>

    <button type="submit" class="request-form__submit">
      Enviar solicitud
    </button>
  `;

  return form;
}