import { SET_TOOLTIP, CLEAR_TOOLTIP } from "../constants/redux";

export const setTooltip = (tooltip) => ({
  type: SET_TOOLTIP,
  tooltip,
});

export const clearTooltip = (id) => ({
  type: CLEAR_TOOLTIP,
  id,
});
