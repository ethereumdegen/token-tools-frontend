import {
    Lucide,
   
    
  } from "@/base-components";


import { broadcastTransaction, denyTransaction, txIsConfirmable } from '@/utils/transaction-helper.js'

import { useNavigate } from 'react-router-dom';
import SimpleButton from '@/views/components/button/SimpleButton'
 
import { observer } from "mobx-react";

function Main({web3Store, transactionCount , txData}) {

  let navigate = useNavigate();

  
  console.log({txData})


  const getColorFromStatus = (nStatus) => {

    switch(nStatus){
      case 'finalized': return 'bg-teal-400'
      case 'denied': return 'bg-red-400'
      case 'pending': return 'bg-yellow-400'
      default: return 'bg-slate-200'
    }

    
  }

  return (
    <div className="border-slate-200 border-2 rounded p-4 my-4 w-full">
     
    <div className="flex flex-col">
    <div className="flex flex-row w-full">  
         

        <div className="flex flex-grow flex-col ">
         {txData && <div className="flex flex-row my-2">
            <div className='font-bold  '>Contract </div>
            <div className='mx-4'> {txData.contractName }</div>
          </div> }

         {txData && <div className="flex flex-row my-2">
            <div className='font-bold  '>Function </div>
            <div className='mx-4'> { txData.decodedDataResponse?.signature  }</div>
          </div> }

          {txData && <div className="flex flex-row my-2">
            <div className='font-bold  '>Nonce </div>
            <div className='mx-4'> { txData.nonce  }</div>
          </div> }

          
       </div>


       <div className="flex flex-row"> 
        <div> 
          {txData && <div className={`mx-4 p-2 capitalize font-bold ${getColorFromStatus(txData.networkStatus)} border-2 border-gray-400`}> 
              {txData.networkStatus}
          </div>}
         </div>
        
         </div> 
      
    </div>

    <div className="flex flex-row w-full flex-grow"> 

      <div className="flex flex-grow"></div>
     {txData &&  <div className="flex ">

        {txIsConfirmable(txData,transactionCount) && <SimpleButton
              customClass={ 'hover:bg-green-500 hover:text-white' }
              clicked={ () => {  broadcastTransaction(web3Store, txData._id) } }
        >
          Confirm
          </SimpleButton> }
        <SimpleButton
           customClass={ 'hover:bg-slate-500 hover:text-white' }
          clicked={ () => {  navigate(`/dashboard/transaction/${txData._id}`) } }
           
           >
          View Details
          </SimpleButton>
        
        {txIsConfirmable(txData,transactionCount) &&  <SimpleButton
         customClass={ 'hover:bg-red-500 hover:text-white' }
         clicked={ () => {  denyTransaction(web3Store, txData._id) } }
         >
          Drop
          </SimpleButton>   }


      </div>}
    
    </div>

    </div>
    
    </div>
  )

}

  


export default observer(Main);


