

/*     


    Websocket Client 

    let connect = await connectSocketClient( beamServerUrl )

    
    //once the server connects us , try to join a room 
    subscribeToMessageType('init', async (message:string):Promise<string|undefined>=>{
    let join = await joinRooms(['pendingtx'])
    return undefined 
    })


        //we can listen for messages from the server and do things 
    subscribeToMessageType('pendingtx', async (message:string)=>{

        //do stuff here !! 

        return JSON.stringify({type:"pong",data:"hi"})

    })

    // we can send messages to the server 

    emitMessage( JSON.stringify({ type:'hello', data:'hi' })


*/



import { io , Socket} from "socket.io-client";


let socket: Socket<any>|undefined = undefined 

let socketUid:string|undefined = undefined

 

//const WEBSOCKET_ACCESS_KEY = process.env.WEBSOCKET_ACCESS_KEY


  let connected = false 

  export function isConnected():boolean {
    return connected 
  }



//add a way for another module to subscribe to messages of a certain type 
//and provide a callback function to handle the message
 

let messageSubscriptions:Map<string,Array<(msg:string)=>Promise<string|undefined>>> = new Map()

export function subscribeToMessageType(messageType:string, handler:(msg:string)=>Promise<string|undefined>){
    
    let existingHandlers = messageSubscriptions.get(messageType)
    if(existingHandlers){
        existingHandlers.push(handler)
    }else{
        messageSubscriptions.set(messageType, [handler])
    }
}

export function unsubscribeAllToMessageType(messageType:string){
    messageSubscriptions.set(messageType, [])
}





export async function handleReceivedMessage(message:string): Promise<void>
{
    console.log("received: %s", message);

   

    let parsedMessage = JSON.parse(message)

    let type = parsedMessage.type

    let handlers = messageSubscriptions.get(type)

    if(!handlers) return 
    
    for(let handler of handlers){
        let response = await handler(message)

        if(response && socket){
            socket.emit("message", response);
        }
    }

    
 
}



export async function emitMessage(message:string){
    if(socket){
        socket.emit("message", message);
    }
}


export async function connect(serverUrl: string) : Promise<any>{
  socket = io( serverUrl );


  socket.on("connect", () => {
    console.log("connected");
    connected = true 

    /*if(WEBSOCKET_ACCESS_KEY){
        socket?.emit("authenticate", WEBSOCKET_ACCESS_KEY);
    }*/
  });

  socket.on("init", async (data:string) => {
   socketUid = data   

   await handleReceivedMessage(JSON.stringify({type:"init",data:socketUid}))

  });

  socket.on("message", async (data:string) => {
    
    try{ 
        await handleReceivedMessage(data)
    }catch(e){
        console.error(e)
    }
 
  });

  socket.on("event", (data:string) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    connected = false 
  });

    return socket;
}
 


export async function joinRooms(roomArray:string[]){
  if(socket){
    socket.emit("join", JSON.stringify(roomArray));
  }else{
    console.error("socket not initialized")
  }
}

export async function leaveRooms(roomArray:string[]){
    if(socket){
        socket.emit("leave", JSON.stringify(roomArray));
    }else{
        console.error("socket not initialized")
    }
}