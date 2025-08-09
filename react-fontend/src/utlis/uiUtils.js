// Utility to prevent unnecessary re-renders and flashing
export const shouldShowContent = (loading, hasData, isInitialLoad) => {
  // Always show content if we have data, even while loading fresh data
  if (hasData && !isInitialLoad) {
    return true;
  }

  // Show loading only on initial load without data
  if (loading && !hasData && isInitialLoad) {
    return false;
  }

  // Show content by default
  return true;
};

// Debounce utility for search
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Check if data is fresh
export const isDataFresh = (timestamp, ttlMinutes = 5) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < ttlMinutes * 60 * 1000;
};

// Smooth transition utility
export const addSmoothTransition = (element, duration = 150) => {
  if (element) {
    element.style.transition = `opacity ${duration}ms ease-in-out`;
  }
};
