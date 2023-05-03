import {
    Lucide, 
  } from "@/base-components";
 

  import { useState } from 'react';


//import { useNavigate } from 'react-router-dom';
import SimpleButton from '@/views/components/button/SimpleButton'
 
import ProjectRow from "@/views/components/project/project-row/Main.jsx";

import { observer } from "mobx-react";
 
import Modal from '@/views/components/modal/Main.jsx'

import AutoForm from '@/views/components/autoform/Main.jsx'

import {createProject} from '@/lib/project-lib'

function ProjectsTree({web3Store, projects, onProductsChanged}) {

 // let navigate = useNavigate();

 //use mobx ? 
 const [isNewProjectModalOpen, setNewProjectModalIsOpen] = useState(false); 


 const toggleNewProjectModal = () => setNewProjectModalIsOpen(!isNewProjectModalOpen);
 const closeNewProjectModal = () => setNewProjectModalIsOpen(false);



const projectFormArchitecture = {

    fields:[
        {name: 'name', type: 'text', label: 'Project Name', placeholder: 'Project Name', required: true},

    ]

}


  return (
     <div>
    
     
        <Modal 
        title={'Create New Project'}
        isOpen={isNewProjectModalOpen}
        closeModal={closeNewProjectModal}
         >
 
                <AutoForm 
                    architecture={projectFormArchitecture}
                    onSubmit={(formdata) => createProject( {
                        name:formdata.name ,
                        publicAddress: web3Store.account,
                        authToken: web3Store.authToken,
                        onFinished: () =>{ onProductsChanged(); closeNewProjectModal() }
                    })}
                
                />

        </Modal>
        
 



        {projects && projects.map((item,index)=>{ 

        return (
            
            <ProjectRow
            
            key={item._id}
            className="my-8"
            web3Store ={web3Store}
            projectData = {item}  
            ></ProjectRow>  

           
        )

        })}



         
        <div className="flex flex-row w-full"> 
            <div className="flex flex-grow text-center">
          
              <SimpleButton
              customClass="hover:bg-slate-300 flex flex-row"
              clicked={() => toggleNewProjectModal()}  
              >  
                <Lucide icon="PlusCircle" className="w-4 h-4 mr-1" />
                
                Add Project </SimpleButton> 

            </div>
            
          </div> 

  </div>
  );

}


export default observer(ProjectsTree);
