import { use, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [socket,setSocket] = useState<WebSocket | null >(null);
  const [message, setMessage] = useState<string|null>(null)
  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080/");
    socket.onopen = ()=>{
      console.log("connected");
      setSocket(socket)
    }
    socket.onmessage = (message)=>{
      setMessage(message.data);

    }
 
  },[])
  return (
    <>
      <div className="main">
        
        <div className="main-area">
          <div>
            <textarea name="" ref={inputRef} id=""></textarea>
          </div>
           <div className="button">

          <button onClick={()=>{
            if(inputRef.current){
              localStorage.setItem("responses",JSON.stringify({
                userId:1,
                problemId:0.9,
                message:inputRef.current.value
              }))
              axios.post("http://localhost:3004/sent", {
                userId:1,
                problemId:0.9,
                message:inputRef.current.value
              })
            };
            socket && socket?.send("submit");
            console.log(message)
          }}>Submit</button>
           </div>
        </div>
        <div className="status">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default App;
