import React from 'react'
import PropTypes from 'prop-types'

const Mask = ({ isFullScreen, children, showing, handleClick }) => {
  return (
    <div className={isFullScreen ? 'fullscreen video-mask' : 'video-mask'}
         role='button'
         tabIndex='-1'
         onKeyPress={() => {
         }}
         onClick={typeof handleClick === 'function' ? () => handleClick() : null}>
      {children}
    </div>
  )
}

Mask.propTypes = {
  isFullScreen: PropTypes.bool,
  children: PropTypes.element,
  showing: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Mask
