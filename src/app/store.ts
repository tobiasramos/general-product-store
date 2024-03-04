import axios from "axios";
import { create } from "zustand";
import { Product } from "./components/interface/product";

interface StoreState {
  count: number;
  cart: Product[];
  products: Product[];
  deleteToCart: (product: Product) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

interface StoreActions {
  setCount: (count: number) => void;
  inc: () => void;
  getAllProducts: () => Promise<void>;
  searchByName: (name: string) => Promise<void>;
  filterProducts: (name: string) => Promise<void>;
  addToCart: (product: Product) => void;
  finalizePurchase: () => void;
}

export const useStore = create<StoreState & StoreActions>((set, getState) => ({
  count: 0,
  cart: [],
  setCount: (count: number) => set({ count }),
  products: [],
  inc: () => set((state: any) => ({ count: state.count + 1 })),

  getAllProducts: async () => {
    try {
      const response = await axios.get<{ products: Product[] }>(
        "https://dummyjson.com/products"
      );
      const sortedProducts = response.data.products.sort((a, b) => a.id - b.id);
      set({ products: sortedProducts });
    } catch (error) {
      console.log("Erro ao buscar os produtos: " + error);
    }
  },

  searchByName: async (name: string) => {
    try {
      const response = await axios.get<{ products: Product[] }>(
        `https://dummyjson.com/products/search?q=${name}`
      );
      const sortedProducts = response.data.products.sort((a, b) => a.id - b.id);
      set({ products: sortedProducts });
    } catch (error) {
      console.log("Erro ao buscar os produtos: " + error);
    }
  },

  filterProducts: async (name: string) => {
    try {
      const response = await axios.get<{ products: Product[] }>(
        `https://dummyjson.com/products/category/${name}`
      );
      const sortedProducts = response.data.products.sort((a, b) => a.id - b.id);
      set({ products: sortedProducts });
    } catch (error) {
      console.log("Erro ao buscar os produtos: " + error);
    }
  },

  addToCart: (product: Product) => {
    const existingProductIndex = getState().cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...getState().cart];
      updatedCart[existingProductIndex].quantity += 1;
      set({ cart: updatedCart });
    } else {
      set({ cart: [...getState().cart, { ...product, quantity: 1 }] });
    }
  },

  incrementQuantity: (productId: number) => {
    const updatedCart = getState().cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    set({ cart: updatedCart });
    set((state) => ({ count: state.count + 1 }));
  },

  decrementQuantity: (productId: number) => {
    const updatedCart = getState().cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    set({ cart: updatedCart });
    set((state) => ({ count: state.count - 1 }));
  },

  deleteToCart: (product: Product) => {
    const updatedCart = getState().cart.filter(
      (item) => item.id !== product.id
    );
    const count = updatedCart.reduce((total, item) => total + item.quantity, 0);
    set({ cart: updatedCart, count });
  },

  finalizePurchase: () => {
    set({ cart: [], count: 0 });
  },
}));
