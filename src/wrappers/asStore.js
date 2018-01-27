import {withPropsOnChange, withStateHandlers, withHandlers, compose} from 'recompose'

const assertStore = (store) => {
  const ok = ['initial', 'computed', 'updaters', 'actions']
    .every((name) => name in store)
  if (!ok) {
    throw new Error(`Store assertion failed: ${store}`)
  }
}

const asStore = (Store) => {
  assertStore(Store)
  return compose(
    withStateHandlers(
      Store.initial,
      Store.updaters
    ),
    withPropsOnChange(
      Object.keys(Store.initial()),
      Store.computed
    ),
    withHandlers(
      Store.actions
    )
  )
}
export default asStore
