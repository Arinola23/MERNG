import React from 'react'
import { Popup } from 'semantic-ui-react'

const MyPopup = ({content, children}) => {
  return (
    <div>
      <Popup inverted content={content} trigger={children}/>
    </div>
  )
}

export default MyPopup
