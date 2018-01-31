import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'
import {
  ViewPage,
  AssetPageTab,
} from '../Consts'
import {ok} from '../helpers/nodejs'

class ViewStore {
  static initial (props) {
    return {
      viewPage: ViewPage.EDIT_PAGE,
      assetTabKey: AssetPageTab.VIDEO,
      visibleAssetDeletingModal: false,
      visibleHeader: true,
      deletingAsset: null,
      savingPaintVideo: false,
      presenIndex: 0,
      isPresenStartedPlaying: false,
      isPresenPlaying: false,
    }
  }

  static computed (props) {
    const {slidesArray} = props // From slideStore
    const {presenIndex} = props
    const presentingSlide = slidesArray[presenIndex]
    const isPresenFinished = slidesArray.length === presenIndex
    return {
      isPresenFinished,
      presentingSlide,
    }
  }

  static updaters = {
    setViewPage: updaterOf('viewPage'),
    setAssetTabKey: updaterOf('assetTabKey'),
    setVisibleAssetDeletingModal: updaterOf('visibleAssetDeletingModal'),
    setVisibleHeader: updaterOf('visibleHeader'),
    setDeletingAsset: updaterOf('deletingAsset'),
    setSavingPaintVideo: updaterOf('savingPaintVideo'),
    countupPresenIndex: ({presenIndex}) => () => ({presenIndex: presenIndex + 1}),
    setPresenIndex: updaterOf('presenIndex'),
    toggleIsPresenPlaying: updaterOf('isPresenPlaying'),
    toggleIsPresenStartedPlaying: updaterOf('isPresenStartedPlaying')
  }

  static actions = {
    prepareDeleteAsset: ({setVisibleAssetDeletingModal, setDeletingAsset}) => (asset) => {
      ok(asset.id)
      setDeletingAsset(asset)
      setVisibleAssetDeletingModal(true)
    },
    resetPresen: ({setPresenIndex, toggleIsPresenPlaying, toggleIsPresenStartedPlaying}) => () => {
      toggleIsPresenPlaying(false)
      toggleIsPresenStartedPlaying(false)
      setPresenIndex(0)
    }
  }
}

export default asStore(ViewStore)
