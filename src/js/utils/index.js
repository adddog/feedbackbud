import { cover, contain } from "intrinsic-scale";

export const qs = (string, el = document) => el.querySelector(string);
export const qsAll = (string, el = document) =>
  el.querySelectorAll(string);

export const fillScreen = (
  el,
  options = { w: 640, h: 480, cover: true }
) => {
  const { w, h } = options;
  let { width, height, x, y } = options.cover
    ? cover(window.innerWidth, window.innerHeight, w, h)
    : contain(window.innerWidth, window.innerHeight, w, h);
  const scale = Math.max(width / w, height / h);
  el.style.transform = `scale3d(${scale},${scale},1) translate3d(0, 0, 0)`;
  el.style.webkitTransform = `scale3d(${scale},${scale},1) translate3d(0,0, 0)`;
  el.style.top = `${y / 2}px`;
  el.style.left = `${x / 2}px`;
};
