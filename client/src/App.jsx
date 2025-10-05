import { Routes, Route } from "react-router-dom";
import SeleccionarModelo from "./views/SeleccionarModelo";
import Index from "./views/Index"
import SubirFomulario from "./views/SubirFormulario";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Index/>}/>
      <Route path="/SeleccionarModelo" element={<SeleccionarModelo/>}/>
      <Route path="/SubirFormulario" element={<SubirFomulario/>}/>
    </Routes>
  );
};

export default App;
