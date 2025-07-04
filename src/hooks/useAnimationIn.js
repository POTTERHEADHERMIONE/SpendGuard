import { useEffect } from "react";

function useAnimationIn(callback) {
  useEffect(() => {
    setTimeout(() => callback(), 5);
  }, [callback]);
}

export default useAnimationIn;
