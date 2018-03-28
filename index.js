'use strict'

const timeFormat = require('hh-mm-ss')

module.exports = (onProgress, durationMs) => {
  return (event) => {
    let progress = 0

    try {
      const timestamp = timeFormat.toMs(event.timemark)
      progress = timestamp / durationMs
    } catch (err) { }

    if (isNaN(progress) && !isNaN(event.percent)) {
      progress = event.percent / 100
    }

    if (!isNaN(progress)) {
      progress = Math.max(0, Math.min(1, progress))
      onProgress(progress, event)
    }
  }
}
