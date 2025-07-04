export function setStartedClassName(testValue) {
  return testValue <= 0 ? "not-started" : "";
}

export function setTrackingClassName(testValue) {
  return testValue < 0 ? "negative-tracking" : "positive-tracking";
}
