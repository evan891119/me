export function supportsWebGL() {
  if (typeof window === 'undefined') {
    return true;
  }

  if (new URLSearchParams(window.location.search).has('forceFallback')) {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    return Boolean(context);
  } catch {
    return false;
  }
}
