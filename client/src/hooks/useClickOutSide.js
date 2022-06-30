import { useEffect } from "react";

function useClickOutSide(ref, fun) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current === null) return;
      if (ref.current.contains(e.target)) {
        return;
      }
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}

export default useClickOutSide;
