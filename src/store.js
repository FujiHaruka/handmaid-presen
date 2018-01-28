import {compose, withHandlers} from 'recompose'
import {
  projectStore,
  assetStore,
  slideStore,
  viewStore,
} from './stores'

const customActions = withHandlers({
  prepareNewSlide: ({appendSlide, addAsset, setEdittingSlide}) => async () => {
    const slide = await appendSlide({
      assetId: null
    })
    setEdittingSlide(slide)
  }
})

export const connecStore = compose(
  projectStore,
  assetStore,
  slideStore,
  viewStore,
  customActions,
)
