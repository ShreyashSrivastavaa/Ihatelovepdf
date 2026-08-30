'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutGrid,
  Loader2,
  Minus,
  Plus,
  Receipt,
  RotateCcw,
  Search,
  Settings,
  ShoppingBag,
  Store,
  X,
} from 'lucide-react';
import {
  POS_ALL_CATEGORY,
  POS_CATEGORY_FILTERS,
  POS_GST_SLABS,
  POS_PRODUCT_CATEGORIES,
  POS_SEED_PRODUCTS,
  calculateBillTotals,
  createCustomProductId,
  formatInr,
  type PosCartLine,
  type PosProduct,
  type PosProductCategory,
} from '../../lib/pos-products';
import { generatePosReceiptPdf } from '../../lib/pdf-operations';
import { createPdfBlob } from '../../lib/pdf-processor';

const PAYMENT_MODES = ['Cash', 'Card', 'UPI', 'Wallet', 'Bank Transfer'] as const;

const RECEIPT_FORMATS: Array<{ value: '58mm' | '80mm' | 'a4'; label: string }> = [
  { value: '80mm', label: '80mm Thermal' },
  { value: '58mm', label: '58mm Thermal' },
  { value: 'a4', label: 'A4 Bill' },
];

interface StoreSettings {
  name: string;
  address: string;
  phone: string;
  format: '58mm' | '80mm' | 'a4';
  taxInclusive: boolean;
}

const DEFAULT_STORE: StoreSettings = {
  name: 'My Shop',
  address: '',
  phone: '',
  format: '80mm',
  taxInclusive: true,
};

const EMPTY_DRAFT = {
  name: '',
  price: '',
  gstPercent: '18',
  category: POS_PRODUCT_CATEGORIES[0] as PosProductCategory,
};

interface PosBillingInterfaceProps {
  /** Fired with the generated receipt once the cashier completes a sale. */
  onCheckout?: (blob: Blob, fileName: string) => void;
}

export default function PosBillingInterface({ onCheckout }: PosBillingInterfaceProps) {
  const [products, setProducts] = useState<PosProduct[]>(POS_SEED_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(POS_ALL_CATEGORY);

  const [cart, setCart] = useState<PosCartLine[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [paymentMode, setPaymentMode] = useState<string>(PAYMENT_MODES[0]);

  const [store, setStore] = useState<StoreSettings>(DEFAULT_STORE);
  const [showSettings, setShowSettings] = useState(false);

  const [showAddItem, setShowAddItem] = useState(false);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [draftError, setDraftError] = useState<string | null>(null);
  const customCountRef = useRef(0);

  const [isGenerating, setIsGenerating] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [lastBillRef, setLastBillRef] = useState<string | null>(null);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === POS_ALL_CATEGORY || product.category === activeCategory;
      const matchesQuery = !query || product.name.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, searchQuery]);

  const totals = useMemo(() => calculateBillTotals(cart, store.taxInclusive), [cart, store.taxInclusive]);

  const addToCart = useCallback((product: PosProduct) => {
    setLastBillRef(null);
    setCheckoutError(null);
    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id);
      if (existing) {
        return current.map((line) =>
          line.productId === product.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          qty: 1,
          unitPrice: product.price,
          gstPercent: product.gstPercent,
        },
      ];
    });
  }, []);

  const changeQty = useCallback((productId: string, delta: number) => {
    setCart((current) =>
      current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.max(1, line.qty + delta) } : line
      )
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setCart((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const resetBill = useCallback(() => {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setOrderRef('');
    setPaymentMode(PAYMENT_MODES[0]);
    setCheckoutError(null);
    setLastBillRef(null);
  }, []);

  const closeAddItem = useCallback(() => {
    setShowAddItem(false);
    setDraft(EMPTY_DRAFT);
    setDraftError(null);
  }, []);

  // Escape closes the custom-product modal
  useEffect(() => {
    if (!showAddItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAddItem();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showAddItem, closeAddItem]);

  const handleCreateProduct = () => {
    const name = draft.name.trim();
    const price = Number.parseFloat(draft.price);

    if (!name) {
      setDraftError('Enter a product name.');
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setDraftError('Enter a valid price in rupees.');
      return;
    }

    customCountRef.current += 1;
    const product: PosProduct = {
      id: createCustomProductId(name, customCountRef.current),
      name,
      price: Math.round(price * 100) / 100,
      gstPercent: Number.parseFloat(draft.gstPercent) || 0,
      category: draft.category,
    };

    setProducts((current) => [...current, product]);
    addToCart(product);
    closeAddItem();
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || isGenerating) return;

    setIsGenerating(true);
    setCheckoutError(null);

    try {
      const receiptNumber = orderRef.trim() || `POS-${Date.now().toString().slice(-6)}`;
      const bytes = await generatePosReceiptPdf({
        storeName: store.name.trim() || DEFAULT_STORE.name,
        storeAddress: store.address.trim(),
        storePhone: store.phone.trim() || undefined,
        receiptNumber,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        paymentMode,
        taxInclusive: store.taxInclusive,
        format: store.format,
        items: cart.map((line) => ({
          name: line.name,
          quantity: line.qty,
          price: line.unitPrice,
          gstPercent: line.gstPercent,
        })),
      });

      const blob = createPdfBlob(bytes);
      onCheckout?.(blob, `${receiptNumber}.pdf`);

      // Sale closed — clear the counter for the next customer.
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setOrderRef('');
      setLastBillRef(receiptNumber);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Could not generate the bill.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isCartEmpty = cart.length === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in">
      {/* ============ LEFT: PRODUCT CATALOG ============ */}
      <div className="lg:col-span-8 space-y-5">
        <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 space-y-5 shadow-sm">
          {/* Shop header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
                <Store className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--tx)] truncate">
                  {store.name.trim() || DEFAULT_STORE.name}
                </h2>
                <p className="text-xs font-medium text-[var(--tx-3)]">POS &middot; Quick Billing</p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--tx-2)]">
              {products.length} Items
            </span>
          </div>

          {/* Product search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tx-3)]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="input-modern w-full pl-10 pr-9 text-sm font-medium [&::-webkit-search-cancel-button]:appearance-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1"
            role="tablist"
            aria-label="Filter products by category"
          >
            {POS_CATEGORY_FILTERS.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[var(--tx)] text-[var(--bg)]'
                      : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Product tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {visibleProducts.map((product) => {
              const inCartQty = cart.find((line) => line.productId === product.id)?.qty ?? 0;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.name} to bill`}
                  className="relative flex flex-col justify-between gap-2 p-3.5 min-h-[104px] text-left rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] hover:border-[var(--accent-border)] active:scale-[0.98] cursor-pointer transition-all"
                >
                  {inCartQty > 0 && (
                    <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[var(--accent)] text-white text-[10px] font-mono font-bold">
                      {inCartQty}
                    </span>
                  )}
                  <span className="text-xs font-bold leading-snug text-[var(--tx)] pr-5">
                    {product.name}
                  </span>
                  <span className="space-y-0.5">
                    <span className="block text-lg font-extrabold tracking-tight text-[var(--tx)]">
                      {formatInr(product.price, false)}
                    </span>
                    <span className="block text-[10px] font-medium text-[var(--tx-3)]">
                      GST {product.gstPercent}%
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Custom product tile */}
            <button
              type="button"
              onClick={() => setShowAddItem(true)}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 min-h-[104px] rounded-xl border border-dashed border-[var(--border-hover)] bg-transparent text-[var(--tx-3)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] cursor-pointer transition-all"
            >
              <Plus className="h-5 w-5 stroke-[2.4]" />
              <span className="text-xs font-bold">Add Item</span>
            </button>
          </div>

          {visibleProducts.length === 0 && (
            <p className="text-center text-xs text-[var(--tx-3)] py-2">
              No products match{searchQuery.trim() ? ` "${searchQuery.trim()}"` : ' this category'}.
              Use <span className="font-bold">+ Add Item</span> to create one.
            </p>
          )}
        </div>
      </div>

      {/* ============ RIGHT: CURRENT BILL ============ */}
      <aside className="lg:col-span-4 lg:sticky lg:top-20 lg:self-start">
        <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm flex flex-col lg:max-h-[calc(100vh-7rem)]">
          {/* Bill header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--tx)] flex items-center gap-2">
              <Receipt className="h-4 w-4 text-[var(--accent)]" />
              Current Bill
            </h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetBill}
                disabled={isCartEmpty && !customerName && !customerPhone && !orderRef}
                aria-label="Clear current bill"
                title="Clear current bill"
                className="p-1.5 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowSettings((open) => !open)}
                aria-label="Store and receipt settings"
                aria-expanded={showSettings}
                title="Store and receipt settings"
                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                  showSettings
                    ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Store settings drawer */}
          {showSettings && (
            <div className="px-4 py-3.5 border-b border-[var(--border)] bg-[var(--bg)] space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--tx-3)]">
                Store &amp; Receipt
              </span>
              <input
                type="text"
                value={store.name}
                onChange={(event) => setStore((current) => ({ ...current, name: event.target.value }))}
                placeholder="Shop name"
                aria-label="Shop name"
                className="input-modern w-full text-xs font-bold"
              />
              <input
                type="text"
                value={store.address}
                onChange={(event) => setStore((current) => ({ ...current, address: event.target.value }))}
                placeholder="Shop address"
                aria-label="Shop address"
                className="input-modern w-full text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="tel"
                  value={store.phone}
                  onChange={(event) => setStore((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="Shop phone"
                  aria-label="Shop phone"
                  className="input-modern w-full text-xs"
                />
                <select
                  value={store.format}
                  onChange={(event) =>
                    setStore((current) => ({
                      ...current,
                      format: event.target.value as StoreSettings['format'],
                    }))
                  }
                  aria-label="Receipt format"
                  className="input-modern w-full text-xs cursor-pointer"
                >
                  {RECEIPT_FORMATS.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 pt-0.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={store.taxInclusive}
                  onChange={(event) =>
                    setStore((current) => ({ ...current, taxInclusive: event.target.checked }))
                  }
                  className="h-3.5 w-3.5 accent-[var(--accent)] cursor-pointer"
                />
                <span className="text-[11px] font-medium text-[var(--tx-2)]">
                  Prices include GST
                </span>
              </label>
            </div>
          )}

          {/* Customer & order meta */}
          <div className="px-4 py-3.5 border-b border-[var(--border)] grid grid-cols-2 gap-2">
            <input
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Customer name"
              aria-label="Customer name"
              className="input-modern w-full text-xs"
            />
            <input
              type="tel"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              placeholder="Phone"
              aria-label="Customer phone"
              className="input-modern w-full text-xs"
            />
            <input
              type="text"
              value={orderRef}
              onChange={(event) => setOrderRef(event.target.value)}
              placeholder="Order ref / No."
              aria-label="Order reference number"
              className="input-modern w-full text-xs font-mono"
            />
            <select
              value={paymentMode}
              onChange={(event) => setPaymentMode(event.target.value)}
              aria-label="Payment mode"
              className="input-modern w-full text-xs cursor-pointer"
            >
              {PAYMENT_MODES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Line items / empty state */}
          <div className="flex-1 min-h-0 lg:overflow-y-auto">
            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-[var(--border-hover)] text-[var(--tx-3)]">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-[var(--tx-3)]">
                  Tap products to add them here
                </p>
                {lastBillRef && (
                  <p className="text-[11px] font-semibold text-[var(--success)]">
                    Bill #{lastBillRef} generated
                  </p>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-[var(--border)]" role="list">
                {cart.map((line) => (
                  <li key={line.productId} className="px-4 py-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[var(--tx)] leading-snug">
                        {line.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLine(line.productId)}
                        aria-label={`Remove ${line.name} from bill`}
                        className="p-0.5 shrink-0 rounded-md text-[var(--tx-3)] hover:text-[var(--err)] hover:bg-[var(--err-soft)] cursor-pointer transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                          <button
                            type="button"
                            onClick={() => changeQty(line.productId, -1)}
                            disabled={line.qty <= 1}
                            aria-label={`Decrease ${line.name} quantity`}
                            className="p-1.5 rounded-l-lg text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span
                            className="min-w-[26px] text-center text-xs font-mono font-bold text-[var(--tx)]"
                            aria-live="polite"
                          >
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQty(line.productId, 1)}
                            aria-label={`Increase ${line.name} quantity`}
                            className="p-1.5 rounded-r-lg text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--tx-3)]">
                          &times; {formatInr(line.unitPrice, false)}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold text-[var(--tx)]">
                        {formatInr(line.qty * line.unitPrice)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Totals & checkout */}
          <div className="shrink-0 px-4 py-3.5 border-t border-[var(--border)] bg-[var(--bg)] rounded-b-2xl space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--tx-2)]">Subtotal</span>
              <span className="font-mono font-semibold text-[var(--tx)]">
                {formatInr(totals.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--tx-2)]">
                GST{store.taxInclusive ? ' (incl.)' : ''}
              </span>
              <span className="font-mono font-semibold text-[var(--tx)]">
                {formatInr(totals.gst)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <span className="text-sm font-bold uppercase tracking-wide text-[var(--tx)]">
                Total
              </span>
              <span className="text-xl font-mono font-extrabold tracking-tight text-[var(--tx)]">
                {formatInr(totals.total)}
              </span>
            </div>

            {checkoutError && (
              <p className="text-[11px] font-medium text-[var(--err)]" role="alert">
                {checkoutError}
              </p>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCartEmpty || isGenerating}
              className="btn-primary w-full py-2.5 text-sm font-bold gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating bill...
                </>
              ) : isCartEmpty ? (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add products to bill
                </>
              ) : (
                <>
                  <Receipt className="h-4 w-4" />
                  Checkout &middot; {formatInr(totals.total)}
                </>
              )}
            </button>

            {!isCartEmpty && (
              <p className="text-center text-[10px] text-[var(--tx-3)]">
                {totals.itemCount} item{totals.itemCount === 1 ? '' : 's'} &middot; generates a{' '}
                {RECEIPT_FORMATS.find((f) => f.value === store.format)?.label} PDF in your browser
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* ============ CUSTOM PRODUCT MODAL ============ */}
      {showAddItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeAddItem}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Create a custom product"
            className="relative w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
              <h4 className="text-sm font-bold text-[var(--tx)]">New custom product</h4>
              <button
                type="button"
                onClick={closeAddItem}
                aria-label="Close"
                className="p-1 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div className="space-y-1">
                <label htmlFor="pos-draft-name" className="text-xs font-semibold text-[var(--tx)]">
                  Product name
                </label>
                <input
                  id="pos-draft-name"
                  type="text"
                  value={draft.name}
                  autoFocus
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  placeholder="e.g. Wool Scarf"
                  className="input-modern w-full text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="pos-draft-price" className="text-xs font-semibold text-[var(--tx)]">
                    Price (&#8377;)
                  </label>
                  <input
                    id="pos-draft-price"
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={draft.price}
                    onChange={(event) => setDraft((current) => ({ ...current, price: event.target.value }))}
                    placeholder="0.00"
                    className="input-modern w-full text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="pos-draft-gst" className="text-xs font-semibold text-[var(--tx)]">
                    GST %
                  </label>
                  <select
                    id="pos-draft-gst"
                    value={draft.gstPercent}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, gstPercent: event.target.value }))
                    }
                    className="input-modern w-full text-sm cursor-pointer"
                  >
                    {POS_GST_SLABS.map((slab) => (
                      <option key={slab} value={String(slab)}>
                        {slab}%
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="pos-draft-category" className="text-xs font-semibold text-[var(--tx)]">
                  Category
                </label>
                <select
                  id="pos-draft-category"
                  value={draft.category}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      category: event.target.value as PosProductCategory,
                    }))
                  }
                  className="input-modern w-full text-sm cursor-pointer"
                >
                  {POS_PRODUCT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {draftError && (
                <p className="text-[11px] font-medium text-[var(--err)]" role="alert">
                  {draftError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-[var(--border)] bg-[var(--bg)]">
              <button
                type="button"
                onClick={closeAddItem}
                className="btn-secondary px-3.5 py-2 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateProduct}
                className="btn-primary px-3.5 py-2 text-xs font-bold gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Create &amp; add to bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
