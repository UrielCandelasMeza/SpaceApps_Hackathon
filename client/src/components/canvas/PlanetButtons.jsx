
import React from 'react';
const NavButton = ({ title, angle }) => {
  const hoverTransform = `rotate(-${angle}deg) translateY(-4px)`;
  const baseTransform = `rotate(-${angle}deg)`; 

  return (
    <div 
      className="absolute top-1/2 left-1/2 origin-center pointer-events-auto"
      style={{ 
        transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg) translateY(-300px)`,
      }}
    >
      <a 
        href={`#${title.toLowerCase().replace(' ', '-')}`} 
        className="inline-block text-white text-lg tracking-widest uppercase 
                   transition-all duration-300 whitespace-nowrap 
                   text-glow-white" 
        
        style={{ 
          transform: baseTransform,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = hoverTransform;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = baseTransform;
        }}
      >
        {title}
      </a>
    </div>
  );
};


const PlanetButtonCanvas = () => {

  const menuItems = [
    { title: "START", angle: 0 },         // Arriba (Centro)
    { title: "ABOUT US", angle: 330 },    // Izquierda superior
    { title: "CREDITS", angle: 300 },     // Izquierda media
    { title: "PAST PRED.", angle: 30 },   // Derecha superior
    { title: "MISSION", angle: 60 },      // Derecha media
  ];

  return (
    <div className="container_body relative w-full h-full min-h-screen">
        

        <div className="absolute inset-0 z-10 pointer-events-none">
            {menuItems.map((item) => (
                <NavButton 
                    key={item.title}
                    title={item.title} 
                    angle={item.angle} 
                />
            ))}
        </div>

    </div>
  );
};

export default PlanetButtonCanvas;