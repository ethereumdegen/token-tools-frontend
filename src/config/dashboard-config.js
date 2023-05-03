
  
import favicon from '@/assets/images/warp.gif'
import homeImage from '@/assets/images/degen_tx_banner.png'

const config = {
    title: 'Degen Tx',
    
    favicon: favicon,
    homeImage: homeImage,
     


   

    dashboardMenu: [
        "NAVIGATION",

          
            {
              icon: "Home",
              title: "Dashboard",
              pathname: "/dashboard",
             
           /*   subMenu: [
              {  icon: "",
                pathname: "/chart",
                title: "Chart"
              }
              ]*/


            },
 

            {
              icon: "MessageSquare",
              title: "Invoices",
              pathname: "/dashboard/invoices",             
              
            },
 
      
            {
              icon: "MessageSquare",
              title: "Documentation",
              pathname: "/docs",             
              
            }
    ]
      


  
    

}



export default config;
//module.exports = config;
