// store/modeStore.ts
import { create } from 'zustand';

// Define the possible modes
type Mode = 'active' | 'passive';

// Define the shape of your store
interface ModeStore {
  mode: Mode;
  setActive: () => void;
  setPassive: () => void;
}

// Create the Zustand store
export const useModeStore = create<ModeStore>((set, get) => ({
  mode: 'passive', // Default state is passive

  setActive: () => {
    // console.log("🟢 Setting mode to ACTIVE");
    set({ mode: 'active' });
    console.log('🟢 Mode after set:', get().mode);
  },

  setPassive: () => {
    // console.log("🔴 Setting mode to PASSIVE");
    set({ mode: 'passive' });
    console.log('🔴 Mode after set:', get().mode);
  },
}));
