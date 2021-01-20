"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = __importDefault(require("web3"));
var AbiService = /** @class */ (function () {
    function AbiService() {
    }
    AbiService.getAddRecordABI = function (sequence, hashData) {
        var func = {
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
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        };
        var params = [sequence, hashData];
        console.log('params=', params);
        var abiHex = AbiService.getGeneralFunctionABI(func, params);
        return abiHex;
    };
    AbiService.getGeneralFunctionABI = function (func, paramsArray) {
        var web3 = new web3_1.default(web3_1.default.givenProvider || "ws://localhost:8545");
        var abiHex = web3.eth.abi.encodeFunctionCall(func, paramsArray);
        return abiHex;
    };
    return AbiService;
}());
exports.default = AbiService;
