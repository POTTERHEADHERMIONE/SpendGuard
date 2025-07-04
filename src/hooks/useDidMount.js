import { useEffect, useRef } from "react";

function useDidMount(callback, deps = []) {
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!firstLoad.current && typeof callback === "function") {
      callback();
    }

    firstLoad.current = false;
    // eslint-disable-next-line
  }, deps);

  return firstLoad;
}

export default useDidMount;
