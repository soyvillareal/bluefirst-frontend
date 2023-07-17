export const getStorage = () => {
  return typeof window !== "undefined" && navigator.cookieEnabled ? window.localStorage : null;
};
