import { BrowserRouter } from "react-router-dom";

import { StarsCanvas } from "./components";
import { HeaderCanvas } from "./components"; 

const App = () => {
  return (
    <BrowserRouter>
          <HeaderCanvas />
          <StarsCanvas />
    </BrowserRouter>
  );
}

export default App;
