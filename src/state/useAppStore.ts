import { create } from 'zustand';

interface AppState {
  focusedExhibitId: string | null;
  isOverlayOpen: boolean;
  isPointerLocked: boolean;
  selectedExhibitId: string | null;
  closeExhibit: () => void;
  openExhibit: (selectedExhibitId: string) => void;
  setFocusedExhibitId: (focusedExhibitId: string | null) => void;
  setOverlayOpen: (isOverlayOpen: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  focusedExhibitId: null,
  isOverlayOpen: false,
  isPointerLocked: false,
  selectedExhibitId: null,
  closeExhibit: () => set({ isOverlayOpen: false, selectedExhibitId: null }),
  openExhibit: (selectedExhibitId) =>
    set({ focusedExhibitId: null, isOverlayOpen: true, selectedExhibitId }),
  setFocusedExhibitId: (focusedExhibitId) => set({ focusedExhibitId }),
  setOverlayOpen: (isOverlayOpen) => set({ isOverlayOpen }),
  setPointerLocked: (isPointerLocked) =>
    set(
      isPointerLocked
        ? { isPointerLocked }
        : { focusedExhibitId: null, isPointerLocked },
    ),
}));
