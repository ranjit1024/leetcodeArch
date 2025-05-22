import { useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  return (
    <>
      <div className="main">
        <div className="main-area">
          <div>
            <textarea name="" ref={inputRef} id=""></textarea>
          </div>
           <div className="button">

          <button>Submit</button>
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
