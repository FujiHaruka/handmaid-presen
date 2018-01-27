import {compose, withHandlers} from 'recompose'
import {
  projectStore,
  mediaStore,
  slideStore,
  viewStore,
} from './stores'
import {MediaType} from './Consts'

const customActions = withHandlers({
  prepareNewSlide: ({appendSlide, addMedia, setEdittingSlide}) => async () => {
    const media = await addMedia({
      mediaType: MediaType.EDITTING,
      path: null,
    })
    const slide = await appendSlide({
      mediaId: media.id
    })
    setEdittingSlide(slide)
  }
})

export const connecStore = compose(
  projectStore,
  mediaStore,
  slideStore,
  viewStore,
  customActions,
)
