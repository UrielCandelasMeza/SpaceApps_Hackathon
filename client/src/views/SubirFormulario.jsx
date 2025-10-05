import { BrowserRouter } from "react-router-dom";
import { StarsCanvas, Contact } from "../components";

const SubirFomulario = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Estrellas de fondo */}
            <StarsCanvas />
            <Contact/>
        </div>
    );
};

export default SubirFomulario;
