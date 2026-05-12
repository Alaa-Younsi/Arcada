export type Lang = 'en' | 'fr' | 'ar';
export type RoomId = 'bathroom' | 'living-room' | 'bedroom' | 'kitchen';

export interface ColorVariant {
  id: string;
  name: Record<Lang, string>;
  hex: string;
  image: string;
  // Optional per-room override. Falls back to /previews/{roomId}/{id}.jpg
  roomImages?: Partial<Record<RoomId, string>>;
}

export interface CatalogueProduct {
  id: string;
  categorySlug: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  size: string;
  finish: string;
  variants: ColorVariant[];
  isFeatured?: boolean;
}

export interface CatalogueCategory {
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  shape: string;
}

// Preview state (used in the room visualizer)
export interface PreviewSelection {
  zone: 'wall' | 'floor' | 'accent'; // which zone in the room image
  variantId: string;
  productSlug: string;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  description_en?: string;
  description_fr?: string;
  description_ar?: string;
  image_url?: string;
  sort_order?: number;
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  description_en?: string;
  description_fr?: string;
  description_ar?: string;
  base_price: number;
  is_active: boolean;
  is_featured: boolean;
  images: string[];
  variants?: ProductVariant[];
  category?: Category;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  sku: string;
  price_modifier: number;
  stock: number;
  color_hex?: string;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  country: string;
  city: string;
  address_line1: string;
  address_line2?: string;
  zip_code?: string;
  total_amount: number;
  created_at: string;
  admin_note?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name_en: string;
  variant_name_en?: string;
  quantity: number;
  unit_price: number;
}
