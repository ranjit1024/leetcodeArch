import { useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
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
            }
          }}>Submit</button>
           </div>
        </div>
        <div className="status">
          <p>count: </p>
        </div>
      </div>
    </>
  );
}

export default App;
