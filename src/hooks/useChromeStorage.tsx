import { useEffect, useState } from "react";

function useChromeStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setStoredValue(result[key]);
      } else {
        chrome.storage.local.set({ [key]: initialValue });
      }
    });
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    chrome.storage.local.set({ [key]: value });
  };

  return [storedValue, setValue] as const;
}

export default useChromeStorage;
