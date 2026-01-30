import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_PRODUCT_ORDER } from '@/lib/product-order';

const PRODUCT_ORDER_FILE = path.join(
  process.cwd(),
  'app/admin/config/product-order.json'
);

type ProductOrderConfig = { order: string[]; hidden: string[] };

function readConfig(): ProductOrderConfig {
  try {
    if (fs.existsSync(PRODUCT_ORDER_FILE)) {
      const raw = fs.readFileSync(PRODUCT_ORDER_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.every((s: unknown) => typeof s === 'string')) {
        return { order: data, hidden: [] };
      }
      if (data && typeof data === 'object' && Array.isArray(data.order)) {
        const hidden = Array.isArray(data.hidden) ? data.hidden.filter((s: unknown) => typeof s === 'string') : [];
        return { order: data.order, hidden };
      }
    }
  } catch (error) {
    console.error('Error reading product order:', error);
  }
  return { order: [...DEFAULT_PRODUCT_ORDER], hidden: [] };
}

function saveConfig(config: ProductOrderConfig): boolean {
  try {
    const dir = path.dirname(PRODUCT_ORDER_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      PRODUCT_ORDER_FILE,
      JSON.stringify({ order: config.order, hidden: config.hidden }, null, 2),
      'utf-8'
    );
    return true;
  } catch (error) {
    console.error('Error saving product order:', error);
    return false;
  }
}

export async function GET() {
  const config = readConfig();
  return NextResponse.json(config);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = body?.order;
    const hidden = body?.hidden;
    if (!Array.isArray(order) || !order.every((s: unknown) => typeof s === 'string')) {
      return NextResponse.json(
        { success: false, error: 'Request body must include order: string[]' },
        { status: 400 }
      );
    }
    const hiddenList = Array.isArray(hidden) ? hidden.filter((s: unknown) => typeof s === 'string') : readConfig().hidden;
    if (saveConfig({ order, hidden: hiddenList })) {
      return NextResponse.json({ success: true, order, hidden: hiddenList });
    }
    return NextResponse.json(
      { success: false, error: 'Failed to save' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating product order:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
