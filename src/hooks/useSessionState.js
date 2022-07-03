import { useState } from "react";

export const useSessionState = (key, initialValue) => {
  const [stateValue, setStateValue] = useState(() => {
    let savedValue = window.sessionStorage.getItem(key);
    if (!savedValue) {
      window.sessionStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } else {
      return JSON.parse(savedValue);
    }
  });

  const setValue = (newValue) => {
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
    setStateValue(newValue);
  };

  return [stateValue, setValue];
};

export default useSessionState;
