"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Production = false;
exports.Mode = 'RPC'; // or RPC
exports.SMART_CONTRACT_ADDRESS = '0xe9d98cc4e70bf0ec4b06090b4bc6d5b0a69eac6a';
exports.CoinType = 1150;
exports.GasPrice = 50000000;
exports.GasLimit = 20000000;
exports.KANBAN = {
    chain: {
        name: exports.Production ? 'mainnet' : 'test',
        networkId: exports.Production ? 211 : 212,
        chainId: exports.Production ? 211 : 212
    }
};
exports.ETHChain = exports.Production ? 'mainnet' : 'ropsten';
exports.ETHHardfork = exports.Production ? 'petersburg' : 'byzantium';
exports.RPCUrl = 'http://18.223.17.4:8545';
exports.BaseUrl = 'https://kanban' + (exports.Production ? 'prod' : 'test') + '.fabcoinapi.com/';
exports.Mnemonic = 'woman cave spoil ranch solve hobby april gadget burger method friend rookie';
