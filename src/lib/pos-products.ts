/**
 * POS Quick Billing Catalog & Money Math
 * Seed inventory and GST arithmetic for the /pos-billing point-of-sale module.
 * Swap POS_SEED_PRODUCTS for a real inventory feed without touching the billing UI.
 */

export const POS_PRODUCT_CATEGORIES = [
  'Clothing',
  'Footwear',
  'Accessories',
  'Stationery',
  'Health',
  'Bags',
] as const;

export type PosProductCategory = (typeof POS_PRODUCT_CATEGORIES)[number];

/** Pseudo-category used by the grid filter to disable filtering entirely. */
export const POS_ALL_CATEGORY = 'All';

export const POS_CATEGORY_FILTERS: string[] = [POS_ALL_CATEGORY, ...POS_PRODUCT_CATEGORIES];

/** Indian GST slabs offered when a cashier creates a custom product. */
export const POS_GST_SLABS = [0, 5, 12, 18, 28] as const;

export interface PosProduct {
  id: string;
  name: string;
  /** Shelf price in INR. GST-inclusive by default (see calculateBillTotals). */
  price: number;
  /** Whole-number GST rate, e.g. 18 for 18%. */
  gstPercent: number;
  category: PosProductCategory;
}

export interface PosCartLine {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
  gstPercent: number;
}

export interface PosBillTotals {
  /** Net taxable value (total minus GST when prices are tax-inclusive). */
  subtotal: number;
  /** GST component summed per line using each line's own rate. */
  gst: number;
  /** Gross payable amount. */
  total: number;
  /** Sum of quantities across all lines. */
  itemCount: number;
}

export const POS_SEED_PRODUCTS: PosProduct[] = [
  { id: 'cotton-t-shirt', name: 'Cotton T-Shirt', price: 499, gstPercent: 12, category: 'Clothing' },
  { id: 'denim-jeans', name: 'Denim Jeans', price: 1299, gstPercent: 12, category: 'Clothing' },
  { id: 'casual-sneakers', name: 'Casual Sneakers', price: 1899, gstPercent: 18, category: 'Footwear' },
  { id: 'leather-belt', name: 'Leather Belt', price: 399, gstPercent: 12, category: 'Accessories' },
  { id: 'steel-bottle', name: 'Stainless Steel Bottle', price: 349, gstPercent: 18, category: 'Accessories' },
  { id: 'notebook-a5', name: 'Notebook A5', price: 89, gstPercent: 12, category: 'Stationery' },
  { id: 'ballpoint-pen-10', name: 'Ballpoint Pen (Pack 10)', price: 60, gstPercent: 12, category: 'Stationery' },
  { id: 'hand-sanitizer-500', name: 'Hand Sanitizer 500ml', price: 199, gstPercent: 18, category: 'Health' },
  { id: 'sunglasses', name: 'Sunglasses', price: 799, gstPercent: 18, category: 'Accessories' },
  { id: 'backpack-20l', name: 'Backpack 20L', price: 1199, gstPercent: 18, category: 'Bags' },
];

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

/**
 * Recalculates the bill from scratch on every cart mutation.
 * `taxInclusive` (default) treats shelf prices as GST-inclusive and back-computes
 * the tax component per line; otherwise GST is added on top of each line.
 */
export function calculateBillTotals(lines: PosCartLine[], taxInclusive = true): PosBillTotals {
  let grossRaw = 0;
  let netRaw = 0;
  let itemCount = 0;

  for (const line of lines) {
    const qty = Math.max(0, line.qty);
    const rate = Math.max(0, line.gstPercent) / 100;
    const lineAmount = qty * Math.max(0, line.unitPrice);

    if (taxInclusive) {
      grossRaw += lineAmount;
      netRaw += lineAmount / (1 + rate);
    } else {
      netRaw += lineAmount;
      grossRaw += lineAmount * (1 + rate);
    }

    itemCount += qty;
  }

  // Round the aggregates, then derive the third value so the displayed
  // subtotal + GST always adds up to the displayed total.
  if (taxInclusive) {
    const total = roundMoney(grossRaw);
    const gst = roundMoney(grossRaw - netRaw);
    return { subtotal: roundMoney(total - gst), gst, total, itemCount };
  }

  const subtotal = roundMoney(netRaw);
  const gst = roundMoney(grossRaw - netRaw);
  return { subtotal, gst, total: roundMoney(subtotal + gst), itemCount };
}

/**
 * Indian-grouped currency formatter (₹1,23,456.00).
 * Hand-rolled instead of toLocaleString so server and client render identically.
 */
export function formatInr(amount: number, withDecimals = true): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const isNegative = safe < 0;
  const absolute = Math.abs(safe);
  const fixed = withDecimals ? absolute.toFixed(2) : String(Math.round(absolute));
  const [whole, fraction] = fixed.split('.');

  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}` : last3;

  return `${isNegative ? '-' : ''}₹${grouped}${fraction ? `.${fraction}` : ''}`;
}

/** Stable, collision-free id for a cashier-created custom product. */
export function createCustomProductId(name: string, sequence: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
  return `custom-${slug || 'item'}-${sequence}`;
}
