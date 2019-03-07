'use strict'
const node = process.execPath

const clean = require('../clean-stacks.js')

if (module === require.main)
  require('../../lib/tap.js').pass('just the index')

module.exports = (...test) => {
  if (process.argv[2] === 'runtest') {
    // run the init function _before_ loading the root tap object
    if (test.length === 2) {
      test[0]()
      test[1](require('../../lib/tap.js'))
    } else
      test[0](require('../../lib/tap.js'))
  } else {
    const spawn = require('child_process').spawn
    const env = Object.keys(process.env).reduce((env, k) => {
      env[k] = env[k] || process.env[k]
      return env
    }, { TAP_BAIL: '0', TAP_BUFFER: '0' })
    const t = require('../../lib/tap.js')
    t.plan(3)
    const c = spawn(node, [process.argv[1], 'runtest'], { env: env })
    let out = ''
    c.stdout.on('data', c => out += c)
    let err = ''
    c.stderr.on('data', c => err += c)
    c.on('close', (code, signal) => {
      t.matchSnapshot({
        code: code,
        signal: signal
      }, 'exit status')
      t.matchSnapshot(clean(out), 'stdout')
      t.matchSnapshot(clean(err), 'stderr')
    })
  }
}