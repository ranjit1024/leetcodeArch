import express from "express";
import cors from "cors"
import Websocket,{WebSocketServer} from "ws";
import {createClient} from "redis"
const app = express();
app.use(cors());
app.use(express.json());
const client = createClient();


const server = app.listen(8080, ()=>{
    console.log("listing on port : 8080");
})
const wss = new WebSocketServer({server})

wss.on('connection',  async (socket)=>{
    socket.on('error', console.error);
    await client.connect();
    
    socket.on('message', async (data:any, isBinary:false)=>{
        if(socket.readyState === Websocket.OPEN){
            client.subscribe('responses', (message)=>{
                socket.send(message, { binary:isBinary});
            })
        }
    })
    socket.send("Connection established")
})