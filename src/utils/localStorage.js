const { stringify, parse } = JSON;

export const setStorage = (key, value, { format } = {}) => {
  if (typeof window !== 'object') return;
  window.localStorage.setItem(key, format ? stringify(value) : value);
};

export const getStorage = (key, { format } = {}) => {
  if (typeof window !== 'object') return;
  const value = window.localStorage.getItem(key);
  return format
    ? parse(window.localStorage.getItem(key))
    : value;
};
