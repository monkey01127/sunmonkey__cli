/*
 * @Author: your name
 * @Date: 2021-04-30 16:38:02
 * @LastEditTime: 2021-05-13 16:37:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo_cli\lib\nodeHandler.js
 */
// module.exports = function nodeHandler(answers) {
//     const fileName = `${answers.project}/package.json`;
//     const meta = {
//         name: answers.project,
//         author: answers.author
//     };
//     if (fs.existsSync(fileName)) {
//         const content = fs.readFileSync(fileName).toString();
//         const result = handlebars.compile(content)(meta);
//         fs.writeFileSync(fileName, result);
//     }
// }

const BaseHandler = require('./baseHandler');
class NodeHandler extends BaseHandler {
  constructor() {
    super('node');
  }

  async handle () {
    // 提问
    const meta = await this.inquire();
    // 处理答案
    this.handleMeta(meta);
    // 开始下载
    await this.runDownload(meta);
    // 解析文件
    this.compileFiles(meta);
  }

  getQuestions() {
    return this.getInitQuestions();
  }

  // eslint-disable-next-line no-unused-vars
  handleMeta(meta) {
  }
}

module.exports = new NodeHandler();