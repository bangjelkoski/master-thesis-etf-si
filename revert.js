/* eslint-disable no-console */
const Web3 = require('web3')
const rpc =
  'https://eth-kovan.alchemyapi.io/v2/vSqxSDsS7fSB0VNQfWC1r0yVq5QCTy_n'

const web3 = new Web3(new Web3.providers.HttpProvider(rpc))

// INSERT TXHASH THAT'S FAILING
const txHash =
  '0xf8157ab931fa1e28678b5ed70cc58c13acf49e79af141e3447584c9ab52a0b49'
const parity = true
// INSERT TXHASH THAT's FAILING

if (parity) {
  web3.eth.extend({
    property: 'parity',
    methods: [
      {
        name: 'traceReplayTransaction',
        call: 'trace_replayTransaction',
        params: 2,
      },
    ],
  })
}

async function getResult({
  hash,
  to,
  input,
  from,
  value,
  gas,
  gasPrice,
  blockNumber,
}) {
  // Parity call to get result
  if (parity) {
    return (await web3.eth.parity.traceReplayTransaction(hash, ['trace']))
      .output
  }

  // Geth call to get result
  return web3.eth.call(
    {
      to,
      data: input,
      from,
      value,
      gas,
      gasPrice,
    },
    blockNumber
  )
}

async function main() {
  if (!txHash.match(/^0x([A-Fa-f0-9]{64})$/)) {
    console.error(
      'Invalid transaction hash argument. Must be a 32 byte hex string with a 0x prefix which is 64 characters in total.'
    )
    process.exit(2)
  }

  const receipt = await web3.eth.getTransactionReceipt(txHash)

  if (!receipt) {
    console.error(
      'Could not get transaction receipt. Are you sure it was mined?'
    )
    process.exit(3)
  }

  if (receipt.status) {
    console.error(
      'Transaction did not fail. Can only read the revert reason from failed transactions'
    )
    process.exit(3)
  }

  const transaction = await web3.eth.getTransaction(txHash)

  if (receipt.gasUsed === transaction.gas) {
    console.error('Transaction failed as it ran out of gas.')
    process.exit(4)
  }

  let rawMessageData
  try {
    const result = await getResult(transaction)

    console.log('RAW result:', result)
    // Trim the 0x prefix
    rawMessageData = result.slice(2)
  } catch (e) {
    console.log('RAW error message:', e.message)

    if (e.message.startsWith('Node error: ')) {
      // Trim "Node error: "
      const errorObjectStr = e.message.slice(12)
      // Parse the error object
      const errorObject = JSON.parse(errorObjectStr)

      if (!errorObject.data) {
        throw new Error(
          'Failed to parse data field error object:' + errorObjectStr
        )
      }

      if (errorObject.data.startsWith('Reverted 0x')) {
        // Trim "Reverted 0x" from the data field
        rawMessageData = errorObject.data.slice(11)
      } else if (errorObject.data.startsWith('0x')) {
        // Trim "0x" from the data field
        rawMessageData = errorObject.data.slice(2)
      } else {
        throw new Error(
          'Failed to parse data field error object:' + errorObjectStr
        )
      }
    } else {
      throw new Error(
        'Failed to parse error message from Ethereum call: ' + e.message
      )
    }
  }

  // Get the length of the revert reason
  const strLen = parseInt(rawMessageData.slice(8 + 64, 8 + 128), 16)
  // Using the length and known offset, extract and convert the revert reason
  const reasonCodeHex = rawMessageData.slice(8 + 128, 8 + 128 + strLen * 2)
  // Convert reason from hex to string
  const reason = web3.utils.hexToAscii('0x' + reasonCodeHex)
  console.log('\nDecoded reason: "' + reason + '"')
}

main()
