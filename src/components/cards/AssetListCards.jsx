import './AssetListCards.css'
import React from 'react'
import {pure} from 'recompose'
import AssetCard from './AssetCard'

const AssetListCards = ({
  assetList = [],
  prepareDeleteAsset,
  onSelect,
  thumbnailOnly,
}) => (
  <div className='AssetListCards'>
    {
      assetList.map((asset) =>
        <AssetCard
          onClick={onSelect && (() => onSelect(asset))}
          key={asset.id}
          {...{
            asset,
            prepareDeleteAsset,
            thumbnailOnly,
          }}
        />
      )
    }
  </div>
)

export default pure(AssetListCards)
