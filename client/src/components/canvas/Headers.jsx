import LogoQuetzal from './Logo_Quetza2l.png'; 

const HeaderCanvas = () => {
  return (

    <div className="contHed">
      
      <div className="div-izq flex flex-wrap justify-center gap-8 content-center items-center">
        <img src={LogoQuetzal} alt="ExoQuetzal" className='w-[100px]'/>
        <h1 className="text-3xl font-bold tracking-wider">
          ExoQuetzal
        </h1>
      </div>
      <div className="hidden sm:block">
        <button className="px-8 py-3 text-lg font-bold tracking-widest uppercase text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
          VIDEO
        </button>
      </div>
      
      <div className="div-der hidden sm:block">
        <h1 className="text-2xl font-bold tracking-wider">
          Nuestra misión
        </h1>
      </div>

    </div>
  );
};

export default HeaderCanvas;