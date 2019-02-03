import React from 'react'
import Button from './button'

const imageUrl = album => (album.images.length > 0 ? album.images[0].url : null)

const EmptySong = () => (
  <Button
    imgSrc={null}
    label={null}
  />
)

const Song = (props) => (
  props.song ? <Button
    imgSrc={imageUrl(props.song.album)}
    label={props.song.name}
  /> : <EmptySong />
)

export default Song
