import { create } from 'zustand';

interface AppState {
  isOverlayOpen: boolean;
  isPointerLocked: boolean;
  selectedExhibitId: string | null;
  closeExhibit: () => void;
  openExhibit: (selectedExhibitId: string) => void;
  setOverlayOpen: (isOverlayOpen: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOverlayOpen: false,
  isPointerLocked: false,
  selectedExhibitId: null,
  closeExhibit: () => set({ isOverlayOpen: false, selectedExhibitId: null }),
  openExhibit: (selectedExhibitId) =>
    set({ isOverlayOpen: true, selectedExhibitId }),
  setOverlayOpen: (isOverlayOpen) => set({ isOverlayOpen }),
  setPointerLocked: (isPointerLocked) => set({ isPointerLocked }),
}));
