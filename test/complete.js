const metronomo = require('../src/index.js')

const store = {
  check: 0
}

const longTime = () => new Promise((resolve, reject) => setTimeout(() => {
  if (store.check > 0) return resolve(true)
  else reject()

  store.check = store.check + 1
}, 200))

const main = () => {
  metronomo(longTime, t => t === true, 500, 5)
    .then(r => { console.log(r) })
    .catch(e => { console.log(e) })
}

main()
