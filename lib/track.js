import React from 'react'
import Button from './button'
import { DragSource } from 'react-dnd'

const imageUrl = album => (album.images.length > 0 ? album.images[0].url : null)

const trackSource = {
  beginDrag (props) {
    return { track: props.track }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function Track (props) {
  return props.connectDragSource(
    <div>
      <Button
        imgSrc={imageUrl(props.track.album)}
        label={props.track.name}
      />
    </div>
  )
}

export default DragSource('track', trackSource, collect)(Track)
