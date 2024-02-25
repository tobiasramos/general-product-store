import { create } from "zustand";
interface StoreState {
  count: number;
}

interface StoreActions {
  inc: () => void;
}

export const useStore = create<StoreState & StoreActions>((set) => ({
  count: 0,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
}));
