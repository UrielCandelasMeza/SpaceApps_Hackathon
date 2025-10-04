import { BrowserRouter } from "react-router-dom";

import {Contact, StarsCanvas, EarthCanvas} from "./components";



const App = () => {
  return (
    <BrowserRouter>
      <div className="relative w-full h-screen overflow-hidden">
        <StarsCanvas />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px]">
          <EarthCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
