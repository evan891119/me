import { create } from 'zustand';

interface AppState {
  focusedExhibitId: string | null;
  isOverlayOpen: boolean;
  isPointerLocked: boolean;
  shouldResumePointerLockOnClose: boolean;
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
  shouldResumePointerLockOnClose: false,
  selectedExhibitId: null,
  closeExhibit: () =>
    set({
      isOverlayOpen: false,
      selectedExhibitId: null,
      shouldResumePointerLockOnClose: false,
    }),
  openExhibit: (selectedExhibitId) =>
    set((state) => ({
      focusedExhibitId: null,
      isOverlayOpen: true,
      selectedExhibitId,
      shouldResumePointerLockOnClose: state.isPointerLocked,
    })),
  setFocusedExhibitId: (focusedExhibitId) => set({ focusedExhibitId }),
  setOverlayOpen: (isOverlayOpen) => set({ isOverlayOpen }),
  setPointerLocked: (isPointerLocked) =>
    set(
      isPointerLocked
        ? { isPointerLocked }
        : { focusedExhibitId: null, isPointerLocked },
    ),
}));
