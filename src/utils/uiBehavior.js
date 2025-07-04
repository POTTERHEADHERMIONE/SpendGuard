function scrollToY(top) {
  window.scrollTo({ top, behavior: "smooth" });
}

export function scrollToTop() {
  scrollToY(0);
}

export function scrollToEl(id) {
  const el = document.getElementById(id);

  scrollToY(el.offsetTop);
}

export function jumpToTop() {
  window.scrollTo(0, 0);
}

export function delay(callback) {
  setTimeout(callback, 1);
}

export function disableScroll() {
  document.body.classList.add("no-scroll");
}

export function enableScroll() {
  document.body.classList.remove("no-scroll");
}

export function getBodyOffsetY() {
  return document.body.getBoundingClientRect().top;
}
