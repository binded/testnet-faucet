// Based off https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/_blockchain.js
// (c) BitcoinJSlib

const async = require('async')
const Blockchain = require('cb-http-client')
const httpify = require('httpify')

module.exports = (apiKey) => {
  const testnet = new Blockchain('https://api.blocktrail.com/cb/v0.2.1/tBTC', { api_key: apiKey })

  return (address, amount) => new Promise((resolve, reject) => {
    httpify({
      method: 'POST',
      url: `https://api.blocktrail.com/v1/tBTC/faucet/withdrawl?api_key=${apiKey}`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: address,
        amount: amount,
      })
    }, function (err, result) {
      if (err) return reject(err)

      if (result.body.code === 401) {
        return reject(new Error('Hit faucet rate limit; ' + result.body.msg))
      }

      // allow for TX to be processed
      async.retry(5, function (callback) {
        setTimeout(function () {
          testnet.addresses.unspents(address, function (err, result) {
            if (err) return callback(err)

            var unspent = result.filter(function (unspent) {
              return unspent.value >= amount
            }).pop()

            if (!unspent) return callback(new Error('No unspent given'))
            callback(null, unspent)
          })
        }, 600)
      }, resolve)
    })
  })
}
