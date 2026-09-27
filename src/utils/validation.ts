export function validateName(name: string): string {
  const trimmed = name.trim();

  if (trimmed === "") {
    return "El nombre es obligatorio";
  }

  if (trimmed.length < 3) {
    return "El nombre debe tener al menos 3 caracteres";
  }

  return "";
}

export function validateEmail(email: string): string {
  const trimmed = email.trim();

  if (trimmed === "") {
    return "El email es obligatorio";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return "El email no tiene un formato válido";
  }

  return "";
}

export function validateProduct(productId: string): string {
  if (productId === "") {
    return "Debes seleccionar un producto";
  }

  return "";
}

export function validateQuantity(
  quantity: string,
  stock: number
): string {
  const trimmed = quantity.trim();

  if (trimmed === "") {
    return "La cantidad es obligatoria";
  }

  const num = Number(trimmed);

  if (!Number.isInteger(num) || num < 1) {
    return "La cantidad debe ser un número mayor o igual a 1";
  }

  if (num > stock) {
    return `No puedes pedir más de ${stock} unidades`;
  }

  return "";
}