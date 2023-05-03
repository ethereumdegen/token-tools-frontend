import {
    Lucide, 
  } from "@/base-components";
 

  import { useState } from 'react';


//import { useNavigate } from 'react-router-dom';
 
import ProductRow from "@/views/components/product/product-row/Main.jsx";

import { observer } from "mobx-react";
 
import Modal from '@/views/components/modal/Main.jsx'

import AutoForm from '@/views/components/autoform/Main.jsx'

import {createProject} from '@/lib/project-lib'

function ProductsTree({web3Store, products, onProductsChanged}) {

 // let navigate = useNavigate();

 //use mobx ? 
 const [isNewProjectModalOpen, setNewProjectModalIsOpen] = useState(false); 
 const [isNewProductModalOpen, setNewProductModalIsOpen] = useState(false);


 const toggleNewProjectModal = () => setNewProjectModalIsOpen(!isNewProjectModalOpen);
 const closeNewProjectModal = () => setNewProjectModalIsOpen(false);



const projectFormArchitecture = {

    fields:[
        {name: 'name', type: 'text', label: 'Project Name', placeholder: 'Project Name', required: true},

    ]

}


  return (
     <div>
    
     
 



        {products && products.map((item,index)=>{ 

        return (
            
            <ProductRow
            key={item._id}
            className="my-8"
            web3Store ={web3Store}
            productData = {item}

                    
            ></ProductRow> 
        
 
        )

        })}



         
     

  </div>
  );

}


export default observer(ProductsTree);
