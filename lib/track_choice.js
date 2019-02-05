import React from 'react'
import { DropTarget } from 'react-dnd'
import Button from './button'

const imageUrl = album => (album.images.length > 0 ? album.images[0].url : null)

const EmptyTrack = () => (
  <Button
    imgSrc={null}
    label={null}
  />
)

const trackTarget = {
  drop (props, monitor) {
    console.log('dropped', monitor.getItem())
    props.chooseTrack(monitor.getItem().track)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

function TrackChoice(props) {
  return props.connectDropTarget(
    <div>
      {
        props.track ? <Button
          imgSrc={imageUrl(props.track.album)}
          label={props.track.name}
        /> : <EmptyTrack />
      }
    </div>
  )
}

export default DropTarget('track', trackTarget, collect)(TrackChoice)
