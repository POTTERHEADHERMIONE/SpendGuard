import { useEffect } from "react";
import { jumpToTop } from "../utils/uiBehavior";

function useJumpToTop(deps = []) {
  useEffect(() => {
    jumpToTop();
    // eslint-disable-next-line
  }, deps);
}

export default useJumpToTop;
