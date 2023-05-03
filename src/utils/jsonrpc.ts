

import axios from 'axios'


let localNodeUrl = "http://localhost:8545"

export async function queryJsonRpc({
    method,
    params,

}:{
    method:string,
    params:any[]

}){

    let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
   let data = {
    jsonrpc: '2.0',
    method: method,
    params: params,
    id: 1,
}
  
       /* let response = await axios({
            method: 'post',
            url: localNodeUrl,
            data:  {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: 1,
            },
            headers

        })*/

        let response = await axios.post(localNodeUrl, data, {headers})

        return response 
    

}