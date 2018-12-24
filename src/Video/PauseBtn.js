import React from 'react'

const PauseBtn = ({handleClick}) => {
  return (
    <div className='play-btn-wrap' role='button' tabIndex={0} onKeyPress={() => {}} onClick={handleClick}>
      <img src={require('../assets/images/pause_btn.png')} alt='暂停' />
    </div>
  )
}

export default PauseBtn
