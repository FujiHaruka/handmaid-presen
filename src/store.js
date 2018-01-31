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
import {clone} from 'ramda'

const customActions = withHandlers({
  prepareNewSlide: ({appendSlide, addAsset, setEdittingSlideId}) => async () => {
    const slide = await appendSlide({
      assetId: null
    })
    setEdittingSlideId(slide.id)
  },
  prepareRecording: ({setViewPage, setVisibleHeader}) => async () => {
    setVisibleHeader(false)
    setViewPage(ViewPage.RECORDING_PAGE)
  },
  quitRecordingView: ({setViewPage, setVisibleHeader}) => async () => {
    setViewPage(ViewPage.ASSET_PAGE)
    setVisibleHeader(true)
  },
  selectAssetAsSlide: ({edittingSlide, updateSlide, setEdittingSlideId}) => async (asset = null) => {
    ok(edittingSlide)
    const slide = clone(edittingSlide)
    slide.assetId = asset ? asset.id : null
    slide.asset = asset
    updateSlide(slide.id, slide)
  },
  deleteEdittingSlide: ({slidesArray, deleteSlide, setEdittingSlideId, edittingSlide}) => async () => {
    const {id, index} = edittingSlide
    const nextEditting = slidesArray.find((slide) => slide.index === index + 1) || null
    setEdittingSlideId(nextEditting)
    await deleteSlide(id)
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
