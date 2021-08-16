<!--
 * @Author: lijuan.sun
 * @Date: 2021-07-07 09:22:27
 * @LastEditors: lijuan.sun
 * @LastEditTime: 2021-08-16 15:20:56
 * @PageTitle: 页面...
 * @Description: 描述...
 * @FilePath: /monkey-cli/README.md
-->
# monkey前端脚手架工具
## 安装
执行命令：
```
npm i monkey_cli -g
```
检查安装完成：
```
monkey -v
```
## 使用
monkey_cli 是一款脚手架工具，可以根据执行命令的不同生成不同的前端项目文件，生成的项目有：node、h5、android以及ios 项目等。
### 自动生成node项目
```
monkey init [program]
```
**program** 的值为：
- node
- h5
- android
- ios

## 脚手架项目目录结构
```bash
.
├── README.md
├── config
│   └── index.js
├── index.js
├── lib
│   ├── androidHandler.js
│   ├── baseHandler.js
│   ├── h5Handler.js
│   ├── handler.js
│   ├── iosHandler.js
│   └── nodeHandler.js
├── package-lock.json
└── package.json
```
### node 项目
生成的node项目是以express 为框架搭建的后台项目，它的目录结构为：
```
project
│
└───bin
│   |   www.js    
│
└───logger
|   |   index.js
└───server
│   │   db.js
│   │   routes.js
│   │
│   └───base
│   |   │   baseController.js
│   |   │   baseService.js
│   │
│   └───home
│       │   homeController.js
│       │   homeService.js       
│       |   homeRouter.js
└───app.js
└───package-lock.json
└───package.json
└───README.md
```
### h5 项目
### android 项目
### ios项目