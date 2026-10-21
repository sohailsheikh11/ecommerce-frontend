// Change this if your backend prices are in another currency.
export const CURRENCY = 'USD'

export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY }).format(
    Number(n) || 0
  )

// Tolerate different image field names from the backend.
export const productImage = (p) =>
  p.image_url ||
  p.image ||
  p.thumbnail ||
  p.images?.[0] ||
  `https://placehold.co/600x750/E8E2D5/1A1A1A?text=${encodeURIComponent(p.name || 'Product')}`
