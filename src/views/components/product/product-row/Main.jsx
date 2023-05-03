import {
    Lucide, 
  } from "@/base-components";
 

import { useNavigate } from 'react-router-dom';
import SimpleButton from '@/views/components/button/SimpleButton'
 

import { observer } from "mobx-react";

function ProductRow({web3Store, productData}) {

  let navigate = useNavigate();

  
  console.log({productData})


 

  return (
    <div className="border-slate-200 border-2 rounded p-4 my-4 w-full">
     
    <div className="flex flex-col">
    <div className="flex flex-row w-full">  
         

        <div className="flex flex-grow flex-col ">
         {productData && <div className="flex flex-row my-2">
            <div className='font-bold  '> {productData.name } </div>
          
          </div> }

        
          
       </div>


       <div className="flex flex-row"> 
        <div> 
          {productData && <div 
          className={`mx-4 p-2 capitalize font-bold bg-slate-200 border-2 border-gray-400 cursor-pointer`}
          onClick={()=>{navigate(`/dashboard/product/${productData._id}`)}}
          > 
            View
          </div>}
         </div>
        
         </div> 
      
    </div>

    <div className="flex flex-row w-full flex-grow"> 

      <div className="flex flex-grow"></div>
     
    </div>

    </div>
    
    </div>
  )

}

  


export default observer(ProductRow);


