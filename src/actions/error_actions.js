import { SET_ERROR, CLEAR_ERROR } from "../constants/redux";

export const setError = ({ error, location, debug }) => ({
  type: SET_ERROR,
  debug: debug.message,
  error,
  location,
});

export const dispatchError = (dispatch, error) => {
  dispatch(setError(error));
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export function chainPromise(dispatch, promise, callbacks, errorObj = null) {
  return callbacks
    .reduce((chained, cb) => chained.then(cb), promise())
    .catch((err) => {
      if (errorObj) {
        errorObj.debug = err;
        dispatchError(dispatch, errorObj);
      }
    });
}
