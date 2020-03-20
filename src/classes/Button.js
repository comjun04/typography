const {Graphics} = require('./constant')

class Button extends Graphics {
  constructor() {
    super()

    this.interactive = true
    this.buttonMode = true
  }
}

module.exports = Button
