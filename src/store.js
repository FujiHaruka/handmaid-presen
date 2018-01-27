import {compose, withHandlers} from 'recompose'
import {
  projectStore,
  mediaStore,
  slideStore,
  viewStore,
} from './stores'

const customActions = withHandlers({
  prepareNewSlide: ({appendSlide, addMedia, setEdittingSlide}) => async () => {
    const slide = await appendSlide({
      mediaId: null
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
