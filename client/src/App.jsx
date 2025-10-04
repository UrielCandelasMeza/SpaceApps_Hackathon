import { BrowserRouter } from "react-router-dom";

import { StarsCanvas } from "./components";

const App = () => {
  return(
    <BrowserRouter>
      <div className='w-full h-auto relative z-0'>
          <StarsCanvas />
        </div>
    </BrowserRouter>
  );
}

export default App;
