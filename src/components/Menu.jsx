import React from 'react'
import {Menu as AntMenu} from 'antd'
import {pure} from 'recompose'
import {ViewPage} from '../Consts'

const {Item} = AntMenu

function Menu ({
  viewPage,
  setViewPage,
}) {
  return (
    <AntMenu
      mode='horizontal'
      selectedKeys={[viewPage]}
      onClick={(e) => setViewPage(e.key)}
      style={{marginBottom: '8px'}}
    >
      <Item key={ViewPage.EDIT_PAGE}>
        Edit
      </Item>
      <Item key={ViewPage.PRESENTATION_PAGE}>
        Presentation
      </Item>
      <Item key={ViewPage.SETTINGS_PAGE}>
        Settings
      </Item>
    </AntMenu>
  )
}

export default pure(Menu)
