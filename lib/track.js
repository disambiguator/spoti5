import React from 'react'
import Button from './button'

const imageUrl = album => (album.images.length > 0 ? album.images[0].url : null)

const EmptyTrack = () => (
  <Button
    imgSrc={null}
    label={null}
  />
)

const Track = (props) => (
  props.track ? <Button
    imgSrc={imageUrl(props.track.album)}
    label={props.track.name}
  /> : <EmptyTrack />
)

export default Track
