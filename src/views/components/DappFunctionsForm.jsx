
import React, { useState } from 'react';
import Modal from '../utils/Modal';
 
import {useOutletContext} from 'react-router-dom'

import {ethers} from 'ethers'

import FunctionSection from '@/views/components/FunctionSection.jsx'

function Main({contractAddress,contractAbi}) {
 

const [web3Store] = useOutletContext()
 
const callContractFn = async( funcName, funcArgs )=>{

  let provider = web3Store.provider

  let signer = provider.getSigner(web3Store.account)

  let contract = new ethers.Contract(contractAddress, contractAbi, signer);

  let response = await contract[funcName](...funcArgs)

  console.log({response})
  return response 
}



const contractFunctions = contractAbi.filter((frag)=> frag.type == 'function')
 

return (
    <div  >
        <div className="my-2">
            Contract Functions 
        </div>

        <div>
           { contractAddress }
        </div>

        <div>
            {contractFunctions.map((func,index)=>(

                <FunctionSection
                   key={index}
                  func={func} 
                  callContractFn={callContractFn} 
                />
               

            )) }
        </div>
 

    </div>
    
  );
}

export default Main;