/*
 * @Author: your name
 * @Date: 2021-05-11 16:08:27
 * @LastEditTime: 2021-05-14 09:11:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo_cli\lib\iosHandler.js
 */
const { AndroidHandler } = require('./androidHandler')
class IosHandler extends AndroidHandler {
  constructor () {
    super('ios')
  }

  // getQuestions() {
  //     const initQuestions = this.getInitQuestions();
  //     return initQuestions.concat([{
  //         type: 'input',
  //         name: 'AppName',
  //         message: 'please enter the app name：'
  //     },
  //     {
  //         type: 'input',
  //         name: 'ApplicationID',
  //         message: 'please enter the ApplicationID：'
  //     }
  //     ]);
  // }

  async handle () {
    // 流程: inquirer => handleMeta => runDownload => compileFiles => 结束！
    // 提问
    const meta = await this.inquire()
    // 处理答案
    this.handleMeta(meta)
    // 下载模板
    await this.runDownload(meta)
    // 解析模板文件
    this.compileFiles(meta)
  }
}
module.exports = new IosHandler()
