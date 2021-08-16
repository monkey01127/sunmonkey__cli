#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const Handler = require('./lib/handler');

program
  .version(require('./package').version, '-v, --version') // 版本
  .command('init <name>') // 输出命令
  .action(async (name) => {
    const handler = Handler.getInstance(name); // 根据name 获得handler 实例
    try {
      await handler.handle();
    } catch (err) {
      console.log(chalk.red(err.message));
    }
  });
program.parse(process.argv);