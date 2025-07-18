// store/modeStore.ts
import { create } from 'zustand';

// Define the possible modes
type Mode = 'on' | 'off';

// Define the shape of your store
interface ModeStore {
  mode: Mode;
  setOn: () => void;
  setOff: () => void;
}

// Create the Zustand store
export const useModeStore = create<ModeStore>((set, get) => ({
  mode: 'off', // Default state is off

  setOn: () => {
    // console.log("🟢 Setting mode to ON");
    set({ mode: 'on' });
    console.log('🟢 Mode after set:', get().mode);
  },

  setOff: () => {
    // console.log("🔴 Setting mode to OFF");
    set({ mode: 'off' });
    console.log('🔴 Mode after set:', get().mode);
  },
}));
