const {Scene, display} = require('../classes/index')
const {Graphics, Text, Tween, Ease} = require('../classes/constant')

class ListScene extends Scene {
  constructor() {
    super()

    this.name = 'ListScene'
    this.visible = false
  }

  async _setup() {
    let bg = new Graphics().beginFill(0x0).drawRect(0, 0, display.width, display.height).endFill()
    this.bg = bg
    this.addChild(bg)

    let topBar = new Graphics().beginFill(0x0000ff).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, display.width, display.height / 15).endFill()
    topBar.y = 0 - topBar.height
    this.topBar = topBar
    this.addChild(topBar)

    let topBarLogo = new Text('Typography', {fill: 'white'})
    Scene.center(topBarLogo, topBar.width, topBar.height, {horizontial: false})
    topBarLogo.x += 10
    topBar.topBarLogo = topBarLogo
    topBar.addChild(topBarLogo)

    let currentPackCountText = new Text('현재 보유 팩 {packCount}개', {fill: 'white', fontSize: 18})
    Scene.center(currentPackCountText, topBar.width, topBar.height, {horizontial: false})
    currentPackCountText.x = topBarLogo.x + topBarLogo.width + 10
    topBar.currentPackCountText = currentPackCountText
    topBar.addChild(currentPackCountText)

    let settingText = new Text('설정', {fill: 'white', fontSize: 20})
    Scene.center(settingText, topBar.width, topBar.height, {horizontial: false})
    settingText.x = topBar.width - settingText.width - 10
    topBar.settingText = settingText
    topBar.addChild(settingText)

    let dataCard1 = new Graphics().beginFill(0xff0000).drawRect(0, 0, 120, 300).endFill()
    this.dataCard1 = dataCard1
    this.addChild(dataCard1)

    let bottomBar = new Graphics().beginFill(0x0000ff).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, display.width, display.height / 12).endFill()
    bottomBar.y = display.height
    this.bottomBar = bottomBar
    this.addChild(bottomBar)

    let pageCountText = new Text('1 / {pageAll} 페이지', {fill: 'white', fontSize: 20})
    Scene.center(pageCountText, bottomBar.width, bottomBar.height)
    bottomBar.pageCountText = pageCountText
    bottomBar.addChild(pageCountText)

    let prevPageBtn = new Graphics().beginFill(0x0, 0).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, bottomBar.height - 10, bottomBar.height - 10).endFill()
    prevPageBtn.x = pageCountText.x - (pageCountText.width / 2) - prevPageBtn.width - 10
    prevPageBtn.y = (bottomBar.height - prevPageBtn.height) / 2
    bottomBar.prevPageBtn = prevPageBtn
    bottomBar.addChild(prevPageBtn)

    let nextPageBtn = new Graphics().beginFill(0x0, 0).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, bottomBar.height - 10, bottomBar.height - 10).endFill()
    nextPageBtn.x = pageCountText.x + (pageCountText.width / 2) + 10
    nextPageBtn.y = (bottomBar.height - nextPageBtn.height) / 2
    bottomBar.nextPageBtn = nextPageBtn
    bottomBar.addChild(nextPageBtn)


    this.loaded = true
    return true
  }

  async show() {
    this.visible = true
    Tween.async(this.topBar, {
      y: 0
    }, 500, Ease.sineOut)
    await Tween.async(this.bottomBar, {
      y: display.height - this.bottomBar.height + 2
    }, 500, Ease.sineOut)

  }
}

module.exports = ListScene
