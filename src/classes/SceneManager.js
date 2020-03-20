class SceneManager {
  constructor() {
    throw new Error('This is a static class')
  }

  static scenes = new Map()
  static get = (scene) => this.scenes.get(scene)

  /**
   * Adds a Scene.
   * @param {Scene} scene the Scene object
   * @returns {boolean} If key is unique (true if unique, false if not)
   */
  static add(scene, app) {
    if (this.scenes.has(scene.name)) {
      //throw new Error('\'' + scene.name + '\' is already added')
      return false
    } else {
      this.scenes.set(scene.name, scene)
      scene.visible = false
      app.stage.addChild(scene)
      return true
    }
  }
  /**
   * Creates given Scene and add if is not created
   */
  static create(sceneClass, app) {
    let scene = new sceneClass()
    if(!this.scenes.has(scene.name)) {
      this.add(scene, app)
      return scene
    }
    else return this.scenes.get(scene.name)
  }
}

module.exports = SceneManager
