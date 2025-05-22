import express from "express"
import { createClient } from "redis";
import cors from "cors";

const clinet = createClient();
const app = express();
app.use(express.json())
app.use(cors())

app.post("/sent",  async (req, res)=>{;
    
    const {userId,problemId,message} = req.body;
     await clinet.lPush("responses", JSON.stringify({userId,problemId,message}))

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