const {Container} = require('./constant')

class Scene extends Container {
  constructor(name) {
    super()

    this.name = name
    this.loaded = false
  }

  static center(obj, width, height, options) {
    if(options == null) options = {}
    options.horizontial = options.horizontial == null ? true : options.horizontial
    options.vertical = options.vertical == null ? true : options.vertical

    if(options.horizontial) {
      obj.x = width / 2
      obj.anchor.x = 0.5
    }
    if(options.vertical) {
      obj.y = height / 2
      obj.anchor.y = 0.5
    }
  }

  async load(...args) {
    if(this.loaded) return true
    else return await this._setup.apply(this, args)
  }
}

module.exports = Scene
