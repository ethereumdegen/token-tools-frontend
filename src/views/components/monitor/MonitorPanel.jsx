import React, { useState , createElement } from 'react';


function Main({rows, rowComponent}){

/*

<RowComponent 
                key={index}
                row={row}
            />
*/
    return (
    <div>
        <div 
            className="flex flex-col flex-grow overflow-y-auto bg-black text-white break-all p-4 border-2 border-gray-200"
            style={{minHeight: "40vh", maxHeight:"160vh", maxWidth:"100%"}}
        >


        {rows.map((row, index) =>  { 
            
            
            return createElement(
                rowComponent,
                { className: '' , key:index, row:row  }
               
              );


        })}

        </div>

    </div>
    )

}


export default Main;