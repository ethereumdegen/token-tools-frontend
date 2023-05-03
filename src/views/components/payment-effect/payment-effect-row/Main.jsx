import {
    Lucide, 
  } from "@/base-components";
 

import { useNavigate } from 'react-router-dom';
import SimpleButton from '@/views/components/button/SimpleButton'
 

import { observer } from "mobx-react";

import {getEtherscanAccountLink} from "@/utils/frontend-helper"

/*
This is used for rendering on the invoice 

*/



function PaymentEffectRow({web3Store, paymentEffectData, chainId}) {

  let navigate = useNavigate();

  
  console.log({paymentEffectData})


  const getEffectTypeFormatted = (effectType) => {  

    switch(effectType){
      case 'product_access_for_account': return 'Grant Product Access'
      default: return 'Unknown Effect Type'
    }

  }
 

  return (
    <div className="border-slate-200 border-2 rounded my-1 w-full">
     
    <div className="flex flex-col">
        
          <div className="p-2 bg-slate-800 text-white rounded text-md mb-2">
            {getEffectTypeFormatted(paymentEffectData.effectType)}
          </div>
    

        <div className=" p-2 ">
          {paymentEffectData && 
           <div className="flex flex-col">

            <div className="flex flex-col my-1">
              <div className='font-bold text-md underline'>Product</div>
              <div 
              className=' ml-16 p-2 bg-green-500 hover:bg-green-400 text-white rounded cursor-pointer'
              onClick={()=>{navigate(`/dashboard/product/${paymentEffectData.productReferenceId}`)}}         
              
              >
                 {paymentEffectData.productName }
              </div>
            </div>

            <div className="flex flex-col my-1">
              <div className='font-bold text-md underline' >Account</div>
              <a 
              className=' ml-16 p-2 bg-blue-500 hover:bg-blue-400 text-white rounded cursor-pointer'
              href={`${getEtherscanAccountLink({publicAddress:paymentEffectData.targetPublicAddress, chainId})}`}
              
              > {paymentEffectData.targetPublicAddress } </a>
            </div>
           
            

          </div>
          
          
          }





        
          
       </div>

 

   

    </div>
    
    </div>
  )

}

  


export default observer(PaymentEffectRow);


