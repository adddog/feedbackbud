/* eslint-disable */
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

export const getActiveSequence = () => {
  if (window.getActiveSequence !== undefined) {
    return window.getActiveSequence()
  }

  return new Promise(reject => {
    reject("undefined")
  })
}

export const clamp = (val, min, max) =>
  Math.min(Math.max(val, min), max)
