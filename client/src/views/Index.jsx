import { BrowserRouter } from "react-router-dom";

import { StarsCanvas, EarthCanvas } from "../components";
import { HeaderCanvas, PlanetButtonCanvas } from "../components";

const Index = () => {
    return (
        
        <div className="relative w-full h-screen overflow-hidden">
            <StarsCanvas />
            <HeaderCanvas />
            <PlanetButtonCanvas/>
            <div className="absolute bottom-0 
            left-1/2 transform -translate-x-1/2 
            w-[600px] h-[600px] rounded-full overflow-hidden">
                <EarthCanvas />
            </div>
        </div>
    );
};

export default Index;
