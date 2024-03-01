import axios from "axios";
import { create } from "zustand";
import { Product } from "./components/interface/product";

interface StoreState {
  count: number;
  cart: Product[];
  products: Product[];
  deleteToCart: (product: Product) => void;
}

interface StoreActions {
  setCount: (count: number) => void;
  inc: () => void;
  getAllProducts: () => Promise<void>;
  searchByName: (name: string) => Promise<void>;
  filterProducts: (name: string) => Promise<void>;
  addToCart: (product: Product) => void;
  finalizePurchase: () => void;
  deleteToCart: (product: Product) => void;
}

export const useStore = create<StoreState & StoreActions>((set) => ({
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
    set((state) => ({
      cart: [...state.cart, product],
    }));
  },

  deleteToCart: (product: Product) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
      count: state.count - 1,
    }));
  },

  finalizePurchase: () => {
    set({ cart: [], count: 0 });
  },
}));
