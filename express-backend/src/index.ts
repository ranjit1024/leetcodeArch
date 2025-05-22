import express from "express"
import { createClient } from "redis";
const clinet = createClient();
const app = express();
app.use(express.json())

app.post("/sent", (req, res)=>{
    const {userId,problemId,message} = req.body;
    clinet.lPush("responses", JSON.stringify({userId,problemId,message}))
    res.json({
        message:'Successfully send'
    })
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