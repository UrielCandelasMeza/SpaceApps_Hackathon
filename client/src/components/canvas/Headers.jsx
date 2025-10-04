
const HeaderCanvas = () => {
  return (

    <div className="contHed">
      
      <div className="div-izq">
        <h1 className="text-3xl font-bold tracking-wider">
          ExoQuetzal
        </h1>
      </div>

      <div className=" hidden sm:block">
        <h1 className="text-2xl font-bold tracking-wider ">
          Ver más
        </h1>
      </div>
      
      <div className="div-der hidden sm:block"> {/* Ocultar en móviles, mostrar en pantallas pequeñas (sm) y mayores */}
        <h1 className="text-2xl font-bold tracking-wider">
          Nuestra misión
        </h1>
      </div>

    </div>
  );
};

export default HeaderCanvas;