import KanbanTxService from './kanban.tx.service';
import AbiService from './abi.service';
import KanbanService from './kanaban.service';
import * as Btc from 'bitcoinjs-lib';
import { SMART_CONTRACT_ADDRESS, Production, Mnemonic, CoinType } from './constants';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';


const main = async () => {
    const network = Production ? Btc.networks.bitcoin : Btc.networks.testnet
    const seed = bip39.mnemonicToSeedSync(Mnemonic);
    const path = 'm/44\'/' + CoinType + '\'/0\'/' + 0 + '/' + 0;

    const root = bip32.fromSeed(seed, network);

    const childNode = root.derivePath(path);
    const { address } = Btc.payments.p2pkh({
        pubkey: childNode.publicKey,
        network: network
    });  
    
    const kanbanAddress = KanbanService.fabToKanbanAddress(address);
    const privateKey = childNode.privateKey;

    const id = '0x4554d4';
    const hash = '0xfe3345ed3';
    const abiHex = AbiService.getAddRecordABI(id, hash);
    console.log('abiHex=', abiHex);
    const txhex = await KanbanService.getHex(SMART_CONTRACT_ADDRESS, abiHex, privateKey, kanbanAddress);
    console.log('txhex=', txhex);
    const ret = await KanbanService.sendKanbanSignedTransaction(txhex);
    console.log('ret=', ret);
}

main();