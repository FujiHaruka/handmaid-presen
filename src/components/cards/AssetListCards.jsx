import './AssetListCards.css'
import React from 'react'
import {pure} from 'recompose'
import AssetCard from './AssetCard'

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
