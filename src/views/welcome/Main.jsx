import React from 'react';

import HeroHome from '../partials/HeroHome';
import DegenMevTools from '../partials/DegenMevTools'

import { observer } from "mobx-react";

import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TablePaginated from '@/views/components/table/TablePaginated';

import mfersimage from '@/assets/images/gmmfers.gif';

function Home() {


 
  const btnLinkStyle = "p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
 
      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}


      <div className="container mt-8">
        <div className="flex flex-col"> 
          <div className="w-full">
          <img
            src={mfersimage}
            style={{maxHeight:"90vh", aspectRatio:1}}
            className="mx-auto"
          />
          </div>
        
          </div>
          <div> 
        </div>
        </div>

 

        {/* <HeroHome />*/}

      <div>
 
        
 

      </div>


      </main>
 

     

    </div>
  );
}

export default observer(Home);