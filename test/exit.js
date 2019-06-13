const metronomo = require('../src/index.js')

const longTime = () => new Promise((resolve, reject) => setTimeout(resolve.bind(undefined, true), 1000))

const main = () => {
  metronomo(longTime, t => t === true, 500, 5, ({ counter }) => counter === 3)
    .then(r => { console.log(r) })
    .catch(e => { console.log(e) })
}

main()
