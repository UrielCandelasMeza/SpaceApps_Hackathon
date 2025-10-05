import { BrowserRouter } from "react-router-dom";
import { StarsCanvas, Contact, HeaderCanvas } from "../components";

const SubirFomulario = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <StarsCanvas />
            <HeaderCanvas />
            <Contact/>
        </div>
    );
};

export default SubirFomulario;
