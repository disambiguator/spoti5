import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import App from '../lib/game'

export default () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <App />
  </DragDropContextProvider>
)
