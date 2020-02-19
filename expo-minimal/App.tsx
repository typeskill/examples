import React from 'react'
import { YellowBox } from 'react-native'
import { Editor } from './src/Editor'

declare const global: any

YellowBox.ignoreWarnings(['Icon'])

// @see: https://github.com/facebook/react-native/issues/9599
if (typeof (global as any).self === 'undefined') {
  ;(global as any).self = global
}

const App = () => <Editor />

export default App
