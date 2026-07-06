import { create } from 'zustand';

interface AppState {
  isOverlayOpen: boolean;
  isPointerLocked: boolean;
  setOverlayOpen: (isOverlayOpen: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOverlayOpen: false,
  isPointerLocked: false,
  setOverlayOpen: (isOverlayOpen) => set({ isOverlayOpen }),
  setPointerLocked: (isPointerLocked) => set({ isPointerLocked }),
}));
