import { useCallback, useRef } from "react";

export const useDebounce = (fn, delay) => {
  const timeoutref = useRef(null);

  const debounce = useCallback((...para) => {
    if (timeoutref.current) {
      clearTimeout(timeoutref.current);
    }
    timeoutref.current = setTimeout(() => {
      fn(...para);
    }, delay);
  });

  return debounce;
};
