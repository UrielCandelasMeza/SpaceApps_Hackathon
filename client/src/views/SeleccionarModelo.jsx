import { BrowserRouter } from "react-router-dom";
import { StarsCanvas, HeaderCanvas, Kepler3Canvas, Kepler2Canvas, KeplerCanvas } from "../components";

const SeleccionarModelo = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Estrellas de fondo */}
            <StarsCanvas />
            <HeaderCanvas />
            <h1 className="mt-10 mb-10 text-center text-3xl font-bold tracking-wider">Selecciona tu modelo</h1>
            {/* Planetas al fondo, centrados abajo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-32 w-full max-w-[1200px] content-center">
                <div className="w-[300px] h-[300px] pointer-events-auto">
                    <KeplerCanvas />
                    <button className="px-8 py-3 text-lg font-bold tracking-widest text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                        Kepler Objects of interest(KOI)
                    </button>
                </div>
                <div className="w-[300px] h-[300px] pointer-events-auto">
                    <Kepler3Canvas />
                    <button className="px-8 py-3 text-lg font-bold tracking-widest text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                        Tess objects of interest (TOI)
                    </button>
                </div>
                <div className="w-[300px] h-[300px] pointer-events-auto">
                    <Kepler2Canvas />
                    <button className="px-8 py-3 text-lg font-bold tracking-widest text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                        K2 planets and candidates 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeleccionarModelo;
