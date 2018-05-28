import Regl from "regl"
import loop from "raf-loop"
import { FPS_I, MAX_MEDIA_INPUTS } from "common/constants"
import { fillScreen } from "utils"
import Model from "./model"
import SingleDraw from "./single"
import DoubleDraw from "./double"
import Streams from "./streams"

const REGL = (canvas, options) => {
  if (!Detector.isDesktop) return

  const regl = Regl({
    canvas: canvas,
    attributes: { stencil: true, preserveDrawingBuffer: true },
  })

  const textures = []
  let sources = []
  let drawMode = 0
  const streams = new Streams()

  Model.store.on("inputs", (inputs, prev) => {
    sources = inputs
    inputs.forEach((el, i) => {
      if (textures[i]) {
        textures[i].destroy()
      }
      textures[i] = createNewTexture(el)
    })
    drawMode = sources.length
  })

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
    })

  const drawSingle = SingleDraw(regl)
  const drawDouble = DoubleDraw(regl)

  function destroyTextures() {
    textures.forEach(tex => tex.destroy())
  }

  /*function createTextures(srcs) {
    sources = srcs.map(src => ({
      data: src,
      isReady: src.readyState >= 4,
    }))
    destroyTextures()
    textures = sources.map(src => createNewTexture(src))
    srcs.forEach((src, i) => {
      function _onload(e) {
        e.target.setAttribute("crossorigin", "anonymous")
        e.target.removeEventListener("loadeddata", _onload)
        sources[i].isReady = true
        if (
          sources.filter(({ isReady }) => isReady).length ===
          sources.length
        ) {
          raf.start()
        }
      }
      src.addEventListener("loadeddata", _onload)
    })
  }*/

  function addSource(src) {
    textures.push(createNewTexture(src))
  }

  function update() {
    for (var i = 0; i < textures.length; i++) {
      textures[i].subimage(sources[i])
    }
  }

  function draw() {
    regl.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: true,
      stencil: false,
    })
    update()

    if (drawMode === 1) {
      drawSingle({
        tex0: textures[0],
      })
    } else if (drawMode === 2) {
      drawDouble({
        tex0: textures[0],
        tex1: textures[1],
        tolerance: 0.5,
        slope: 0.2,
      })
    }
  }

  function read() {
    return regl.read(new Uint8Array(WIDTH * HEIGHT * 4))
  }

  function start() {}

  let _time = 0
  const raf = loop(function(tick) {
    let n = performance.now()
    if (n - _time >= FPS_I && textures.length > 0) {
      draw()
      _time = n
    }
  }).start()

  function resize() {
    fillScreen(canvas)
  }

  regl.clear({
    color: [0.1, 0.1, 0.1, 1],
    depth: true,
    stencil: false,
  })

  var v = streams.createCanvasStream(canvas)
  document.body.appendChild(v)
  v.addEventListener("loadeddata", e => {
    //textures.push(createNewTexture(v));
  })
  //console.log(streams.createCanvasStream(canvas));
  //textures.push(createNewTexture());

  return {
    drawSingle,
    model: Model,
    start,
    resize,
  }
}

export default REGL
