import {compose, withHandlers} from 'recompose'
import {
  projectStore,
  assetStore,
  slideStore,
  viewStore,
} from './stores'

const {ok} = window.require('assert')

const customActions = withHandlers({
  prepareNewSlide: ({appendSlide, addAsset, setEdittingSlide}) => async () => {
    const slide = await appendSlide({
      assetId: null
    })
    setEdittingSlide(slide)
  },
  commitDeletingAsset: ({deletingAsset, setDeletingAsset, deleteAsset, setVisibleAssetDeletingModal}) => async () => {
    const {id} = deletingAsset
    ok(id)
    await deleteAsset(id)
    setDeletingAsset(null)
    setVisibleAssetDeletingModal(false)
  }
})

export const connecStore = compose(
  projectStore,
  assetStore,
  slideStore,
  viewStore,
  customActions,
)
