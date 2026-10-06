import type { Product } from "../types/product";

import {
  validateName,
  validateEmail,
  validateProduct,
  validateQuantity,
} from "../utils/validation";

export function setupFormHandler(products: Product[]): void  {
  const form = document.querySelector<HTMLFormElement>("#request-form")!;

  const nameInput = document.querySelector<HTMLInputElement>("#name")!;
  const emailInput = document.querySelector<HTMLInputElement>("#email")!;
  const productSelect = document.querySelector<HTMLSelectElement>("#product")!;
  const quantityInput = document.querySelector<HTMLInputElement>("#quantity")!;

  nameInput.addEventListener("input", () => {
    const error = validateName(nameInput.value);
    showError("name", error);
  });

  emailInput.addEventListener("input", () => {
    const error = validateEmail(emailInput.value);
    showError("email", error);
  });

  productSelect.addEventListener("change", () => {
    const error = validateProduct(productSelect.value);
    showError("product", error);

    validateQuantityField(products);
  });

  quantityInput.addEventListener("input", () => {validateQuantityField(products);});

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const productError = validateProduct(productSelect.value);
    const quantityError = validateQuantityField(products); 

    
    showError("name", nameError);
    showError("email", emailError);
    showError("product", productError);

    const hasErrors =
      nameError !== "" ||
      emailError !== "" ||
      productError !== "" ||
      quantityError !== "";

    if (hasErrors) {
      return;
    }
        showSuccess(form, nameInput.value);
  });
}

function validateQuantityField(products: Product[]): string {
  const productSelect = document.querySelector<HTMLSelectElement>("#product")!;
  const quantityInput = document.querySelector<HTMLInputElement>("#quantity")!;

  const productId = Number(productSelect.value);
  const quantity = quantityInput.value;


  if (isNaN(productId) || productId === 0) {
    showError("quantity", "");
    return "";
  }


  const product = products.find((p) => p.id === productId);
  const stock = product ? product.stock : 0;

  const error = validateQuantity(quantity, stock);
  showError("quantity", error);
  return error;
}

function showError(fieldName: string, message: string): void {
  const errorSpan = document.querySelector<HTMLSpanElement>(
    `[data-error-for="${fieldName}"]`
  );
  if (!errorSpan) return;

  errorSpan.textContent = message;
}

function showSuccess(form: HTMLFormElement, customerName: string): void {
  const productSelect = document.querySelector<HTMLSelectElement>("#product")!;
  const productTitle =
    productSelect.selectedOptions[0]?.textContent?.split(" (")[0] ?? "";

  alert(
    `¡Solicitud enviada!\n\nGracias ${customerName}, tu pedido de "${productTitle}" fue registrado.`
  );

  form.reset();

  document
    .querySelectorAll<HTMLSpanElement>(".form-field__error")
    .forEach((span) => (span.textContent = ""));
}