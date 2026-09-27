import {
  validateName,
  validateEmail,
  validateProduct,
  validateQuantity,
} from "../utils/validation";

export function setupFormHandler(): void  {
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

    validateQuantityField();
  });

  quantityInput.addEventListener("input", validateQuantityField);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const productError = validateProduct(productSelect.value);
    const quantityError = validateQuantityField();

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

function validateQuantityField(): string {
  const productSelect = document.querySelector<HTMLSelectElement>("#product")!;
  const quantityInput = document.querySelector<HTMLInputElement>("#quantity")!;

  const productId = productSelect.value;
  const quantity = quantityInput.value;

  if (productId === "") {
    showError("quantity", "");
    return "";
  }

  const option = productSelect.selectedOptions[0];
  const stockText = option.textContent || "";

  const match = stockText.match(/\(stock: (\d+)\)/);
  const stock = match ? Number(match[1]) : 0;

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