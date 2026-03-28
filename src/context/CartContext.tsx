import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: ShippingAddress;
  date: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  placeOrder: (address: ShippingAddress) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getCartTotal = useCallback(() => items.reduce((t, i) => t + i.product.price * i.quantity, 0), [items]);
  const getCartCount = useCallback(() => items.reduce((t, i) => t + i.quantity, 0), [items]);

  const placeOrder = useCallback((address: ShippingAddress) => {
    const orderId = "ORD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    const order: Order = { id: orderId, items: [...items], total: getCartTotal(), address, date: new Date().toISOString() };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return orderId;
  }, [items, getCartTotal]);

  return (
    <CartContext.Provider value={{ items, orders, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
