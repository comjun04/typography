const {Tween, Ease} = require('./constant')

Tween.async = async (from, obj, time, ease, args, scope) => {
  return new Promise((resolve, reject) => {
    Tween.get(from).to(obj, time, (ease == null ? Ease.none : ease)).call(() => {resolve()}, args, scope)
  })
}

