import Mask from './Mask'
import React from 'react'
import PauseBtn from './PauseBtn'
import PlayBtn from './PlayBtn'
import PropTypes from 'prop-types'

const MaskWrap = ({ fullscreenBtn, pauseBtn, autoPlay, size, connectionType, isFullScreen, showingControlBtn, playing, togglePlay, toggleFullScreen, toggleShowingControlBtn, handleClickReload }) => {
  if (window.location.search === '?test=true') {
    window.Connection = {
      WIFI: 'wifi',
      NONE: 'none'
    }
  }
  if (connectionType && window.Connection && (connectionType === Connection.NONE || connectionType === Connection.ETHERNET) && !playing) {
    return (
      <Mask isFullScreen={isFullScreen}>
        <div className='hint-wrap'>
          <p>视频加载失败，请稍后重试</p>
          <div role='button'
               tabIndex={0}
               className='btn-primary'
               onKeyPress={() => {
               }} onClick={() => handleClickReload()}>
            <img src={require('../assets/images/retry_btn.png')} alt='重试' />
            点击重试
          </div>
        </div>
      </Mask>
    )
  } else if (connectionType && window.Connection && connectionType !== Connection.WIFI && !playing) {
    return (
      <Mask isFullScreen={isFullScreen}>
        <div className='hint-wrap'>
           <p>非WiFi状态下使用，播放该视频将消耗{size || '部分'}流量</p>
          <div role='button'
               tabIndex={0}
               className='btn-primary'
               onKeyPress={() => {
               }}
               onClick={() => togglePlay()}>
            继续播放
          </div>
        </div>
      </Mask>
    )
  } else if ((connectionType && window.Connection && connectionType === Connection.WIFI) || playing) {
    const PlayOrPauseBtn = pauseBtn && showingControlBtn ? (playing ? <PauseBtn handleClick={togglePlay}/> :
      <PlayBtn handleClick={togglePlay}/>) : null

    /* 支持全屏 + 显示控制按钮 + (播放中 或者 全屏中) 显示全屏按钮 */
    const FullScreenBtn = fullscreenBtn && showingControlBtn && (playing || isFullScreen) ? (isFullScreen ?
      <span role='button'
            onKeyPress={() => {
            }} tabIndex={0}
            className='left-back-btn'
            onClick={toggleFullScreen}>
        <img src={require('../assets/images/left_back.png')}
             alt='返回'/>
      </span> :
      <span role='button'
            onKeyPress={() => {
            }} tabIndex={0}
            className='fullscreen-btn'
            onClick={toggleFullScreen}>
        <img src={require('../assets/images/fullscreen_btn.png')}
             alt='全屏'/>
      </span>) : null
    return (
      <Mask isFullScreen={isFullScreen} handleClick={toggleShowingControlBtn} showing={showingControlBtn}>
        {PlayOrPauseBtn}
        {FullScreenBtn}
      </Mask>
    )
  }
  return null
}

MaskWrap.propTypes = {
  fullscreenBtn: PropTypes.bool,
  pauseBtn: PropTypes.bool,
  autoPlay: PropTypes.bool,
  size: PropTypes.string,
  connectionType: PropTypes.string,
  isFullScreen: PropTypes.bool,
  showingControlBtn: PropTypes.bool,
  playing: PropTypes.bool,
  togglePlay: PropTypes.func,
  toggleFullScreen: PropTypes.func,
  toggleShowingControlBtn: PropTypes.func
}

export default MaskWrap
