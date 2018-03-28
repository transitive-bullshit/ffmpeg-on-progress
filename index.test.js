'use strict'

// TODO: add test for case where ffmpeg can't calculate percent

const { test } = require('ava')
const tempy = require('tempy')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

const ffmpegOnProgress = require('.')

const fixturesPath = path.join(__dirname, `media`)
const input = path.join(fixturesPath, '1.mp4')

test('mp4 conversion', async (t) => {
  const onProgress = (progress, detail) => {
    t.truthy(progress >= 0)
    t.truthy(progress <= 1)
    t.truthy(detail)
    t.truthy(detail.frames >= 0)
    t.truthy(detail.percent >= 0)
    t.truthy(detail.percent <= 100)

    console.log(`progress ${(100 * progress).toFixed()}%`)
  }

  await new Promise((resolve, reject) => {
    const output = tempy.file({ extension: 'mp4' })

    ffmpeg(input)
      .outputOptions([
        '-hide_banner',
        '-map_metadata', '-1',
        '-map_chapters', '-1',
        '-c:v', 'libx264',
        '-profile:v', 'main',
        '-preset', 'veryslow',
        '-crf', '20',
        '-movflags', 'faststart',
        '-pix_fmt', 'yuv420p'
      ])
      .output(output)
      .on('progress', ffmpegOnProgress(onProgress, undefined))
      .on('start', (cmd) => console.log({ cmd }))
      .on('end', () => resolve())
      .on('error', (error, stdout, stderr) => {
        console.error({ stdout, stderr })
        reject(error)
      })
      .run()
  })

  t.pass()
})
