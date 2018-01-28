import './AssetPhotoCards.css'
import React from 'react'
import {pure} from 'recompose'
import {Card} from 'antd'

const {nativeImage} = window.require('electron')
const {join} = window.require('path')

const AssetPhotoCard = pure(
  ({
    id,
    path,
  }) => {
    // TODO もっといい方法はない？
    const image = nativeImage.createFromPath(join(window.globals.projectDir, path))
    const width = 320
    const height = 180
    const dataUrl = image.resize({
      width,
      height,
      quelity: 'good'
    }).toDataURL()
    return (
      <Card
        className='AssetPhotoCard'
        hoverable
        cover={<img {...{width, height}} src={dataUrl} />}
      />
    )
  }
)

const AssetPhotoCards = ({
  assetPhotos = [],
}) => (
  <div className='AssetPhotoCards'>
    {
      assetPhotos.map((photo) => <AssetPhotoCard key={photo.id} {...photo} />)
    }
  </div>
)

export default pure(AssetPhotoCards)
