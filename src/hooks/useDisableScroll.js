import { useEffect } from "react";
import { disableScroll, enableScroll } from "../utils/uiBehavior";

function useDisableScroll(autoEnable = false) {
  useEffect(() => {
    disableScroll();

    return autoEnable ? enableScroll : undefined;
  }, [autoEnable]);
}

export default useDisableScroll;
