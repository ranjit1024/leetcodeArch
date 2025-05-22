import express from "express"
import { createClient } from "redis";
import cors from "cors";

const clinet = createClient();
const app = express();
app.use(express.json())
app.use(cors())

app.post("/sent",  async (req, res)=>{;
    let status = "error";
    const channel = "responses"
    const {userId,problemId,message} = req.body;
    const push =  await clinet.lPush("responses", JSON.stringify({userId,problemId,message}))
    if(push){
        status = "success"
    }
    res.json({
        message:'Successfully send'
    })
    await clinet.publish(channel, status)
})

async function startServer() {
    try{
        await clinet.connect();
        app.listen(3004, ()=>{
            console.log("listing on port number 3004")
        })    
    }
    catch(e){
        console.log(e)
    }
}
startServer();