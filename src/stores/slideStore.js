import {updaterOf, syncFromDb} from '../helpers'
import {asStore} from '../wrappers'
import {Slide} from '../models'

class SlideStore {
  static initial (props) {
    return {
      slides: {}
    }
  }

  static computed (props) {
    const {slides} = props
    const slidesArray = Object.keys(slides)
      .map((id) => slides[id])
      .sort((a, b) => a.index - b.index)
    return {
      slidesArray
    }
  }

  static updaters = {
    setSlides: updaterOf('slides')
  }

  static actions = {
    syncMedia: ({setSlides}) => async () => {
      await syncFromDb({
        set: setSlides,
        db: Slide
      })
    },
    appendSlide: ({slides, setSlides, slidesArray}) => async (slide) => {
      const index = slidesArray.length
      const creating = {
        index,
        ...slide
      }
      await Slide.create(creating)
      await syncFromDb({
        set: setSlides,
        db: Slide
      })
    },
    insertSlide: ({setSlides, slidesArray}) => async (slide, index) => {
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
        set: setSlides,
        db: Slide
      })
    },
    deleteSlideAt: ({setSlides, slides, slidesArray}) => async (index) => {
      if (index > slidesArray.length) {
        throw new Error(`Index ${index} is out of range`)
      }
      const slide = slidesArray[index]
      await Slide.delete(slide.id)
      await syncFromDb({
        set: setSlides,
        db: Slide
      })
    }
  }
}

export default asStore(SlideStore)
