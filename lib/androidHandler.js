/*
 * @Author: your name
 * @Date: 2021-05-10 16:31:38
 * @LastEditTime: 2021-05-13 16:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo_cli\lib\androidhandler.js
 */
// const chalk = require('chalk');
const BaseHandler = require('./baseHandler');
class AndroidHandler extends BaseHandler {
  constructor(type) {
    super(type);
  }

  async handle() {
    const meta = await this.inquire();
    // 处理答案
    this.handleMeta(meta);
    // 下载模板
    await this.runDownload(meta);
    // 解析模板文件
    this.compileFiles(meta);

    // 文件重命名
    const newpath = meta.ApplicationID.replace(/\./g, '/');
    this.renameDirs(meta.ProjectName, newpath);
  }

  getQuestions() {
    const initQuestions = this.getInitQuestions();
    return initQuestions.concat([{
      type: 'input',
      name: 'AppName',
      message: 'please enter the app name：'
    },
    {
      type: 'input',
      name: 'ApplicationID',
      validate: function (val) {
        const reg = /^[a-z]([a-z]*\.)+[a-z]+$/;
        if (reg.test(val) || !val) {
          return true;
        }
        return 'ApplicationID is wrong, please enter the correct ApplicationID(example: com.monkey.template):'
      },
      message: 'please enter the ApplicationID(format: xx.xx.xx, example: com.monkey.projectName)：'
    }]);
  }

  handleMeta(meta) {
    const ThemeName = meta.ProjectName ? meta.ProjectName.replace(/\s*/g, '') : '';
    const ApplicationID = meta.ApplicationID ? meta.ApplicationID.toLowerCase() : `com.monkey.${meta.ProjectName.toLowerCase()}`;
    meta.ThemeName = ThemeName;
    meta.ApplicationID = ApplicationID;
  }

}
module.exports = {
  AndroidHandler,
  androidHandler: new AndroidHandler('android')
};