
export const Production = false;
export const Mode = 'API'; // or RPC
export const SMART_CONTRACT_ADDRESS = '0xe9d98cc4e70bf0ec4b06090b4bc6d5b0a69eac6a';
export const CoinType = 1150;
export const GasPrice = 50000000;
export const GasLimit = 20000000;

export const KANBAN =  {
    chain: {
        name: Production ? 'mainnet' : 'test',
        networkId: Production ? 211 : 212,
        chainId: Production ? 211 : 212
    }
};
export const ETHChain = Production ? 'mainnet' : 'ropsten';
export const ETHHardfork = Production ? 'petersburg' : 'byzantium';
export const RPCUrl = 'http://18.223.17.4:8545';
export const BaseUrl = 'https://kanban' + (Production ? 'prod' : 'test') + '.fabcoinapi.com/';
export const Mnemonic = 'woman cave spoil ranch solve hobby april gadget burger method friend rookie';

