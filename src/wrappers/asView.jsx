import React from 'react'

function asView (Component) {
  class View extends React.Component {
    render () {
      // TODO some implement
      return <Component {...this.props} />
    }
  }
  return View
}

export default asView
