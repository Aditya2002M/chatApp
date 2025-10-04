import {WebSocketServer} from "ws"

const wss = new WebSocketServer({
    port:8080
}) 
let count =0;


wss.on("connection",(socket)=>{
    console.log(`user connected #`+count);
    count =count +1;
})