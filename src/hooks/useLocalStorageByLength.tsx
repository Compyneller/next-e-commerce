import { useState, useEffect } from "react";

function useLocalStorageByLength(name: string, data: any[]): string | null {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    // Get the previous value from localStorage
    const previousValue = localStorage.getItem(name);

    if (previousValue) {
      // Parse the previous value to check length
      const parsedValue = JSON.parse(previousValue);
      if (parsedValue?.length === data?.length) {
        setStoredValue(previousValue); // Return previous value if lengths match
        return;
      }
    }

    // If lengths don't match, set the new value
    const newValue = JSON.stringify(data);
    localStorage.setItem(name, newValue);
    setStoredValue(newValue);
  }, [name, data]);

  return storedValue;
}

export default useLocalStorageByLength;
