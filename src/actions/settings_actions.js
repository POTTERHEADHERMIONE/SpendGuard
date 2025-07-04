import { getSettings, updateSettings } from "../utils/comms";
import { chainPromise } from "./error_actions";
import { SET_SETTINGS } from "../constants/redux";

export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  settings,
});

export function fetchSettings() {
  return (dispatch) => {
    return chainPromise(
      dispatch,
      getSettings,
      [(settings) => dispatch(setSettings(settings))],
      { error: "Could not fetch settings.", location: "fetchSettings()" }
    );
  };
}

export function patchSettings(settings) {
  return (dispatch) => {
    return chainPromise(
      dispatch,
      () => updateSettings(settings),
      [(settings) => dispatch(setSettings(settings))],
      { error: "Could not update settings,", location: "patchSettings()" }
    );
  };
}
