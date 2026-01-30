import fs from 'fs';
import path from 'path';

const PRODUCT_ORDER_FILE = path.join(
  process.cwd(),
  'app/admin/config/product-order.json'
);

/** Default order of product slugs (matches initial products list) */
export const DEFAULT_PRODUCT_ORDER = [
  'attic-breeze',
  'decra',
  'kennedy-skylights',
  'knight-shield',
  'lifetime-tool',
  'prp-lumber',
  'mcelroy',
  'mfm',
  'premier-metal-roof',
  'queen-tile',
  'raptor-underlayment',
  'roser',
  'sol-r-skin',
  'tilcor',
  'unified-steel',
];

function readProductOrderConfig(): { order: string[]; hidden: string[] } {
  try {
    if (fs.existsSync(PRODUCT_ORDER_FILE)) {
      const raw = fs.readFileSync(PRODUCT_ORDER_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.every((s) => typeof s === 'string')) {
        return { order: data, hidden: [] };
      }
      if (data && typeof data === 'object' && Array.isArray(data.order)) {
        const hidden = Array.isArray(data.hidden) ? data.hidden.filter((s) => typeof s === 'string') : [];
        return { order: data.order, hidden };
      }
    }
  } catch (error) {
    console.error('Error reading product order:', error);
  }
  return { order: [...DEFAULT_PRODUCT_ORDER], hidden: [] };
}

/**
 * Read the saved product order from config.
 * Returns array of slugs in display order. Uses default if file missing/invalid.
 */
export function getProductOrder(): string[] {
  return readProductOrderConfig().order;
}

/**
 * Read slugs of products that are hidden from the /products page.
 */
export function getHiddenProductSlugs(): string[] {
  return readProductOrderConfig().hidden;
}

/**
 * Sort products array by the saved display order.
 * Items not in the order list are appended at the end.
 */
export function sortProductsByOrder<T extends { slug: string }>(
  products: T[],
  order: string[]
): T[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const result: T[] = [];
  const seen = new Set<string>();
  for (const slug of order) {
    const p = bySlug.get(slug);
    if (p) {
      result.push(p);
      seen.add(slug);
    }
  }
  for (const p of products) {
    if (!seen.has(p.slug)) result.push(p);
  }
  return result;
}
