import React, { useState , useEffect } from 'react';
import Modal from '../utils/Modal';

import { getEnvironmentName } from '../../lib/app-helper';
 
 
import serverConfig from "@/config/server-config.json"
import PendingTxRow from '@/views/components/monitor/PendingTxRow.jsx';
import MonitorPanel from '@/views/components/monitor/MonitorPanel.jsx';

import {connect as connectSocketClient,
   joinRooms,
   subscribeToMessageType
  
  } from "@/lib/websocket-client"

function Main() {


  const envName = getEnvironmentName()

  const mevCloudServerUri = serverConfig[envName].mevCloudServerUri
 
  const [pendingTx, setPendingTx] = useState([])
  const pendingTxRef = React.createRef();
  pendingTxRef.current = pendingTx;


  const initSocketClient = () => {

    console.log('connecting', mevCloudServerUri)

    const socketClient = connectSocketClient(mevCloudServerUri)


    subscribeToMessageType('init', (message) => {
      joinRooms(['pendingtx'])
  
    })
  
    subscribeToMessageType('pendingtx', (message) => {
      
      let MAX_LENGTH = 20 
  
      console.log('learned about pendingtx' , pendingTx)
  
      let array = JSON.parse(JSON.stringify( pendingTx ))
  
      let parsedMessage = JSON.parse(message)
      let transaction = parsedMessage.data 

      
      array.push(transaction)
  
      if(array.length > MAX_LENGTH){
        array.shift()
      }

      
      setPendingTx(array)
  
    })
  }


  useEffect(
    () => {  
       
     /* let test_tx = JSON.parse(`
      {"hash":"0xea2856eabc4b9f3778a4f4cc1558cfc51d984fa076bb6b2b0bff2a4db78ada2d","chainId":5,"type":2,"to":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","gasPrice":{"type":"BigNumber","hex":"0x0301b4953a"},"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x0301b4953a"},"gasLimit":{"type":"BigNumber","hex":"0x3d0900"},"value":"10000000","data":"0x7ff36ab500000000000000000000000000000000000000000000000000000000b1914c7100000000000000000000000000000000000000000000000000000000000000800000000000000000000000005a5b978142c8f08dd013901b50892bac49f3b70000000000000000000000000000000000000000000000000000000000644c05460000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d6000000000000000000000000ab89a7742cb10e7bce98540fd05c7d731839cf9f"}
      
      `)

      setPendingTx([
        test_tx, 
       
      ])*/

     
      }, []);

      
      initSocketClient()
 
  //const DegenMevContractAddress = ContractsConfig[networkName].degenmev.address
  


  return (
    <section className="relative">

      
      

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-4 pb-12 md:pt-8 md:pb-20">

          <div className=" my-4 p-1 bg-black  rounded ">
            <div className="font-bold p-2 text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500">
              Degen MEV
              </div>

          </div>

          {/* Section header */}
          <div className="text-left pb-12 md:pb-16">

         
                <MonitorPanel
                  rows={pendingTx}
                  rowComponent={PendingTxRow}
                  
                
                />
            
          </div>


          

        

        </div>

      </div>
    </section>
  );
}

export default Main;