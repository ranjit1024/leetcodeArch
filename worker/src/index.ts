import { createClient } from "redis";
const clinet = createClient();

async function  main() {
     await clinet.connect();
    while(1){
        let status = "error";
        const channel = "responses"
        const response = await clinet.brPop('responses',0)
        console.log(response);
        await new Promise((resolve) =>  setTimeout(resolve, 1000));
        if(response){
            status = "success"
        }
        await clinet.publish(channel, status)
        console.log("Proceed users resposonse");
    }   
}

main()