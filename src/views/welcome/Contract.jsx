import React from 'react';

import HeroHome from '../partials/HeroHome';
import DegenMevTools from '../partials/DegenMevTools'

import { observer } from "mobx-react";

import { useOutletContext } from 'react-router-dom';

function Home() {



  const tokenAddress = "0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c"


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
 
      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}


        <DegenMevTools 
        
          title="Token Tools"
          tokenAddress={tokenAddress}
        />

        {/* <HeroHome />*/}

      <div>
  

    </div>


    </main>
 

     

    </div>
  );
}

export default observer(Home);