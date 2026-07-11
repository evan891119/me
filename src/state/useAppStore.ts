import { create } from 'zustand';
import type { WorldLocationId } from '../content/world';

interface AppState {
  activeLocationId: WorldLocationId;
  focusedContentId: string | null;
  hasEnteredWorld: boolean;
  isOverlayOpen: boolean;
  isPointerLocked: boolean;
  shouldResumePointerLockOnClose: boolean;
  selectedContentId: string | null;
  closeContent: (resumePointerLock?: boolean) => void;
  openContent: (selectedContentId: string) => void;
  setActiveLocation: (activeLocationId: WorldLocationId) => void;
  setFocusedContentId: (focusedContentId: string | null) => void;
  setOverlayOpen: (isOverlayOpen: boolean) => void;
  setPointerLocked: (isPointerLocked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeLocationId: 'exterior',
  focusedContentId: null,
  hasEnteredWorld: false,
  isOverlayOpen: false,
  isPointerLocked: false,
  shouldResumePointerLockOnClose: false,
  selectedContentId: null,
  closeContent: (resumePointerLock = false) =>
    set({
      ...(resumePointerLock
        ? { hasEnteredWorld: true, isPointerLocked: true }
        : {}),
      isOverlayOpen: false,
      selectedContentId: null,
      shouldResumePointerLockOnClose: false,
    }),
  setActiveLocation: (activeLocationId) =>
    set({
      activeLocationId,
      focusedContentId: null,
    }),
  openContent: (selectedContentId) =>
    set((state) => ({
      focusedContentId: null,
      isOverlayOpen: true,
      selectedContentId,
      shouldResumePointerLockOnClose: state.isPointerLocked,
    })),
  setFocusedContentId: (focusedContentId) => set({ focusedContentId }),
  setOverlayOpen: (isOverlayOpen) => set({ isOverlayOpen }),
  setPointerLocked: (isPointerLocked) =>
    set(
      isPointerLocked
        ? { hasEnteredWorld: true, isPointerLocked }
        : { focusedContentId: null, isPointerLocked },
    ),
}));
