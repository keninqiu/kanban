import Web3 from 'web3';
export default class AbiService {

    public static getAddRecordABI(sequence: string, hashData: string) {
        const func: any =   {
          "constant": false,
          "inputs": [
            {
              "name": "_sequence",
              "type": "bytes32"
            },
            {
              "name": "_hashData",
              "type": "bytes32"
            }
          ],
          "name": "addRecord",
          "outputs": [
            
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        };  
        const params = [sequence, hashData];
    
        console.log('params=', params);
        const abiHex = AbiService.getGeneralFunctionABI(func, params);
        return abiHex;
    }

    public static getGeneralFunctionABI(func: any, paramsArray: any) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const abiHex = web3.eth.abi.encodeFunctionCall(func, paramsArray);
      return abiHex;
    }
}

