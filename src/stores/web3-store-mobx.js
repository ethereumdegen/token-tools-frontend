


import { ethers } from "ethers";
import { isArray, parseInt } from 'lodash';
import { useState } from "react";
import { atom, useRecoilState } from "recoil";

import {getEnvironmentName} from '@/lib/app-helper'
import {readJSONFile} from '@/lib/file-helper'

const POLLING_INTERVAL = 12000;
//const RPC_URL = process.env.VUE_APP_RPC_URL;

import axios from 'axios'
import { makeObservable, observable, action } from "mobx"

 const ENV_MODE = getEnvironmentName()
 import serverConfig from  '@/config/server-config.json' 

 const localServerConfig = serverConfig[ENV_MODE]
export class Web3Store {
    
    provider = undefined
    signer = undefined 
    account=undefined
    active=false
  //  balance=0
    chainId=undefined 

    transactionCount = undefined 

    authorized = false
    challenge=undefined
    authToken=undefined



    customCallbacks = {} 
 
  
    constructor() {
 
      
        makeObservable(this, {
            provider: observable,
            signer: observable,
            account: observable,
            active: observable,
        //    balance: observable,
            challenge: observable,
            authToken: observable,
            authorized: observable, 
             

            connect: action,
            disconnect: action,
            registerWalletCallbacks: action ,

            requestChallengeAndSign: action,
          
            registerCustomCallback : action 
        })
        
    }
 
    async connect() {

      this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          // Prompt user for account connections
      await this.provider.send("eth_requestAccounts", []);
      this.signer = this.provider.getSigner();
      console.log("Account:", await this.signer.getAddress());
      let account = await this.signer.getAddress()

    //  let balance = await this.signer.getBalance()
      //let balanceFormatted = ethers.utils.formatEther(balance)

      const { chainId } = await this.provider.getNetwork()

  

      this.account = account 
     // this.balance = balance 
      this.active = true 
      this.chainId = chainId 
      
      this.registerWalletCallbacks()

    }

    async disconnect() {

      this.account = undefined
      this.active = false 
      this.balance = 0  

    }


    //these dont work properly like this w strict mode ...
    registerWalletCallbacks(){

      window.ethereum.on('connect', ({chainId}) => {
        this.chainId = chainId
        this.emitCustomEvent('connect')
      });

      window.ethereum.on('chainChanged', (chainId) => {
        this.chainId = chainId
        this.emitCustomEvent('chainChanged')
        console.log('chain changed')
      });

      window.ethereum.on('accountsChanged', async (accounts) => {
        this.account = accounts[0]
        this.emitCustomEvent('accountsChanged')
        console.log('account changed')
       
      });

    }

    emitCustomEvent(name){

      
      if(isArray(this.customCallbacks[name])){
       for(let cb of this.customCallbacks[name]){ 

            cb() 

       }
      }

    }

    /*
      Allows for registering callbacks to trigger
      when certain wallet callbacks trigger such as accountsChanged
    */
    registerCustomCallback( name, callback   ){

      if(!isArray(this.customCallbacks[name])){
        this.customCallbacks[name] = [] 
      }

      this.customCallbacks[name].push( callback )

      console.log('registered callback ', name )

    }



    async requestChallengeAndSign(){

      //request the challenge from the server 
      // pop up metamask to personal sign it 
      // submit that signature to the server 

      const backendServerUrl = localServerConfig.backendServerUrl

      console.log(`${backendServerUrl}/generateChallenge`)

      let challengePostRequest = await axios.post(`${backendServerUrl}/generateChallenge`,{ publicAddress: this.account })

      let challengeResponse = challengePostRequest.data

      if(challengeResponse.success){
 
        let challenge = challengeResponse.data.challenge

        this.challenge = challenge

        const publicAddress = this.account

  
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        let signature = await provider.getSigner(publicAddress).signMessage(challenge)
 
        
        let authorizationPostRequest = await axios.post(`${backendServerUrl}/generateUserSession`,{ publicAddress: this.account, signature: signature, challenge: challenge  })

        let authorizationResponse = authorizationPostRequest.data 

        console.log({authorizationResponse})

        let {sessionToken} = authorizationResponse.data

        console.log({sessionToken})

        this.authToken = sessionToken
        this.authorized = true 

        console.log('set auth token', this.authToken)

        return true 
      }else{
        console.error(challengeResponse.error)
      }

      return false 
 


    }


 

}



export async function getRpcIdentifierVersion(){

  let response = await window.ethereum.request({
    method: 'eth_getCode',
    params: [
       '0xB11ca87E32075817C82Cc471994943a4290f4a14','latest'
    ],
  })

  console.log('client version', response)

  return response
}


export async function requestAddNetwork({chainId,chainName,rpcUrl}){
  console.log('request add network')

  const params = [{
    chainId,
    chainName, 
    rpcUrls:[rpcUrl] ,
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH", 
      decimals: 18,
    },
  }]

  console.log({params})
  let addedNetwork = await window.ethereum.request({
    id: 1,
    jsonrpc: "2.0", 
    method: 'wallet_addEthereumChain',
    params 
  })


  console.log({addedNetwork})
}
 

export function getNetworkNameFromChainId(chainId){

  switch(chainId){
    case 1: return 'mainnet'
    case 4: return 'rinkeby'
    case 5: return 'goerli'
    //case 17001: return 'mainnet'
    //case 17005: return 'goerli'

    default: return 'unknown'
  }

}