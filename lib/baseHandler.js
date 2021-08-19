/*
 * @Author: your name
 * @Date: 2021-05-10 16:38:37
 * @LastEditTime: 2021-08-16 16:09:17
 * @LastEditors: lijuan.sun
 * @Description: In User Settings Edit
 * @FilePath: /monkey-cli/lib/baseHandler.js
 */
const fs = require('fs')
const handlebars = require('handlebars')
const ora = require('ora')
const chalk = require('chalk')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const { compilePath, renamePath, templateUrl } = require('../config')
class BaseHandler {
  constructor (type) {
    this.type = type
    this.compilePaths = compilePath[type]
    this.url = templateUrl[type]
    this.process = [

    ]
  }

  getInitQuestions () {
    return [
      {
        type: 'input',
        name: 'ProjectName',
        message: 'Please enter the projectName:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please enter the author name:'
      }
    ]
  }

  handle (meta) {
    this.compileFiles(meta)
  }

  // 提问
  async inquire () {
    const questions = this.getQuestions()
    const meta = await inquirer.prompt(questions)
    return meta
  }

  // 处理问题答案
  // eslint-disable-next-line no-unused-vars
  handleMeta (meta) {
    // console.log(meta)
  }
  // 下载
  async runDownload (meta) {
    const lqyProcess = ora({
      color: 'green',
      text: 'create...'
    })

    // 检查项目是否已经存在，如果存在，是否覆盖，覆盖之前先进行数据备份。
    // 数据备份
    let backups
    if (fs.existsSync(`${meta.ProjectName}`)) {
      const questions = [
        { type: 'confirm', name: 'continue', message: 'Directory is already exists, would you like to overwrite it?' }
      ]

      const answer = await inquirer.prompt(questions)
      if (answer.continue) {
        // 备份文件
        backups = this.renameProject(meta.ProjectName, `${meta.ProjectName}.old`)
      } else {
        console.log('ending')
        return
      }
    }

    // 下载之前，创建下载效果
    lqyProcess.start()
    lqyProcess.text = 'Loading ='
    const interval = setInterval(() => {
      lqyProcess.text += '='
    }, 10)

    return new Promise((resolve, reject) => {
      console.log(this.url, meta.ProjectName)
      download(this.url, `${meta.ProjectName}`, { clone: true }, (err) => {
        lqyProcess.text = 'Load successfully！'
        clearInterval(interval)
        if (err) {
          lqyProcess.fail()
          if (backups) {
            this.renameProject(backups, meta.ProjectName)
          }
          return reject(err)
        } else {
          if (backups) {
            // 删除备份文件
            try {
              this.emptyOldProject(backups)
            } catch (err) {
              // 删除文件失败，你可以手动删除备份！
              console.log(chalk.redBright('Remove backups failed', err.message, `you can delete ${backups} manually!`))
            }
          }
          lqyProcess.succeed()
          return resolve()
        }
      })
    })
  }

  // 文本编译
  compileFiles (meta) {
    const lqyProcess = ora({
      color: 'green',
      text: 'building...'
    })
    lqyProcess.start()
    lqyProcess.text = 'building ='
    const interval = setInterval(() => {
      lqyProcess.text += '='
    }, 10)
    Promise.all(this.compilePaths.map(item => {
      item = `${meta.ProjectName}/${item}`
      return Promise.resolve(this.compile(item, meta))
    })).then(function () {
      clearInterval(interval)
      lqyProcess.text = 'build successfully!'
      lqyProcess.succeed()
    }).catch(err => {
      console.log('compileFaild', err, err.message)
    })
  }

  compile (fileName, meta) {
    const content = fs.readFileSync(fileName).toString()
    const result = handlebars.compile(content)(meta)
    fs.writeFileSync(fileName, result)
  }

  // 批量模板文件夹重新命名
  renameDirs (projectName, newpath) {
    if (renamePath[this.type].length > 0) {
      renamePath[this.type].forEach(item => {
        this.renameDir(`${projectName}/${item.prefix}${item.renamePart}`, `${projectName}/${item.prefix}${newpath}`)
        const pathSplits = `${projectName}/${item.prefix}${item.renamePart}`.split('/')
        // pathSplits.pop();
        const stop = item.renamePart.split('/')
        this.rmDirRecursive(pathSplits, pathSplits.length - stop.length)
      })
    }
  }

  // 删除单个文件夹
  renameDir (oldpath, newpath) {
    if (fs.existsSync(oldpath)) {
      this.checkDirExists(newpath)
      fs.renameSync(oldpath, newpath)
    } else {
      console.log('directory is not found!')
    }
  }

  // 递归检查文件是否存在
  checkDirExists (path) {
    const pathSplits = path.split('/')
    let i = 0
    let newpath = ''
    while (i < pathSplits.length - 1) {
      newpath += `${pathSplits[i]}/`
      if (!fs.existsSync(newpath)) {
        fs.mkdirSync(newpath)
      }
      i++
    }
  }

  // 递归删除文件夹
  rmDirRecursive (pathSplits, stop) {
    while (pathSplits.length > stop) {
      const path = pathSplits.join('/')
      if (fs.existsSync(path)) {
        const stat = fs.statSync(path)
        if (stat.isDirectory()) {
          const files = fs.readdirSync(path)
          if (files.length === 0) {
            fs.rmdirSync(path)
          }
          pathSplits.pop()
        } else {
          throw new Error('fileType is wrong！')
        }
      } else {
        pathSplits.pop()
      }
    }
  }

  // 检查项目是否存在
  // async checkProjectExists () {
  //   if (fs.existsSync(`${answers.ProjectName}`)) {
  //     const questions = [
  //       { type: 'confirm', name: 'continue', message: 'Directory is already exists, would you like to overwrite it?' }
  //     ];

  //     const answer = await inquirer.prompt(questions);
  //     if (answer.continue) {
  //       backups = this.renameProject(answers.ProjectName, `${answers.ProjectName}.old`);
  //     } else {
  //       console.log('ending');
  //       return;
  //     }
  //   }
  // }

  // 项目重新命名
  renameProject (oldpath, newpath) {
    if (fs.existsSync(newpath)) {
      return this.renameProject(oldpath, `${newpath}.old`)
    }
    if (!fs.existsSync(oldpath)) {
      return null
    }
    fs.renameSync(oldpath, newpath)
    return newpath
  }

  // 清空备份文件夹
  emptyOldProject (path) {
    const stat = fs.statSync(path)
    if (stat.isDirectory()) {
      const list = fs.readdirSync(path)
      list.forEach((v) => {
        const url = path + '/' + v
        const stats = fs.statSync(url)
        if (stats.isDirectory()) {
          this.emptyDir(url)
        } else {
          fs.unlinkSync(url)
        }
      })
      // 删除空文件夹
      fs.rmdirSync(path)
    } else {
      // 删除文件
      fs.unlinkSync(path)
    }
  }

  emptyDir (path) {
    const stat = fs.statSync(path)
    if (stat.isDirectory()) {
      const list = fs.readdirSync(path)
      list.forEach((v) => {
        const url = path + '/' + v
        const stats = fs.statSync(url)
        if (stats.isDirectory()) {
          this.emptyDir(url)
        } else {
          fs.unlinkSync(url)
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }
}
module.exports = BaseHandler
