"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bs58_1 = __importDefault(require("bs58"));
var constants_1 = require("./constants");
var node_fetch_1 = __importDefault(require("node-fetch"));
var ethereumjs_common_1 = __importDefault(require("ethereumjs-common"));
var kanban_tx_service_1 = __importDefault(require("./kanban.tx.service"));
var KanbanService = /** @class */ (function () {
    function KanbanService() {
    }
    KanbanService.sendKanbanSignedTransaction = function (txHex) {
        return __awaiter(this, void 0, void 0, function () {
            var data, txHash, errMsg, url, response, json, err_1, data_1, response, json, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            signedTransactionData: txHex
                        };
                        txHash = '';
                        errMsg = '';
                        if (!txHex) {
                            return [2 /*return*/, { txHash: txHash, errMsg: errMsg }];
                        }
                        if (!(constants_1.Mode.indexOf('API') == 0)) return [3 /*break*/, 6];
                        url = constants_1.BaseUrl + 'kanban/sendRawTransaction';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, node_fetch_1.default(url, {
                                method: 'post',
                                body: JSON.stringify(data),
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        if (json) {
                            if (json.transactionHash) {
                                txHash = json.transactionHash;
                            }
                            else if (json.Error) {
                                errMsg = json.Error;
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        errMsg = 'Error';
                        if (err_1.error && err_1.error.Error) {
                            errMsg = err_1.error.Error;
                        }
                        if (err_1.data && err_1.data.Error) {
                            errMsg = err_1.data.Error;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, { txHash: txHash, errMsg: errMsg }];
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        data_1 = {
                            "jsonrpc": "2.0",
                            "method": "kanban_sendRawTransaction",
                            "params": [txHex],
                            "id": 677
                        };
                        return [4 /*yield*/, node_fetch_1.default(constants_1.RPCUrl, {
                                method: 'post',
                                body: JSON.stringify(data_1),
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    case 7:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 8:
                        json = _a.sent();
                        if (json) {
                            if (json.result) {
                                txHash = json.result;
                            }
                            else if (json.Error) {
                                errMsg = json.Error;
                            }
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        err_2 = _a.sent();
                        errMsg = 'Error';
                        if (err_2.error && err_2.error.Error) {
                            errMsg = err_2.error.Error;
                        }
                        if (err_2.data && err_2.data.Error) {
                            errMsg = err_2.data.Error;
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, { txHash: txHash, errMsg: errMsg }];
                }
            });
        });
    };
    KanbanService.getHex = function (smartContractAddress, abiHex, privateKey, address, value) {
        if (value === void 0) { value = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var nonce, txObject, customCommon, tx, serializedTx, txhex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!address) {
                            return [2 /*return*/, ''];
                        }
                        console.log('address=', address);
                        return [4 /*yield*/, this.getNonce(address)];
                    case 1:
                        nonce = _a.sent();
                        console.log('nonce=', nonce);
                        txObject = {
                            to: smartContractAddress,
                            nonce: nonce,
                            data: abiHex,
                            value: value,
                            gas: constants_1.GasLimit,
                            gasPrice: constants_1.GasPrice
                        };
                        customCommon = ethereumjs_common_1.default.forCustomChain(constants_1.ETHChain, {
                            name: constants_1.KANBAN.chain.name,
                            networkId: constants_1.KANBAN.chain.networkId,
                            chainId: constants_1.KANBAN.chain.chainId
                        }, constants_1.ETHHardfork);
                        console.log('txObject=', txObject);
                        tx = new kanban_tx_service_1.default(txObject, { common: customCommon });
                        console.log('privateKey=', privateKey);
                        tx.sign(privateKey);
                        console.log('sign it');
                        serializedTx = tx.serialize();
                        txhex = '0x' + serializedTx.toString('hex');
                        return [2 /*return*/, txhex];
                }
            });
        });
    };
    KanbanService.getNonce = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response_1, json_1, data, response, json, nonce;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(constants_1.Mode.indexOf('API') == 0)) return [3 /*break*/, 3];
                        url = constants_1.BaseUrl + 'kanban/getTransactionCount/' + address;
                        return [4 /*yield*/, node_fetch_1.default(url)];
                    case 1:
                        response_1 = _a.sent();
                        return [4 /*yield*/, response_1.json()];
                    case 2:
                        json_1 = _a.sent();
                        return [2 /*return*/, json_1.transactionCount];
                    case 3:
                        data = {
                            "jsonrpc": "2.0",
                            "method": "kanban_getTransactionCount",
                            "params": [address, 'latest'],
                            "id": 677
                        };
                        return [4 /*yield*/, node_fetch_1.default(constants_1.RPCUrl, {
                                method: 'post',
                                body: JSON.stringify(data),
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 5:
                        json = _a.sent();
                        nonce = parseInt(json.result, 16);
                        console.log('json==', json);
                        return [2 /*return*/, nonce];
                }
            });
        });
    };
    KanbanService.fabToKanbanAddress = function (address) {
        if (!address) {
            return '';
        }
        var bytes = bs58_1.default.decode(address);
        var addressInWallet = bytes.toString('hex');
        return '0x' + addressInWallet.substring(2, 42);
    };
    return KanbanService;
}());
exports.default = KanbanService;
