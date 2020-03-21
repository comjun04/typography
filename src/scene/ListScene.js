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

    let topBar = new Graphics().beginFill(0x0000ff).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, display.width, display.height * 0.07).endFill()
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

    let dataCardView = new Graphics().beginFill(0x00ff00).drawRect(0, 0, display.width, display.height * 0.76).endFill()
    dataCardView.y = display.height * 0.12
    this.dataCardView = dataCardView
    this.addChild(dataCardView)

    let dataCard1 = new Graphics().beginFill(0xff0000).drawRect(0, 0, dataCardView.width * 0.35, dataCardView.height * 0.35).endFill()
    dataCard1.position.set(dataCardView.width * 0.1, dataCardView.height * 0.1)
    dataCard1.interactive = true
    dataCardView.dataCard1 = dataCard1
    dataCardView.addChild(dataCard1)
    
    let dataCard2 = new Graphics().beginFill(0xff0000).drawRect(0, 0, dataCardView.width * 0.35, dataCardView.height * 0.35).endFill()
    dataCard2.position.set(dataCardView.width * 0.55, dataCardView.height * 0.1)
    dataCardView.dataCard2 = dataCard2
    dataCardView.addChild(dataCard2)
    
    let dataCard3 = new Graphics().beginFill(0xff0000).drawRect(0, 0, dataCardView.width * 0.35, dataCardView.height * 0.35).endFill()
    dataCard3.position.set(dataCardView.width * 0.1, dataCardView.height * 0.55)
    dataCardView.dataCard3 = dataCard3
    dataCardView.addChild(dataCard3)
    
    let dataCard4 = new Graphics().beginFill(0xff0000).drawRect(0, 0, dataCardView.width * 0.35, dataCardView.height * 0.35).endFill()
    dataCard4.position.set(dataCardView.width * 0.55, dataCardView.height * 0.55)
    dataCardView.dataCard4 = dataCard4
    dataCardView.addChild(dataCard4)

    // Begin of Test Data
    
    let testData1Image = new Graphics().beginFill(0x0).drawRect(0, 0, dataCard1.width / 3, dataCard1.height).endFill()
    dataCard1.dataImage = testData1Image
    dataCard1.addChild(testData1Image)
    
    let testData1Name = new Text('Just Song', {fontSize: 20})
    testData1Name.position.set(testData1Image.width + 5, 5)
    dataCard1.dataName = testData1Name
    dataCard1.addChild(testData1Name)

    // End of Test Data

    let bottomBar = new Graphics().beginFill(0x0000ff).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, display.width, display.height * 0.07).endFill()
    bottomBar.y = display.height
    this.bottomBar = bottomBar
    this.addChild(bottomBar)

    let pageCountText = new Text('1 / {pageAll} 페이지', {fill: 'white', fontSize: 20})
    Scene.center(pageCountText, bottomBar.width, bottomBar.height)
    bottomBar.pageCountText = pageCountText
    bottomBar.addChild(pageCountText)

    let prevPageBtn = new Graphics().beginFill(0x0, 0).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, bottomBar.height * 0.9, bottomBar.height * 0.9).endFill()
    prevPageBtn.x = pageCountText.x - (pageCountText.width / 2) - prevPageBtn.width - 10
    prevPageBtn.y = (bottomBar.height - prevPageBtn.height) / 2
    bottomBar.prevPageBtn = prevPageBtn
    bottomBar.addChild(prevPageBtn)

    let nextPageBtn = new Graphics().beginFill(0x0, 0).lineStyle(2, 0xffffff, 1, 0).drawRect(0, 0, bottomBar.height - 10, bottomBar.height * 0.9).endFill()
    nextPageBtn.x = pageCountText.x + (pageCountText.width / 2) + 10
    nextPageBtn.y = (bottomBar.height - nextPageBtn.height) / 2
    bottomBar.nextPageBtn = nextPageBtn
    bottomBar.addChild(nextPageBtn)

    // Overlay
    let overlayBg = new Graphics().beginFill(0x0, 0).drawRect(0, 0, display.width, display.height).endFill()
    overlayBg.visible = false
    this.overlayBg = overlayBg
    this.addChild(overlayBg)

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

  async run() {
    let dataCard1Click = () => {
      let dataCard1 = this.dataCardView.dataCard1
      let imageAnimate = new Graphics().beginFill(0xffff00).drawRect(0, 0, dataCard1.dataImage.width, dataCard1.dataImage.height).endFill()
      imageAnimate.x = dataCard1.x
      imageAnimate.y = this.dataCardView.y + this.dataCardView.height * 0.1
      this.overlayBg.addChild(imageAnimate)
      
      let origWidth = imageAnimate.width,
        origHeight = imageAnimate.height
      this.overlayBg.visible = true
      Tween.async(imageAnimate.scale, {
        x: (this.overlayBg.width * 0.4) / origWidth,
        y: (this.overlayBg.height * 0.8) / origHeight
      }, 500, Ease.quintOut)
      Tween.async(imageAnimate, {
        x: this.overlayBg.width * 0.05, 
        y: this.overlayBg.height * 0.1
      }, 500, Ease.quintOut)
    }

    this.dataCardView.dataCard1.on('click', dataCard1Click)
    this.dataCardView.dataCard1.on('tap', dataCard1Click)
  }
}

module.exports = ListScene
