
import React, { useState } from 'react';
import Modal from '../utils/Modal';
 
import {useOutletContext} from 'react-router-dom'



import FunctionInputField from '@/views/components/FunctionInputField.jsx'


 
function Main({func, callContractFn}) {
  
const [web3Store] = useOutletContext()

let [outputMessage,setOutputMessage] = useState(undefined)
///let outputMessage = undefined 

let functionArguments = {}


const callFunction = async( funcName )=>{


    let funcArgNames = func.inputs.map((input)=> input.name)
    let funcArgTypes = func.inputs.map((input)=> input.type)

    let funcArgs = funcArgNames.map((argName)=> functionArguments[argName])


   

    let fullFunctionName = `${funcName}(${funcArgTypes.join(',')})`

    console.log('calling function ', fullFunctionName, funcArgs)

    let response = await callContractFn(fullFunctionName,funcArgs)
 

    if(response){
        let responseStringified = JSON.stringify(response)
        setOutputMessage(responseStringified)
    }
}


const updateFunctionArgument = (  fieldName, fieldValue)=>{

console.log("updateFunctionArgument",  fieldName,fieldValue)
 

functionArguments[fieldName] = fieldValue


}





return (
              <div 
                className="p-2 my-2 border-2 border-gray-500 rounded flex flex-col"
               
                >
                 <div className="font-bold text-md mb-2">
                     {func.name}

                </div>


                <div  className="text-sm py-2 " >
                    <div className="flex flex-col">

                        {func.inputs.map((input,index)=>(

                            <div className="flex flex-row" key={index}>
                                <FunctionInputField
                                key={index}
                                fieldType={input.type}
                                fieldName={input.name}
                               
                                onChange={ updateFunctionArgument }
                                />
                            </div>

                        ))}
                    </div>

                    <button
                    className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-2"
                    onClick={()=>{ callFunction( func.name ) }}>
                        Submit
                    </button>

                    {outputMessage &&
                        <div className="my-2 text-xs ">
                            {outputMessage}
                        </div>
                    }

                </div>

                </div>
    
  );
}

export default Main;