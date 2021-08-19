/*
 * @Author: your name
 * @Date: 2021-05-10 17:28:28
 * @LastEditTime: 2021-08-19 13:02:59
 * @LastEditors: lijuan.sun
 * @Description: In User Settings Edit
 * @FilePath: /monkey-cli/lib/handler.js
 */
const { androidHandler } = require('./androidHandler')
const h5Handleler = require('./h5Handler')
const nodeHandler = require('./nodeHandler')
const iosHandler = require('./iosHandler')
class Handler {
  constructor () {
  }

  static getInstance (type) {
    switch (type) {
      case 'android':
        return androidHandler
      case 'h5':
        return h5Handleler
      case 'node':
        return nodeHandler
      case 'ios':
        return iosHandler
      case 'java':
        return iosHandler
      default:
        throw new Error('template is not found!')
    }
  }
}

module.exports = Handler
