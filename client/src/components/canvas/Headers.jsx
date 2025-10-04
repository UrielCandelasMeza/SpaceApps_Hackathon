
const HeaderCanvas = () => {
  return (
    // Contenedor principal: usa Flexbox para alinear ítems, 
    // padding horizontal (px-10) y vertical (py-4), y fondo oscuro.
    <div className="contHed">
      
      <div className="div-izq">
        <h1 className="text-3xl font-bold tracking-wider">
          MI PROYECTO
        </h1>
      </div>
      
      <div className="div-der"> {/* Ocultar en móviles, mostrar en pantallas pequeñas (sm) y mayores */}
        <h1 className="tracking-wider">
          Bienvenido a mi Portafolio
        </h1>
      </div>

    </div>
  );
};

export default HeaderCanvas;