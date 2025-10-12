import { BrowserRouter,useLocation } from "react-router-dom";

import { StarsCanvas, EarthCanvas } from "../components";
import { HeaderCanvas, PlanetButtonCanvas, InfoBox} from "../components";


const Index = () => {
        // 1. Obtener la ruta actual
    const location = useLocation();
    const currentPath = location.pathname; // Será "/", "/about-us", etc.

    // Función para determinar qué contenido mostrar
    const getPageContent = (path) => {
        switch (path) {
            case '/acerca-de':
                return { title: "About us", text: "We are a multidisciplinary team brought together by curiosity, creativity, and the shared belief that innovation can shape the future of our planet and beyond." };
            case '/creditos':
                return { title: "Team Name: 2025 NASA Space Apps Challenge Team Members", 
                    text:[
                        " Candelas Mezas Uriel" ,
                        " García Bautista César Emiliano",
                        "Franco Rosales Emiliano Didier",
                        "Sanchez Cano Alejandro",
                        "Benitez Alvarez Efrain",
                        " Ferrer Parra Cruz Ricardo" 
                    ]};
            case '/mision':
                return { title: "Our mission", text: "We are a team of innovators, dreamers, and problem-solvers united by one goal: to create solutions that push the boundaries of science, technology, and exploration. Through this NASA hackathon, we aim to imagine the future — not as a distant possibility, but as something we can build today." };
            case '/predicciones':
            return { 
                title: "PREDICCIONES PASADAS", 
                cards: [
                    { type: "TYPE A", file: "PLACEHOLDER.CSV" },
                    { type: "TYPE B", file: "PLACEHOLDER.CSV" },
                    { type: "TYPE C", file: "PLACEHOLDER.CSV" },
                ] 
            };
            case '/':
            default:
                return { title: "Conocenos", text: "Presiona un botón para ver nuestro contenido..." };
        }
    };

    const content = getPageContent(currentPath);
 return (
        <div className="relative w-full h-screen overflow-hidden">
            <StarsCanvas />
            <HeaderCanvas currentTitle={content.title} /> 
            <div id="contentBox" className="flex flex-col items-center justify-center absolute transform -translate-x-1/2 -translate-y-1/2 z-20">
                <InfoBox content={content} />
            </div>
            <PlanetButtonCanvas/>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full overflow-hidden">
                <EarthCanvas />
            </div>
        </div>
    );
};

export default Index;
