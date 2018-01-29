import {compose, withHandlers} from 'recompose'
import {
  projectStore,
  assetStore,
  slideStore,
  viewStore,
  paintStore,
} from './stores'
import {ViewPage} from './Consts'
import {ok} from './helpers/nodejs'
import {message} from 'antd'

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
    try {
      await deleteAsset(id)
      message.success(`Asset deleted.`)
    } catch (e) {
      message.error(`Failed to delete asset "${id}".`)
      console.error(e)
    }
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
