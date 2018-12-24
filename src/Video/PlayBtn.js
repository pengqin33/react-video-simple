import React from 'react'

const PlayBtn = ({handleClick}) => {
  return (
    <div className='play-btn-wrap' role='button' tabIndex={0} onKeyPress={() => {}} onClick={handleClick}>
      <img src={require('../assets/images/play_btn.png')} alt='播放'/>
    </div>
  )
}

export default PlayBtn
