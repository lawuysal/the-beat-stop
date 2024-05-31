import { useEffect } from "react";

export function useKeyboardKey(key, callback) {
  useEffect(
    function () {
      const eventListenerCallback = (e) => {
        if (e.code === key) {
          callback();
        }
      };

      document.addEventListener("keydown", eventListenerCallback);

      return () =>
        document.removeEventListener("keydown", eventListenerCallback);
    },
    [callback, key]
  );
}
