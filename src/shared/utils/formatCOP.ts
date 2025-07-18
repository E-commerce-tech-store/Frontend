export function formatCOP(value: number) {
  return value
    .toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
    .replace(/(,\d{0,2})?$/, ''); // Remove decimals if any
}
