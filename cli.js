const initFaucet = require('./')

const apiKey = process.env.BLOCKTRAIL_API_KEY || 'c0bd8155c66e3fb148bb1664adc1e4dacd872548'

const address = process.argv[2]
const amount = process.argv[3] ? parseInt(process.argv[3], 10) : null

const faucet = initFaucet(apiKey)

faucet(address, amount).then((res) => {
  console.log('Testnet coins transfered!')
  console.log(res)
}).catch((err) => {
  console.error(err)
  err.stack && console.error(err.stack)
  process.exit(1)
})

