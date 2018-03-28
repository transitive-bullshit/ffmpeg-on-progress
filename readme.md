# ffmpeg-on-progress

> Utility for robustly reporting ffmpeg command progress with fluent-ffmpeg.

[![NPM](https://img.shields.io/npm/v/ffmpeg-on-progress.svg)](https://www.npmjs.com/package/ffmpeg-on-progress) [![Build Status](https://travis-ci.org/transitive-bullshit/ffmpeg-on-progress.svg?branch=master)](https://travis-ci.org/transitive-bullshit/ffmpeg-on-progress) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Some ffmpeg commands aren't capable fo producing [progress](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#progress-transcoding-progress-information) events, such as when the input is a stream or when using multiple inputs. This simple utility allows you to accurately report progress in these cases by looking at the number of frames ffmpeg has processed with the caveat that you need to know the expected output's duration ahead of time.

In cases where [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) produces a valid progress event, this module is a noop.

## Install

```bash
npm install --save ffmpeg-on-progress
# or
yarn add ffmpeg-on-progress
```

## Usage

```js
const ffmpeg = require('fluent-ffmpeg')
const ffmpegOnProgress = require('ffmpeg-on-progress')

const logProgress = (progress, event) => {
  // progress is a floating point number from 0 to 1
  console.log('progress', (progress * 100).toFixed())
}

// estimated duration of output in milliseconds
const durationEstimate = 4000

const cmd = ffmpeg('input.avi')
  .output('output.mp4')
  .on('progress', ffmpegOnProgress(logProgress, durationEstimate))
  .run()
```

## Related

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
