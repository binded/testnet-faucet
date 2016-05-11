# testnet-faucet

Library and CLI to programmatically receive testnet coins from Blocktrail's
testnet faucet.

## Install

```
npm install -g testnet-faucet
```

## Usage

```
testnet-faucet <address> [<amount>]
```

Library usage:

```javascript
const faucet = require('testnet-faucet')({
  apiKey: 'blocktrail-api-key',
})

faucet('some-address', 2000).then(() => {
  // success!
})
```
