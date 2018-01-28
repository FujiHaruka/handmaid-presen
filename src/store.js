import {compose, withHandlers} from 'recompose'
import {
  projectStore,
  assetStore,
  slideStore,
  viewStore,
  paintStore,
} from './stores'
import {ViewPage} from './Consts'

const {ok} = window.require('assert')

const customActions = withHandlers({
  prepareNewSlide: ({appendSlide, addAsset, setEdittingSlide}) => async () => {
    const slide = await appendSlide({
      assetId: null
    })
    setEdittingSlide(slide)
  },
  prepareRecording: ({setViewPage, setVisibleHeader}) => async () => {
    setVisibleHeader(false)
    setViewPage(ViewPage.RECORDING_PAGE)
  },
  quitRecordingView: ({setViewPage, setVisibleHeader}) => async () => {
    setViewPage(ViewPage.ASSET_PAGE)
    setVisibleHeader(true)
  },
  commitDeletingAsset: ({deletingAsset, setDeletingAsset, deleteAsset, setVisibleAssetDeletingModal}) => async () => {
    const {id} = deletingAsset
    ok(id)
    await deleteAsset(id)
    setDeletingAsset(null)
    setVisibleAssetDeletingModal(false)
  },
})

export const connecStore = compose(
  projectStore,
  assetStore,
  slideStore,
  viewStore,
  customActions,
  paintStore,
)
