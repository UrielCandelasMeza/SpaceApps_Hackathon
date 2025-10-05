import { BrowserRouter } from "react-router-dom";

import { StarsCanvas, EarthCanvas } from "../components";
import { HeaderCanvas } from "../components";

const Index = () => {
    return (
        
        <div className="relative w-full h-screen overflow-hidden">
            <StarsCanvas />
            <HeaderCanvas />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px]">
                <EarthCanvas />
            </div>
        </div>
    );
};

export default Index;
