import './AssetListCards.css'
import React from 'react'
import {pure} from 'recompose'
import {Card, Icon} from 'antd'
import {Ports} from '../Consts'

const CARD_WIDTH = 320
const CARD_HEIGHT = 180

const AssetCard = pure(
  ({
    asset,
    prepareDeleteAsset,
  }) => {
    const {path} = asset
    const url = `http://localhost:${Ports.ASSETS_SERVER_PORT}/${path}`
    return (
      <Card
        className='AssetCard'
        cover={
          <div className='AssetCard-cover'>
            <img className='AssetCard-img' width={CARD_WIDTH} height={CARD_HEIGHT} src={url} />
            <Icon className='AssetCard-delete' type='close' onClick={() => prepareDeleteAsset(asset)} />
          </div>
        }
      />
    )
  }
)

const AssetListCards = ({
  assetList = [],
  prepareDeleteAsset = () => {},
}) => (
  <div className='AssetListCards'>
    {
      assetList.map((asset) =>
        <AssetCard
          key={asset.id}
          asset={asset}
          prepareDeleteAsset={prepareDeleteAsset}
        />
      )
    }
  </div>
)

export default pure(AssetListCards)
