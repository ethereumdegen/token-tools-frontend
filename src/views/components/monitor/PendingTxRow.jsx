import React, { useState } from 'react';


function Main({row}){

    let rowContent = JSON.stringify(row)
    return (
    <div className='text-white py-2 break-all' style={{maxWidth:"100%"}}>

        {rowContent}

    </div>)

}


export default Main;