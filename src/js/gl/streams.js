import CONFIG from "common/config";
export default class Streams {
  constructor(options) {
    this._canvasStreams = new Map();
  }

  createCanvasStream(
    el,
    options = {
      fps: CONFIG.fps,
      width: CONFIG.width,
      height: CONFIG.height,
    }
  ) {
    const stream = el.captureStream(options.fps);
    this._canvasStreams.set(el, stream);
    const v = document.createElement("video");
    v.setAttribute("autoplay", "true")
    v.setAttribute("crossorigin", "anonymous")
    v.width = options.width || CONFIG.width;
    v.height = options.height || CONFIG.height;
    v.srcObject = stream;
    return v;
  }
}
