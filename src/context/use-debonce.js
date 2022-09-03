import { useState, useEffect } from 'react';

const useDebonce = (val, delay) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, val]);

  return debounceVal;
};

export default useDebonce;
