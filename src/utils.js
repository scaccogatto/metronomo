const cutter = timeout => new Promise((resolve, reject) => setTimeout(reject, timeout))

const resolver = (fn, checker) => new Promise(async (resolve, reject) => {
  console.log('ticking')
  try {
    const result = await fn()
    if (await checker(result)) return resolve(result)
  } catch (e) {}
  
  reject()
})

const racer = (fn, checker, maxTime) => Promise.race([
  resolver(fn, checker),
  cutter(maxTime)
])

const numberIdentity = n => typeof n === 'function' ? n : () => n

const ticker = (fn, checker, interval, times, exit, counter = 0) => new Promise(async (resolve, reject) => {
  console.log('count', counter)
  if (exit({ fn, checker, interval, times, counter })) return reject('forced')
  if (counter >= times()) return reject('timeout')

  return racer(fn, checker, interval)
    .then(resolve)
    .catch(() => ticker(fn, checker, interval, times, exit, counter + 1)
      .then(resolve)
      .catch(reject))
})

module.exports = {
  numberIdentity,
  ticker
}
