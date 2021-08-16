/*
 * @Author: your name
 * @Date: 2021-05-10 14:18:15
 * @LastEditTime: 2021-08-16 16:22:49
 * @LastEditors: lijuan.sun
 * @Description: In User Settings Edit
 * @FilePath: /monkey-cli/config/index.js
 */

module.exports = {
    templateUrl: { // 模板地址
        // node: 'direct:http://gitlab.monkey.com:10080/data-app/node-express-template.git#develop',
        // android: 'direct:http://gitlab.monkey.com:10080/data-app/android-basic-template.git#develop',
        // ios: 'direct:http://gitlab.monkey.com:10080/data-app/ios-basic-template.git#develop',
        h5: 'direct:https://github.com/monkey01127/vuemonkey-element-admin.git#develop'
    },
    compilePath: { // 需要编译的文件
        android: [
            'app/src/main/res/values/strings.xml',
            'app/src/main/res/values/themes.xml',
            'app/src/main/AndroidManifest.xml',
            'app/build.gradle',
            'settings.gradle'
        ],
        node: [
            'package.json'
        ],
        ios: [
            'ios-basic-template/Info.plist',
            'ios-basic-template.xcodeproj/project.pbxproj'
        ],
        h5: [
            'package.json'
        ],
    },
    renamePath: { // 需要重新命名的文件
        android: [
            { prefix: 'app/src/main/java/', renamePart: 'com/monkey/applicationtemplate' },
            // lqy\app\src\main\java\com\monkey\applicationtemplate
            { prefix: 'app/src/androidTest/java/', renamePart: 'com/monkey/applicationtemplate' },
            { prefix: 'app/src/test/java/', renamePart: 'com/monkey/applicationtemplate' },
        ]
    }
};