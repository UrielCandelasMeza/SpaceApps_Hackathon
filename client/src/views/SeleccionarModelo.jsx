import { BrowserRouter } from "react-router-dom";
import { StarsCanvas } from "../components";

const SeleccionarModelo = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Estrellas de fondo */}
            <StarsCanvas />

            {/* Planetas al fondo, centrados abajo */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1200px] h-[400px]">
                <h1>Planeta 1</h1>
            </div>

            {/* Contenido encima */}
            <div className="relative z-10">
                <h1>Contenido encima</h1>
            </div>
        </div>
    );
};

export default SeleccionarModelo;
