import axios from "axios";
import { create } from "zustand";
import { Product } from "./components/interface/product";

interface StoreState {
  count: number;
  products: Product[];
}

interface StoreActions {
  inc: () => void;
  getAllProducts: () => Promise<void>;
}

export const useStore = create<StoreState & StoreActions>((set) => ({
  count: 0,
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
}));
