/*
  Artificially inject a wait period to avoid flash of loading state
*/

export const waitAsync = async (timeMs: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      return resolve();
    }, timeMs);
  });
};
