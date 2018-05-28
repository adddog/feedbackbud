import Emitter from "common/emitter"
import { qs } from "utils"
import {
  MEDIA_TYPES,
  LOCAL_VIDEO_ID,
  createVideoElFromFile,
} from "common/constants"
import { M_INPUT_NEW } from "common/events"
import observable from "proxy-observable"

class MODEL {
  constructor(props) {
    this.store = observable({
      ...props,
      activeNumInputs: 0,
      inputs: [],
      activeVideoTypes: ["webcam", "canvas"],
    })

    Emitter.on(M_INPUT_NEW, obj => {
      const { type, index, files } = obj
      switch (type) {
        case MEDIA_TYPES.webcam: {
          this.addSourceEl(qs(`#${LOCAL_VIDEO_ID}`), index)
        }
      }
      // this.addSourceEl(createVideoElFromFile(obj.file[0]))
    })
  }

  addSourceEl(videoEl, index = -1) {
    const _self = this
    function _onload(e) {
      e.target.setAttribute("crossorigin", "anonymous")
      e.target.removeEventListener("loadeddata", _onload)
      const inputs = [..._self.store.inputs]
      if (index === -1) {
        index = inputs.length
      }
      inputs[index] = videoEl
      //!!
      _self.store.activeNumInputs = inputs.filter(el => !!el).length

      _self.store.inputs = inputs
    }
    if(videoEl.readyState < 4){
      videoEl.addEventListener("loadeddata", _onload)
    }else{
      _onload({
        target: videoEl
      })
    }
  }
}

module.exports = new MODEL()
