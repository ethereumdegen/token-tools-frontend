import {
    Lucide, 
  } from "@/base-components";
 

import { useNavigate } from 'react-router-dom';
import SimpleButton from '@/views/components/button/SimpleButton'
 

import { observer } from "mobx-react";

function ProjectRow({web3Store, projectData}) {

  let navigate = useNavigate();

  
  console.log({projectData})
 

  return (
    <div className="border-slate-200 border-2 rounded p-1 my-1 w-full">
     
    <div className="flex flex-col">
    <div className="flex flex-row w-full">  
         

        <div className="flex flex-grow flex-col ">
         {projectData && <div className="flex flex-row my-2">
            <div className='font-bold text-gray-600 '> {projectData.name } </div>
          
          </div> }

        
          
       </div>


       <div className="flex flex-row"> 
        <div> 
          {projectData && <div 
          className={`mx-4 p-1 capitalize font-bold bg-slate-200 hover:bg-slate-300 border-2 border-gray-400 cursor-pointer`}
          onClick={()=>{navigate(`/dashboard/project/${projectData._id}`)}}
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

  


export default observer(ProjectRow);


