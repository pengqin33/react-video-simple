import { UP_HYBRID_STR } from '../utils/constant'
import {log} from '../utils/log'

export class Framework {
  constructor () {
    this.deviceIsReady = false
    this.wrapName = ''
    this.cordovaUtil = null
    this.jsBridgeUtil = null
  }

  /* 初始化，wrapName, deviceIsReady, cordovaUtil, jsBridgeUtil */
  async init () {
    try {
      this.wrapName = this.getWrapEnv()
      if (this.wrapName === UP_HYBRID_STR) {
        const { default: cordovaUtil } = await import('./CordovaUtil')
        this.cordovaUtil = cordovaUtil
        await cordovaUtil.init()
        this.deviceIsReady = true
        return true
      }
      return false
    } catch (error) {
      log(JSON.stringify(error), true)
      return false
    }
  }

  /* 判断环境 */
  getWrapEnv () {
    // const agent = window.navigator.userAgent.toLowerCase()
    const agent = window.navigator.userAgent.toLowerCase()
    if (agent.indexOf(UP_HYBRID_STR) > -1) {
      return UP_HYBRID_STR
    }
    return ''
  }

  /* 重新加载容器 */
  reload () {
    try {
      if (this.deviceIsReady) {
        if (this.wrapName === UP_HYBRID_STR) {
          this.cordovaUtil.reload()
        } else {
          window.location.reload(true)
        }
      } else {
        window.location.reload(true)
      }
    } catch (error) {
      log(JSON.stringify(error), true)
    }
  }
}


export default new Framework()
