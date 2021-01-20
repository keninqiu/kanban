import bs58 from 'bs58';
import { BaseUrl, GasLimit, GasPrice, ETHChain, ETHHardfork, KANBAN, Mode, RPCUrl } from './constants';
import fetch from "node-fetch";
import Common from 'ethereumjs-common';
import KanbanTxService from './kanban.tx.service';
export default class KanbanService {

    public static async sendKanbanSignedTransaction(txHex: string) {
        const data = {
            signedTransactionData: txHex
        };
        let txHash = '';
        let errMsg = '';

        if(!txHex) {
            return { txHash, errMsg };
        }
        if(Mode.indexOf('API') == 0) {
            const url = BaseUrl + 'kanban/sendRawTransaction';
            try {
                    const response = await fetch(url, 
                        {
                            method: 'post',
                            body:    JSON.stringify(data),
                            headers: { 'Content-Type': 'application/json' },
                        });
                    const json = await response.json();
                    if (json) {
                        if (json.transactionHash) {
                            txHash = json.transactionHash;
                        } else
                        if (json.Error) {
                            errMsg = json.Error;
                        }
                    }
                } catch (err) {
                    errMsg = 'Error';
                    if (err.error && err.error.Error) {
                        errMsg = err.error.Error;
                    }
    
                    if (err.data && err.data.Error) {
                        errMsg = err.data.Error;
                    }
            }
    
            return { txHash, errMsg };
        }




        try {

            const data = {
                "jsonrpc":"2.0",
                "method":"kanban_sendRawTransaction",
                "params":[txHex],
                "id":677      
              }            
            const response = await fetch(RPCUrl, 
                    {
                        method: 'post',
                        body:    JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' },
                    });
                const json = await response.json();
                if (json) {
                    if (json.result) {
                        txHash = json.result;
                    } else
                    if (json.Error) {
                        errMsg = json.Error;
                    }
                }
            } catch (err) {
                errMsg = 'Error';
                if (err.error && err.error.Error) {
                    errMsg = err.error.Error;
                }

                if (err.data && err.data.Error) {
                    errMsg = err.data.Error;
                }
        }

        return { txHash, errMsg };



    }

    public static async getHex(smartContractAddress: string, abiHex: string, privateKey: any, address: string | undefined, value:number = 0)  {
        if(!address) {
            return '';
        }

        console.log('address=', address);
        const nonce = await this.getNonce(address);
        console.log('nonce=', nonce);
        const txObject = {
            to: smartContractAddress,
            nonce: nonce,
            data: abiHex,
            value: value,
            gas: GasLimit,
            gasPrice: GasPrice 
          };  
          
        const customCommon = Common.forCustomChain(
            ETHChain,
            {
              name: KANBAN.chain.name,
              networkId: KANBAN.chain.networkId,
              chainId: KANBAN.chain.chainId
            },
            ETHHardfork,
          );
          console.log('txObject=', txObject);
          const tx = new KanbanTxService(txObject, { common: customCommon });
            
          console.log('privateKey=', privateKey);
          tx.sign(privateKey);
          console.log('sign it');
          const serializedTx = tx.serialize();
          const txhex = '0x' + serializedTx.toString('hex');
          return txhex;          
    }

    public static async getNonce(address: string) {
        if(Mode.indexOf('API') == 0) {
            let url = BaseUrl + 'kanban/getTransactionCount/' + address; 
            const response = await fetch(url);
            const json = await response.json();
            return json.transactionCount;   
        }
 

        const data = {
            "jsonrpc":"2.0",
            "method":"kanban_getTransactionCount",
            "params":[address, 'latest'],
            "id":677      
          }        
        const response = await fetch(RPCUrl, 
            {
                method: 'post',
                body:    JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
        const json = await response.json(); 
        let nonce = parseInt(json.result, 16);
        console.log('json==', json);
        return nonce; 

    }

    public static fabToKanbanAddress(address: string | undefined) {
        if(!address) {
            return '';
        }
        const bytes = bs58.decode(address);
        const addressInWallet = bytes.toString('hex');
        return '0x' + addressInWallet.substring(2, 42);
    }    
}