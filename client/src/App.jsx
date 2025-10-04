import { BrowserRouter } from "react-router-dom";

import { StarsCanvas } from "./components";
import Kepler from "./components/canvas/planetasCanvas/kepler1";

const App = () => {
  return(
    <BrowserRouter>
        <div className='relative z-0'>
          <StarsCanvas />
      </div>
    </BrowserRouter>
  );
}

export default App;
