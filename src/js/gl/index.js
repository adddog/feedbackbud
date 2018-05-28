import Regl from "regl";
import loop from "raf-loop";
import { fillScreen } from "utils";
import Model from "./model";
import SingleDraw from "./single";
import DoubleDraw from "./double";
import Streams from "./streams";

const REGL = (canvas, options) => {
  if (!Detector.isDesktop) return;

  let fps = 60;

  const regl = Regl({
    canvas: canvas,
    attributes: { stencil: true, preserveDrawingBuffer: true },
  });

  let textures = []

  let sources = [];
  const streams = new Streams();

  const createNewTexture = src =>
    regl.texture({
      format: "rgba",
      width: options.width,
      height: options.height,
      type: "uint8",
      mag: "nearest",
      min: "nearest",
      wrapS: "clamp",
      wrapT: "clamp",
      data: src,
    });

  const drawSingle = props => {
    return SingleDraw(regl, props);
  };

  const drawDouble = props => {
    return DoubleDraw(regl, props);
  };

  function destroyTextures() {
    textures.forEach(tex => tex.destroy());
  }

  function createTextures(srcs) {
    sources = srcs.map(src => ({
      data: src,
      isReady: src.readyState >= 4,
    }));
    destroyTextures();
    textures = sources.map(src => createNewTexture(src));
    srcs.forEach((src, i) => {
      function _onload(e) {
        e.target.setAttribute("crossorigin", "anonymous");
        e.target.removeEventListener("loadeddata", _onload);
        sources[i].isReady = true;
        if (
          sources.filter(({ isReady }) => isReady).length ===
          sources.length
        ) {
          raf.start();
        }
      }
      src.addEventListener("loadeddata", _onload);
    });
  }

  function update() {
    for (var i = 0; i < textures.length; i++) {
      textures[i].subimage(sources[i]);
    }
  }

  function draw() {
    regl.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: true,
      stencil: false,
    });
    update();
    drawSingle({
      tex0: textures[0],
    });
   /* drawDouble({
      tex0: textures[0],
      tex1: textures[1],
      tolerance: 0.2,
      slope: 0.8,
    });*/
  }

  function read() {
    return regl.read(new Uint8Array(WIDTH * HEIGHT * 4));
  }

  function start() {}

  let _time = 0;
  const raf = loop(function(tick) {
    let n = performance.now();
    if (n - _time >= fps) {
      draw();
      _time = n;
    }
  });

  function resize() {
    fillScreen(canvas);
  }

  regl.clear({
    color: [0.1, 0.1, 0.1, 1],
    depth: true,
    stencil: false,
  });

  var v = streams.createCanvasStream(canvas);
  document.body.appendChild(v)
  v.addEventListener("loadeddata", e => {
    //textures.push(createNewTexture(v));
  });
  //console.log(streams.createCanvasStream(canvas));
  //textures.push(createNewTexture());

  return {
    createTextures,
    drawSingle,
    start,
    resize,
  };
};

export default REGL;
