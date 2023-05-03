
  
import favicon from '@/assets/images/warp.gif'
import homeImage from '@/assets/images/degen_tx_banner.png'

const config = {
    title: 'Degen Tx',
    tagline: 'Ethereum Payments For Web3 Services',
    url: 'https://degentx.com',
    baseURL: '/',
    favicon: favicon,
    homeImage: homeImage,
     


    navbar: {
        title: '',
        logo: {
          alt: 'Pepe Logo',
          src: 'assets/images/pepe_favicon.png',
        },
        items: [
         
          { to:'/', label:'Home' },
          { to:'/contract', label:'Contract' },
     
          
        ],
    },

      accountMenu: {


          items: [
            {
              to:'/',
              label: 'Home'
            },
          


          ]
      },


    footer: {
        style: 'light',
        columns: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/',
              },

              {
                label: 'Contract',
                href:"https://etherscan.io/address/"

              }

            
            ],
          },
          {
            title: 'Community',
            items: [
              
            ],
          },
          {
            title: 'More',
            items: [
             
              {
                label: 'GitHub',
                href: 'https://github.com/degentx',
              },
            
    
             
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} `,

        socials:{
          twitter:"https://twitter.com/",
          github:"https://github.com/degentx"
        }
      }
    

}



export default config;
//module.exports = config;
