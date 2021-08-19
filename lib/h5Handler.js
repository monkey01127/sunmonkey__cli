
/*
 * @Author: your name
 * @Date: 2021-05-07 09:30:31
 * @LastEditTime: 2021-08-16 15:36:35
 * @LastEditors: lijuan.sun
 * @Description: In User Settings Edit
 * @FilePath: /monkey-cli/lib/h5Handler.js
 */
const BaseHandler = require('./baseHandler')
class H5Handler extends BaseHandler {
  constructor () {
    super('h5')
  }

  async handle () {
    // 提问
    const meta = await this.inquire()
    // 处理答案
    this.handleMeta(meta)
    // 开始下载
    await this.runDownload(meta)
    // 解析文件
    this.compileFiles(meta)
  }

  getQuestions () {
    return this.getInitQuestions()
  }

  // eslint-disable-next-line no-unused-vars
  handleMeta (meta) {
  }
}

module.exports = new H5Handler()
