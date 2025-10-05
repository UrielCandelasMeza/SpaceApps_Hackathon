
// NavButton.jsx
import React from 'react';
// Asegúrate de recibir 'path' en los props
const NavButton = ({ title, angle, path }) => { 
  const hoverTransform = `rotate(-${angle}deg) translateY(-4px)`;
  const baseTransform = `rotate(-${angle}deg)`; 

  return (
    <div 
      id = "planetButton"
      className="absolute origin-center pointer-events-auto"
      style={{ 
        transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg) translateY(-300px)`,
      }}
    >
      <a 
        // CAMBIO CLAVE: Usamos 'path' en lugar del hash '#'
        href={path} 
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


// PlanetButtonCanvas.jsx
const PlanetButtonCanvas = () => {

  const menuItems = [
    { title: "START", angle: 0, path: "/SeleccionarModelo" },
    { title: "ABOUT US", angle: 330, path: "/acerca-de" },
    { title: "CREDITS", angle: 300, path: "/creditos" },
    { title: "PAST PRED.", angle: 30, path: "/predicciones" },
    { title: "MISSION", angle: 60, path: "/mision" },
  ];

  return (
    <div className="container_body relative w-full h-full min-h-screen">
        <div className="absolute inset-0 z-10 pointer-events-none">
            {menuItems.map((item) => (
                <NavButton 
                    key={item.title}
                    title={item.title} 
                    angle={item.angle} 
                    path={item.path}
                />
            ))}
        </div>
    </div>
  );
};

export default PlanetButtonCanvas;