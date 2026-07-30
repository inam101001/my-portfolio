export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.34,
    slow: 0.62,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    standard: [0.4, 0, 0.2, 1] as const,
  },
  distance: {
    text: 18,
    panel: 30,
  },
  scrollDamping: 12,
};
