
import React, { useState } from 'react';
import Modal from '../utils/Modal';
 
import {useOutletContext} from 'react-router-dom'


 
function Main({fieldType, fieldName,onChange}) {
  
 

return (
    <div className="flex flex-col my-2" >
        <div> {fieldName}  </div>
        <input  
            className="border-2 border-gray-500 rounded p-1"
            onChange={ (evt)=> {
                onChange(  fieldName, evt.target.value)
            
            }}
        />
        
        
    </div>
    
  );
}

export default Main;