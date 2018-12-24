import React, { Component } from 'react';
import framework from '../framework'
import network from '../utils/network'
import MaskWrap from './MaskWrap'
import PropTypes from 'prop-types'

import './Video.css'

class Video extends Component {
  static defaultProps = {
    loop: false,
    autoPlay: false,
    fullscreenBtn: false,
    pauseBtn: true
  }

  constructor (props) {
    super(props)
    this.videoRef = React.createRef()
    this.state = {
      showingControlBtn: false,
      playing: false,
      isFullScreen: false,
      connectionType: ''
    }
  }

  /* 视频结束事件 */
  handleVideoEnd = () => {
    this.setState({
      playing: false
    })
  }

  /* video事件绑定 */
  bindEventForVideo = () => {
    const videoEle = document.getElementById('rs-video')
    if (videoEle) {
      videoEle.addEventListener('ended', this.handleVideoEnd, false)
    }
  }

  /* 上线、离线处理 */
  handleOnOffline = () => {
    this.setState({
      connectionType: navigator.connection.type
    })
    if (navigator.connection.type === Connection.WIFI) {
      this.play()
    } else {
      this.pause()
    }
  }

  async componentDidMount () {
    await framework.init()
    network.init(() => {
        this.handleOnOffline()
      },
      () => {
        this.handleOnOffline()
      })
    if (this.props.autoPlay) {
      this.setState({
        connectionType: navigator.connection.type,
        showingControlBtn: false,
        playing: true
      })
    } else {
      this.setState({
        connectionType: navigator.connection.type
      })
    }

    /* 视频事件绑定 */
    this.bindEventForVideo()
  }

  /* 播放暂停 */
  togglePlay = () => {
    try {
      const videoEl = this.videoRef.current
      this.setState({
        playing: !this.state.playing
      })
      if (videoEl.paused) {
        videoEl.play()
      } else {
        videoEl.pause()
      }
    } catch (error) {
      console.log(`togglePlay error: ${JSON.stringify(error)}`)
    }
  }

  /* 播放 */
  play = () => {
    try {
      const videoEl = this.videoRef.current
      this.setState({
        playing: true
      })
      videoEl.play()
    } catch (error) {
      console.log(`play error: ${JSON.stringify(error)}`)
    }
  }

  /* 暂停 */
  pause = () => {
    try {
      const videoEl = this.videoRef.current
      this.setState({
        playing: false
      })
      videoEl.pause()
    } catch (error) {
      console.log(`pause error: ${JSON.stringify(error)}`)
    }
  }

  /* 重新加载 */
  handleReload = () => {
    try {
      const videoEl = this.videoRef.current
      videoEl.play()
    } catch (error) {
      console.log(`pause error: ${JSON.stringify(error)}`)
    }
  }

  /* 是否显示功能按钮 */
  toggleShowingControlBtn = () => {
    const currentState = this.state.showingControlBtn

    this.setState({
      showingControlBtn: !currentState
    })

    if (!currentState) {
      setTimeout(() => {
        console.log('timeout')
        this.setState({
          showingControlBtn: false
        })
      }, 3000)
    }
  }

  /* 切换全屏 */
  toggleFullScreen = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }

  render () {
    console.log(navigator.connection)
    const { src, poster, loop, autoPlay, size, fullscreenBtn, pauseBtn } = this.props
    const { showingControlBtn, playing, isFullScreen, connectionType } = this.state
    return (
      <div className={`${isFullScreen ? 'fullscreen' : ''} video-container`}>
        <MaskWrap fullscreenBtn={fullscreenBtn}
                  pauseBtn={pauseBtn}
                  autoPlay={autoPlay}
                  showingControlBtn={showingControlBtn}
                  size={size}
                  connectionType={connectionType}
                  isFullScreen={isFullScreen}
                  playing={playing}
                  toggleFullScreen={() => this.toggleFullScreen()}
                  togglePlay={() => this.togglePlay()}
                  toggleShowingControlBtn={() => this.toggleShowingControlBtn()}
                  handleClickReload={() => this.handleReload()}/>
        <video id='rs-video'
               ref={this.videoRef}
               className={`${isFullScreen ? 'fullscreen' : ''}`}
               src={src}
               loop={loop}
               autoPlay={autoPlay}
               poster={poster}>
          <track kind="captions"/>
        </video>
      </div>
    );
  }
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  fullscreenBtn: PropTypes.bool,
  pauseBtn: PropTypes.bool,
  size: PropTypes.string.isRequired

}

export default Video
