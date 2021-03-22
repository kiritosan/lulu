const Ejs = require('Ejs')
const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { log, done, info, clearConsole } = require('../../log')

module.exports = async function create(name, dir) {
  const { options } = await inquirer.prompt([{
    type: 'checkbox',
    message: '请选择想要设置的配置:',
    name: 'options',
    choices: [
      {
        name: '颜色',
        value: 'color',
        checked: true
      },
      {
        name: 'Header',
        value: 'header',
        checked: true
      },
      {
        name: 'Footer',
        value: 'footer',
        checked: true
      },
      {
        name: 'CDN',
        value: 'cdn'
      },
      {
        name: 'MediaSession',
        value: 'media'
      },
      {
        name: '控制台输出',
        value: 'console'
      }
    ]
  }])

  const SETTING_DATA = await require('./Scripts/setting')(options.includes('header'), options.includes('footer'), options.includes('media'), options.includes('console'), options.includes('cdn'))
  const COLOR_DATA = await require('./Scripts/color')(options.includes('color'))

  clearConsole(chalk.cyan('Voices Button CLI'))
  log()
  log('模板复制中...')
  fs.ensureDirSync(dir)

  // 复制通用模板
  fs.copySync(path.resolve(__dirname, './Vue'), dir)

  // 创建README.md
  const _README = fs.readFileSync((path.resolve(__dirname, './Ejs/README.md'))).toString()
  const README = Ejs.render(_README, { NAME: name })
  fs.writeFileSync(path.join(dir, '/README.md'), README)

  // 创建index.html
  const _index = fs.readFileSync((path.resolve(__dirname, './Ejs/index.html'))).toString()
  const index = Ejs.render(_index, { NAME: name })
  fs.writeFileSync(path.join(dir, '/public/index.html'), index)

  // 创建package.json
  const _package = fs.readFileSync((path.resolve(__dirname, './Ejs/package.json'))).toString()
  const package = Ejs.render(_package, { NAME: name })
  fs.writeFileSync(path.join(dir, '/package.json'), package)

  // 创建setting.json
  const _setting = fs.readFileSync((path.resolve(__dirname, './Ejs/setting.json'))).toString()
  const setting = Ejs.render(_setting, SETTING_DATA)
  fs.writeFileSync(path.join(dir, '/setting/setting.json'), setting)

  // 创建color.styl
  const _color = fs.readFileSync((path.resolve(__dirname, './Ejs/color.styl'))).toString()
  const color = Ejs.render(_color, COLOR_DATA)
  fs.writeFileSync(path.join(dir, '/setting/color.styl'), color)

  clearConsole(chalk.cyan('Voices Button CLI'))
  log()
  done(`好耶~ ${chalk.yellow(name)} 已创建~`)
  log()
  log(`  cd ${name}`)
  log(`  npm i ${chalk.cyan('or')} yarn`)
  log()
  info(`请把语音文件放入 ${chalk.cyan('public/voices')} 目录`)
  if (SETTING_DATA.IMG) {
    info(`请把 ${chalk.cyan(SETTING_DATA.IMG)} 放入 ${chalk.cyan('public/img')} 目录`)
  }
  if (SETTING_DATA.MEDIA_SESSION) {
    info(`请把 ${chalk.cyan(SETTING_DATA.MEDIA_SESSION)} 放入 ${chalk.cyan('public/img')} 目录`)
  }
  log()
}