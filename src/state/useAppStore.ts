import { create } from 'zustand';
import type { WorldLocationId } from '../content/world';

interface AppState {
  activeLocationId: WorldLocationId;
  focusedExhibitId: string | null;
  hasEnteredWorld: boolean;
  isOverlayOpen: boolean;
  isPointerLocked: boolean;
  shouldResumePointerLockOnClose: boolean;
  selectedExhibitId: string | null;
  closeExhibit: () => void;
  enterInterior: () => void;
  openExhibit: (selectedExhibitId: string) => void;
  setFocusedExhibitId: (focusedExhibitId: string | null) => void;
  setOverlayOpen: (isOverlayOpen: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeLocationId: 'exterior',
  focusedExhibitId: null,
  hasEnteredWorld: false,
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
  enterInterior: () =>
    set({
      activeLocationId: 'interior',
      focusedExhibitId: null,
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
        ? { hasEnteredWorld: true, isPointerLocked }
        : { focusedExhibitId: null, isPointerLocked },
    ),
}));
