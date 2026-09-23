export type Store = {
  id: string;
  name: string;
  rating: number;
  distance: string;
  logoUrl: string;
  address: string;
  closingTime: string;
};

export type FoodItem = {
  id: string;
  storeId: string;
  title: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  portionsLeft: number;
  pickupWindow: string;
  expiresAt: string;
  category: string;
  rating: number;
  reviewCount: number;
  urgencyText?: string;
  unitLabel?: string;
  packagingTag?: string;
  urgencyTagline?: string;
};

export type CartItem = {
  foodId: string;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  storeId: string;
  pickupWindow: string;
  paymentMethod: "gopay" | "qris" | "bank_transfer" | "cod";
  status: "received" | "paid" | "ready" | "completed";
  pickupCode: string;
  total: number;
  createdAt: string;
};

export type Review = {
  id: string;
  foodId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  type: "order" | "promo" | "system";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  promoCode?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  impactKg: number;
  impactSavings: number;
  ordersCompleted: number;
};

export type PaymentMethod = "gopay" | "qris" | "bank_transfer" | "cod";

export type Category =
  | "Semua"
  | "Roti & Kue"
  | "Nasi & Lauk"
  | "Camilan"
  | "Minuman"
  | "Buah & Sayur"
  | "Dessert"
  | "Ayam & Bebek"
  | "Seafood"
  | "Vegetarian";
