export function requestMuseumPointerLock() {
  if (import.meta.env.DEV) {
    const shell = document.querySelector<HTMLElement>('main.app-shell');
    const requestCount = Number(shell?.dataset.pointerLockRequests ?? 0) + 1;
    shell?.setAttribute('data-pointer-lock-requests', String(requestCount));
  }

  return document.querySelector<HTMLCanvasElement>('canvas')?.requestPointerLock();
}
