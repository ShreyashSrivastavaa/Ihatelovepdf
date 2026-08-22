import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export interface GstInvoiceItem {
  description: string;
  hsn: string;
  quantity: number;
  rate: number;
  cgstRate: number; // e.g. 9 for 9%
  sgstRate: number; // e.g. 9 for 9%
  igstRate: number; // e.g. 18 for 18%
}

export interface GstInvoiceData {
  sellerName: string;
  sellerGstin: string;
  sellerAddress: string;
  buyerName: string;
  buyerGstin: string;
  buyerAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  placeOfSupply: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
  };
  items: GstInvoiceItem[];
  notes?: string;
}

export async function generateGstInvoicePdf(data: GstInvoiceData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Header Box
  page.drawRectangle({
    x: margin,
    y: y - 50,
    width: contentWidth,
    height: 50,
    color: rgb(0.95, 0.96, 0.98),
    borderColor: rgb(0.8, 0.85, 0.9),
    borderWidth: 1,
  });

  page.drawText('TAX INVOICE', {
    x: margin + 15,
    y: y - 32,
    size: 18,
    font: boldFont,
    color: rgb(0.08, 0.2, 0.4),
  });

  page.drawText('Original for Recipient', {
    x: pageWidth - margin - 130,
    y: y - 30,
    size: 9,
    font,
    color: rgb(0.4, 0.4, 0.45),
  });

  y -= 65;

  // Seller & Buyer Details Box
  const infoBoxHeight = 85;
  page.drawRectangle({
    x: margin,
    y: y - infoBoxHeight,
    width: contentWidth,
    height: infoBoxHeight,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.85, 0.85, 0.88),
    borderWidth: 1,
  });

  // Seller (Left)
  page.drawText('SOLD BY / SUPPLIER:', { x: margin + 10, y: y - 16, size: 8, font: boldFont, color: rgb(0.3, 0.3, 0.35) });
  page.drawText(data.sellerName || 'Your Business Name', { x: margin + 10, y: y - 28, size: 10, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  page.drawText(data.sellerAddress || 'Business Address Line, City, State - PIN', { x: margin + 10, y: y - 42, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
  page.drawText(`GSTIN: ${data.sellerGstin || '27AAAAA0000A1Z5'}`, { x: margin + 10, y: y - 56, size: 8, font: boldFont, color: rgb(0.1, 0.3, 0.6) });

  // Invoice Meta (Middle/Right)
  const metaX = margin + contentWidth / 2 + 10;
  page.drawText('BILL TO / RECIPIENT:', { x: metaX, y: y - 16, size: 8, font: boldFont, color: rgb(0.3, 0.3, 0.35) });
  page.drawText(data.buyerName || 'Client Name / Company', { x: metaX, y: y - 28, size: 10, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  page.drawText(data.buyerAddress || 'Client Address Line, City, State', { x: metaX, y: y - 42, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
  page.drawText(`GSTIN: ${data.buyerGstin || 'URP (Unregistered)'}`, { x: metaX, y: y - 56, size: 8, font: boldFont, color: rgb(0.1, 0.3, 0.6) });

  y -= infoBoxHeight + 15;

  // Invoice Details Ribbon
  page.drawRectangle({
    x: margin,
    y: y - 24,
    width: contentWidth,
    height: 24,
    color: rgb(0.96, 0.97, 0.98),
  });

  page.drawText(`Invoice No: ${data.invoiceNumber || 'INV-2026-001'}`, { x: margin + 8, y: y - 16, size: 9, font: boldFont, color: rgb(0.15, 0.15, 0.15) });
  page.drawText(`Date: ${data.invoiceDate || new Date().toISOString().split('T')[0]}`, { x: margin + 180, y: y - 16, size: 9, font, color: rgb(0.2, 0.2, 0.2) });
  page.drawText(`Place of Supply: ${data.placeOfSupply || 'Maharashtra (27)'}`, { x: margin + 330, y: y - 16, size: 9, font, color: rgb(0.2, 0.2, 0.2) });

  y -= 35;

  // Items Table Header
  const tableHeaderY = y;
  page.drawRectangle({
    x: margin,
    y: tableHeaderY - 20,
    width: contentWidth,
    height: 20,
    color: rgb(0.12, 0.2, 0.35),
  });

  page.drawText('#', { x: margin + 6, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('Description', { x: margin + 26, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('HSN/SAC', { x: margin + 200, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('Qty', { x: margin + 260, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('Rate (Rs)', { x: margin + 300, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('Taxable (Rs)', { x: margin + 360, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('Tax', { x: margin + 430, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('Total (Rs)', { x: margin + 475, y: tableHeaderY - 14, size: 8, font: boldFont, color: rgb(1, 1, 1) });

  y -= 22;

  let totalTaxable = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  const items = data.items && data.items.length > 0 ? data.items : [
    { description: 'Professional Web & Software Services', hsn: '998314', quantity: 1, rate: 25000, cgstRate: 9, sgstRate: 9, igstRate: 0 },
    { description: 'Cloud Infrastructure Setup & Security Audit', hsn: '998313', quantity: 1, rate: 10000, cgstRate: 9, sgstRate: 9, igstRate: 0 },
  ];

  items.forEach((item, idx) => {
    const taxable = item.quantity * item.rate;
    const cgstAmt = (taxable * (item.cgstRate || 0)) / 100;
    const sgstAmt = (taxable * (item.sgstRate || 0)) / 100;
    const igstAmt = (taxable * (item.igstRate || 0)) / 100;
    const lineTotal = taxable + cgstAmt + sgstAmt + igstAmt;

    totalTaxable += taxable;
    totalCgst += cgstAmt;
    totalSgst += sgstAmt;
    totalIgst += igstAmt;

    const rowBg = idx % 2 === 1 ? rgb(0.98, 0.98, 0.99) : rgb(1, 1, 1);
    page.drawRectangle({
      x: margin,
      y: y - 20,
      width: contentWidth,
      height: 20,
      color: rowBg,
      borderColor: rgb(0.9, 0.9, 0.92),
      borderWidth: 0.5,
    });

    page.drawText(String(idx + 1), { x: margin + 6, y: y - 14, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(item.description, { x: margin + 26, y: y - 14, size: 8, font, color: rgb(0.1, 0.1, 0.1) });
    page.drawText(item.hsn || '-', { x: margin + 200, y: y - 14, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(String(item.quantity), { x: margin + 260, y: y - 14, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(item.rate.toFixed(2), { x: margin + 300, y: y - 14, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(taxable.toFixed(2), { x: margin + 360, y: y - 14, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(`${(item.cgstRate + item.sgstRate + item.igstRate)}%`, { x: margin + 430, y: y - 14, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(lineTotal.toFixed(2), { x: margin + 475, y: y - 14, size: 8, font: boldFont, color: rgb(0.1, 0.1, 0.1) });

    y -= 20;
  });

  const grandTotal = totalTaxable + totalCgst + totalSgst + totalIgst;

  y -= 10;

  // Summary Totals
  const sumX = margin + 300;
  page.drawText('Total Taxable Amount:', { x: sumX, y: y - 12, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
  page.drawText(`Rs ${totalTaxable.toFixed(2)}`, { x: sumX + 130, y: y - 12, size: 8, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  y -= 16;

  if (totalCgst > 0) {
    page.drawText('CGST Total:', { x: sumX, y: y - 12, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Rs ${totalCgst.toFixed(2)}`, { x: sumX + 130, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    y -= 14;
  }

  if (totalSgst > 0) {
    page.drawText('SGST Total:', { x: sumX, y: y - 12, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Rs ${totalSgst.toFixed(2)}`, { x: sumX + 130, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    y -= 14;
  }

  if (totalIgst > 0) {
    page.drawText('IGST Total:', { x: sumX, y: y - 12, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Rs ${totalIgst.toFixed(2)}`, { x: sumX + 130, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    y -= 14;
  }

  // Grand Total Box
  page.drawRectangle({
    x: sumX - 10,
    y: y - 24,
    width: contentWidth - 290,
    height: 24,
    color: rgb(0.92, 0.95, 0.99),
    borderColor: rgb(0.7, 0.8, 0.95),
    borderWidth: 1,
  });

  page.drawText('GRAND TOTAL:', { x: sumX, y: y - 16, size: 10, font: boldFont, color: rgb(0.08, 0.2, 0.4) });
  page.drawText(`Rs ${grandTotal.toFixed(2)}`, { x: sumX + 120, y: y - 16, size: 11, font: boldFont, color: rgb(0.08, 0.2, 0.4) });

  y -= 45;

  // Bank Details (Bottom Left)
  if (data.bankDetails) {
    page.drawText('BANK DETAILS FOR PAYMENT:', { x: margin, y: y, size: 8, font: boldFont, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Bank: ${data.bankDetails.bankName}`, { x: margin, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(`A/C: ${data.bankDetails.accountNumber}  |  IFSC: ${data.bankDetails.ifsc}`, { x: margin, y: y - 24, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
  }

  // Signatory Stamp (Bottom Right)
  page.drawText('For ' + (data.sellerName || 'Your Business'), { x: margin + 340, y: y, size: 8, font: boldFont, color: rgb(0.2, 0.2, 0.2) });
  page.drawText('Authorized Signatory', { x: margin + 340, y: y - 35, size: 8, font, color: rgb(0.4, 0.4, 0.4) });

  return pdfDoc.save({ useObjectStreams: true });
}

export interface PosReceiptData {
  storeName: string;
  storeAddress: string;
  storePhone?: string;
  receiptNumber: string;
  receiptDate?: string;
  cashierName?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  discountPercent?: number;
  format?: '58mm' | '80mm' | 'a4';
  footerMessage?: string;
}

export async function generatePosReceiptPdf(data: PosReceiptData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const monoFont = await pdfDoc.embedFont(StandardFonts.Courier);

  const is58mm = data.format === '58mm';
  const pageWidth = is58mm ? 164 : 226; // 58mm = ~164pt, 80mm = ~226pt
  const pageHeight = 450; // Continuous receipt height
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin - 10;

  // Store Name Header
  const storeName = data.storeName || 'RETAIL POS STORE';
  const nameWidth = boldFont.widthOfTextAtSize(storeName, 11);
  page.drawText(storeName, { x: (pageWidth - nameWidth) / 2, y, size: 11, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  y -= 14;

  const addr = data.storeAddress || '123 Main Street, Market Area';
  const addrWidth = font.widthOfTextAtSize(addr, 7);
  page.drawText(addr, { x: Math.max(margin, (pageWidth - addrWidth) / 2), y, size: 7, font, color: rgb(0.3, 0.3, 0.3) });
  y -= 12;

  if (data.storePhone) {
    const ph = `Tel: ${data.storePhone}`;
    const phWidth = font.widthOfTextAtSize(ph, 7);
    page.drawText(ph, { x: (pageWidth - phWidth) / 2, y, size: 7, font, color: rgb(0.3, 0.3, 0.3) });
    y -= 12;
  }

  // Dashed Separator
  page.drawLine({ start: { x: margin, y }, end: { x: margin + contentWidth, y }, thickness: 0.5, color: rgb(0.6, 0.6, 0.6) });
  y -= 12;

  // Meta
  page.drawText(`Rcpt: #${data.receiptNumber || 'POS-8902'}`, { x: margin, y, size: 7, font: monoFont, color: rgb(0.2, 0.2, 0.2) });
  page.drawText(`Date: ${data.receiptDate || new Date().toLocaleDateString()}`, { x: margin + contentWidth - 65, y, size: 7, font: monoFont, color: rgb(0.2, 0.2, 0.2) });
  y -= 14;

  page.drawLine({ start: { x: margin, y }, end: { x: margin + contentWidth, y }, thickness: 0.5, color: rgb(0.6, 0.6, 0.6) });
  y -= 12;

  // Items
  let subtotal = 0;
  const items = data.items && data.items.length > 0 ? data.items : [
    { name: 'Organic Coffee Beans 250g', quantity: 1, price: 350 },
    { name: 'Artisan Croissant', quantity: 2, price: 120 },
    { name: 'Mineral Water 500ml', quantity: 1, price: 30 },
  ];

  items.forEach((item) => {
    const lineTotal = item.quantity * item.price;
    subtotal += lineTotal;

    page.drawText(item.name.slice(0, 22), { x: margin, y, size: 8, font, color: rgb(0.1, 0.1, 0.1) });
    y -= 10;
    page.drawText(`${item.quantity} x ${item.price.toFixed(2)}`, { x: margin + 6, y, size: 7, font: monoFont, color: rgb(0.4, 0.4, 0.4) });
    page.drawText(lineTotal.toFixed(2), { x: margin + contentWidth - 40, y, size: 8, font: monoFont, color: rgb(0.1, 0.1, 0.1) });
    y -= 12;
  });

  page.drawLine({ start: { x: margin, y }, end: { x: margin + contentWidth, y }, thickness: 0.5, color: rgb(0.6, 0.6, 0.6) });
  y -= 14;

  // Subtotal & Grand Total
  page.drawText('SUBTOTAL:', { x: margin, y, size: 8, font, color: rgb(0.3, 0.3, 0.3) });
  page.drawText(subtotal.toFixed(2), { x: margin + contentWidth - 45, y, size: 8, font: monoFont, color: rgb(0.1, 0.1, 0.1) });
  y -= 14;

  const discount = (subtotal * (data.discountPercent || 0)) / 100;
  if (discount > 0) {
    page.drawText(`DISCOUNT (${data.discountPercent}%):`, { x: margin, y, size: 7, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`-${discount.toFixed(2)}`, { x: margin + contentWidth - 45, y, size: 7, font: monoFont, color: rgb(0.8, 0.1, 0.1) });
    y -= 12;
  }

  const grandTotal = subtotal - discount;
  page.drawText('TOTAL DUE:', { x: margin, y, size: 9, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  page.drawText(`Rs ${grandTotal.toFixed(2)}`, { x: margin + contentWidth - 55, y, size: 10, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  y -= 20;

  // Footer Message
  const foot = data.footerMessage || 'Thank you for your purchase!';
  const footWidth = font.widthOfTextAtSize(foot, 7);
  page.drawText(foot, { x: Math.max(margin, (pageWidth - footWidth) / 2), y, size: 7, font, color: rgb(0.3, 0.3, 0.3) });

  return pdfDoc.save({ useObjectStreams: true });
}
