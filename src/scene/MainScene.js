const {Text, Tween, Ease, Graphics} = require('../classes/constant')
const {display, Scene, SceneManager, Button} = require('../classes/index')

const ListScene = require('./ListScene')

class MainScene extends Scene {
  constructor() {
    super()

    this.name = 'MainScene'
    this.visible = false
  }

  async _setup(app) {
    this.alpha = 0

    let bg = new Graphics()
    bg.beginFill(0x0).drawRect(0, 0, display.width, display.height).endFill()
    this.addChild(bg)

    let title = new Text('Typography', {fill: 'white', fontSize: 40})
    Scene.center(title, display.width, display.height, {vertical: false})
    title.y = display.height / 5
    this.title = title
    this.addChild(title)

    let startBtn = new Button()
    startBtn.beginFill(0x0)
    .lineStyle(2, 0xffffff, 1, 0.5)
    .drawRoundedRect(0, 0, 160, 100, 10)
    .endFill()
    startBtn.position.set((display.width - 160) / 2, display.height - 200)
    startBtn.enable = true
    this.startBtn = startBtn
    this.addChild(startBtn)

    let startBtnText = new Text('시작', {fill: 'white'})
    Scene.center(startBtnText, startBtn.width, startBtn.height)
    startBtn.addChild(startBtnText)

    let listScene = SceneManager.create(ListScene, app)

    this.loaded = true
    return true
  }

  async show() {
    this.width = display.width
    this.height = display.height
    this.position.set(0)
    this.visible = true
    await Tween.async(this, {alpha: 1}, 1000)
  }

  async hide() {
    let {width, height} = this
    await Tween.async(this, {
      alpha: 0, 
      width: width * 0.9, 
      height: height * 0.9,
      x: width * 0.05,
      y: height * 0.05
    }, 1000, Ease.sineOut)
  }

  async run() {
    let startBtn = this.startBtn
    // Click Event
    let startBtnClick = async () => {
      if(startBtn.enable) {
        startBtn.enable = false
        await this.hide()
        
        let listScene = SceneManager.get('ListScene')
        await listScene.load()
        await listScene.show()
        await listScene.run()
      }
    }
    startBtn.on('click', startBtnClick)
    startBtn.on('tap', startBtnClick)
  }
}

module.exports = MainScene
