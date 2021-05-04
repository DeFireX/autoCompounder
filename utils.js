const Tx = require("ethereumjs-tx");

async function signAndSend({web3, payloadData, from, pk, gasPrice, gas, to, nonce, value}) {

    let trxNonce = nonce;
    if (nonce == -1 || !nonce) trxNonce = await web3.eth.getTransactionCount(from);
    console.log(`Trx nonce ${trxNonce}`);
    const totalFee = gasPrice * gas;
    const balance = (await web3.eth.getBalance(from)) * 1;
    if (balance < totalFee) {
        console.warn('Too hi fee, not enough balance', balance/1e18, 'totalFee', totalFee/1e18);
        return {hash: '', nonce: undefined};
    }

    let rawTx = {
        nonce: web3.utils.toHex(trxNonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gas * 1),
        to: to,
        from: from,
        value: web3.utils.toHex(value ? value : 0),
        data: payloadData
    };

    const bufferPrivateKey = Buffer.from(pk, 'hex');
    let tx = new Tx(rawTx);
    tx.sign(bufferPrivateKey);

    let serializedTx = tx.serialize();

    const hash = await new Promise((resolve, reject) => web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('error', (err) => reject(err))
        .on('transactionHash', (hash) => resolve(hash)));

    return {hash, nonce};
}

module.exports = {signAndSend};
