type AnalyticsWindow = Window & {
  analytics?: {
    track?: (event: string, properties?: Record<string, unknown>) => void;
  };
};

export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  const analytics = (window as AnalyticsWindow).analytics;
  analytics?.track?.(event, properties);
};
