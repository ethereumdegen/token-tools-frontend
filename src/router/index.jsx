import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/Main";
 
 
import Welcome from '../views/welcome/Main'
 
import Contract from '../views/welcome/Contract'
 
 
import ErrorPage from "../views/error-page/Main";
 
    
function Router() {
  const routes = [
    {
      
      element: <MainLayout />,
      children:  [ 
          {
            path:"/",
            element: <Welcome />, 
          },


          {
            path:"/contract",
            element: <Contract />, 
          },

         
 

        ]
      
    },
    
   
 
  
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
