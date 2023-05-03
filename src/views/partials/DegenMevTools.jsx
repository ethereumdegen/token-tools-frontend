import React, { useState } from 'react';
import Modal from '../utils/Modal';

 
import FrontendConfig from '@/config/frontend-config'
import ContractsConfig from '@/config/contracts'
 
import DappFunctionsForm from '@/views/components/DappFunctionsForm.jsx'

import DegenMevContractABI from "@/config/abi/DegenMev103.abi.json"

import ContractABI from "@/config/abi/erc20.abi.json"



function Main({title,tokenAddress}) {
  

  return (
    <section className="relative">

      
      

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-4 pb-12 md:pt-8 md:pb-20">

          <div className=" my-4 p-1 bg-black  rounded ">
            <div className="font-bold p-2 text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500">
               {title}
              </div>

          </div>

          {/* Section header */}
          <div className="text-left pb-12 md:pb-16">

         
                <DappFunctionsForm
                  contractAddress={tokenAddress}
                  contractAbi={ContractABI}
                
                />
            
          </div>


          

        

        </div>

      </div>
    </section>
  );
}

export default Main;