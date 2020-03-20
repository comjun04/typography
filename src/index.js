// Run one-time script
require('./classes/asyncTween')

// Import
const {Graphics, Container, Text} = require('./classes/constant')
const {display, SceneManager} = require('./classes/index')

// Scene Import
const MainScene = require('./scene/MainScene')

// Define Globals
//var screenWidth, screenHeight
var app

// Define Scenes
var mainScene

function init() {
  //checkScreenWidth(false)

  app = new PIXI.Application({
    width: display.width,
    height: display.height
  })
  document.body.appendChild(app.view)

  // Window width check
  /*
  let widthSmallWindow = new Graphics()
  let widthSmallText = new Text('이 프로그램은 가로 길이가 800px 이상인 화면에서 동작합니다.\n모바일 기기의 경우 가로로 돌려 주게요.')
  widthSmallWindow.visible = false
  widthSmallWindow.beginFill(0x0)
  .drawRect(0, 0, screenWidth, screenHeight)
  .endFill()
  widthSmallWindow.alpha = 0.5
  widthSmallWindow.visible = false
  widthSmallText.style = {
    fill: 'white',
    align: 'center'
  }

  app.stage.addChild(widthSmallWindow)
  widthSmallWindow.addChild(widthSmallText)

  screenWidthWarning()
  */
  window.addEventListener('resize', () => {checkScreenWidth(true)})
  loadMain()
}

/*
function checkScreenWidth(setWarning) {
  //realScreenWidth = screen.width
  //realScreenHeight = screen.height

  //let r = window.devicePixelRatio || 1
  //screenWidth = 800 //screen.width * r
  //screenHeight = 600 //screen.height * r

  //if(setWarning) screenWidthWarning()
}
*/

/*
function screenWidthWarning() {
  if(screenHeight > screenWidth) {
    alert(realScreenWidth)
    widthSmallWindow.visible = true
  } else {
    widthSmallWindow.visible = false
  }
}
*/

async function loadMain() {
  mainScene = SceneManager.create(MainScene, app)
  await mainScene.load(app)
  await mainScene.show()
  await mainScene.run()
}

window.addEventListener('DOMContentLoaded', init)
