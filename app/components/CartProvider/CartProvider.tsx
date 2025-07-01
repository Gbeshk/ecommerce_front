"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  priceInt: number;
  quantity: number;
  img: string;
  price: string;
};

interface CartContextType {
  cartArray: CartItem[];
  setCartArray: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartArray, setCartArray] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartArray(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      if (cartArray.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cartArray));
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, [cartArray, isClient]);

  return (
    <CartContext.Provider value={{ cartArray, setCartArray }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
