import { pipeToNodeWritable } from 'react-server-dom-webpack/writer.node.server'

import React from 'react'
import App from '../components/NewApp.server'

let moduleMap
const componentRegex = /components\/.+\.js/

async function renderReactTree(props, res, moduleMap_) {
  if (!moduleMap) {
    const manifest = {}

    // We need to remap the filepaths in the manifest
    // because they have different working directory
    // inside the function.
    for (let key in moduleMap_) {
      const componentPath = key.match(componentRegex)[0]
      manifest[componentPath] = moduleMap_[key]
    }
    moduleMap = new Proxy(manifest, {
      get: function (target, prop) {
        const componentPath = prop.match(componentRegex)[0]
        return target[componentPath]
      },
    })
  }

  pipeToNodeWritable(React.createElement(App, props), res, moduleMap)
}

module.exports = async (req, res, redirectToId, moduleMap) => {
  console.time('react render')
  res.on('close', () => console.timeEnd('react render'))

  renderReactTree(
    {
      answer: req.answer != null? req.answer: '',
    },
    res,
    moduleMap
  )
}
