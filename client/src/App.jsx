import { BrowserRouter } from "react-router-dom";

import {Contact, StarsCanvas} from "./components";



const App = () => {
  return (
    <BrowserRouter>
  
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
    </BrowserRouter>
  );
}

export default App;
