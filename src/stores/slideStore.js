import {updaterOf, syncFromDb} from '../helpers'
import {asStore} from '../wrappers'
import {Slide} from '../models'
import {map} from 'ramda'

class SlideStore {
  static initial (props) {
    return {
      slidesRaw: {}
    }
  }

  static computed (props) {
    const {slidesRaw, assets} = props
    const slides = map((slide) => ({
      ...slide,
      asset: assets[slide.assetId] || null
    }))(slidesRaw)
    const slidesArray = Object.keys(slides)
      .map((id) => slides[id])
      .sort((a, b) => a.index - b.index)
    return {
      slidesArray
    }
  }

  static updaters = {
    setSlidesRaw: updaterOf('slidesRaw')
  }

  static actions = {
    syncSlide: ({setSlidesRaw}) => async () => {
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    },
    appendSlide: ({slides, setSlidesRaw, slidesArray}) => async (slide) => {
      const index = slidesArray.length
      const creating = {
        index,
        ...slide
      }
      const created = await Slide.create(creating)
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
      return created
    },
    insertSlide: ({setSlidesRaw, slidesArray}) => async (slide, index) => {
      if (index > slidesArray.length) {
        throw new Error(`Index ${index} is out of range`)
      }
      slide.index = index
      const created = await Slide.create(slide)
      const slides = slidesArray
        .map((slide) => ({
          index: slide.index < index ? slide.index : slide.index + 1,
          ...slide
        }))
        .map((slide) => ({[slide.id]: slide}))
        .reduce((slides, slideObj) => Object.assign(slides, slideObj), {
          [slide.id]: created
        })
      await Slide.update(slides)
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    },
    deleteSlideAt: ({setSlidesRaw, slides, slidesArray}) => async (index) => {
      if (index > slidesArray.length) {
        throw new Error(`Index ${index} is out of range`)
      }
      const slide = slidesArray[index]
      await Slide.delete(slide.id)
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    }
  }
}

export default asStore(SlideStore)
