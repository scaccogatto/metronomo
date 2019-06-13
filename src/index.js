const { ticker, numberIdentity } = require('./utils.js')

module.exports = (
  fn,
  checker,
  interval,
  times,
  exit = () => false
) => ticker(fn, checker, interval, numberIdentity(times), exit)
