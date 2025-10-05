import { Routes, Route } from "react-router-dom";
import SeleccionarModelo from "./views/SeleccionarModelo";
import Info from "./views/Info";
import Index from "./views/Index"
import SubirFomulario from "./views/SubirFormulario";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Index/>}/>
      <Route path="/SeleccionarModelo" element={<SeleccionarModelo/>}/>
      <Route path="/SubirFormulario" element={<SubirFomulario/>}/>
      <Route path="/Info" element={<Info/>}/>
      <Route path="/acerca-de" element={<Index />} /> 
      <Route path="/creditos" element={<Index />} /> 
      <Route path="/mision" element={<Index />} />
      <Route path="/predicciones" element={<Index />} /> 
    </Routes>
  );
};

export default App;
