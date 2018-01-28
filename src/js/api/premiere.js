import "whatwg-fetch"
import { isEmpty, isUndefined, isNil, isObject } from "lodash"

const JsonApiRequest = (url, options = {}) => {
  const query = isEmpty(options.query) ? "" : ``
  const fetchOptions = Object.assign(
    {},
    { method: "GET", ...options }
  )
  return fetch(`${url}${query}`, fetchOptions)
    .then(function(response) {
      if (response.status >= 400) {
        return new Error("Bad response from server")
      }
      return response.text()
    })
    .then(data => (isObject(data) ? data : JSON.parse(data)))
    .catch(err => {
      return { response: err }
    })
}

const functionUndefined = name => {
  return new Promise(reject => {
    reject(new Error(`${name} undefined`))
  })
}

export const onLoaded = () => {
  if (window.onLoaded !== undefined) {
    return window.onLoaded()
  }

  return functionUndefined("onLoaded")
}

class Premiere {
  getProjectSequences() {
    return evalScriptJSON(`$._PPP_.getSequences()`)
  }

  getMetadata(data, isSequence) {
    if (process.env.DEV) {
      return JsonApiRequest(data.name)
    } else {
      return window.getFileMetadata(JSON.stringify(data), isSequence)
    }
  }

  getProjectChildren() {
    if (process.env.DEV) {
      return Promise.resolve({
        rootItems: [

          ...[
            {
              name: "data/raw-speech-data.json",
              treePath: "some_path",
            },
          ],
        ],
        sequences: [

          ...[
            {
              name: "data/transcriptive-data.json",
              treePath: "some_path",
            },
          ],
        ],
      })
    } else {
      return window.getTree()
    }
  }

  openFileInSourceMonitor(payload) {
    if (process.env.DEV) {
    } else {
      const { treePath, startTime } = payload
      return window.openInSourceMonitor(treePath, startTime)
    }
  }
}
export default new Premiere()
