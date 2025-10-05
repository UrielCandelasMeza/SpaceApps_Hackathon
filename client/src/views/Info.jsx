// SubirFomulario.jsx

import { useLocation } from "react-router-dom"; // Importar useLocation
import { StarsCanvas } from "../components";
import Resultado from "../components/Resultado";

const Info = () => {
    // Usar useLocation para obtener el objeto de la ubicación
    const location = useLocation();
    
    // Acceder al valor que pasamos: location.state.selectedModel
    const selectedModel = location.state?.selectedModel || "MODELO_POR_DEFECTO"; 
    // Usa '?' (optional chaining) para evitar errores si se accede a la ruta directamente sin state
    // y asigna un valor por defecto si no existe (opcional pero recomendado)

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Estrellas de fondo */}
            <StarsCanvas />
            {/* Pasa el modelo seleccionado como prop a Contact */}
            <Resultado selectedModel={selectedModel} />
        </div>
    );
};

export default Info;