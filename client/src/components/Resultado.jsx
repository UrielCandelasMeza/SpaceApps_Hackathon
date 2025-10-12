import React, { useState, useCallback } from "react";
import { motion } from "framer-motion"; // No necesitamos AnimatePresence aquí
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
// axios ya no es necesario para la simulación pura, pero se mantiene la importación 
// si se tiene la intención de volver a usarlo más tarde.

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// -------------------------------------------------------------
// Definición de Esquema de Validación (Simplificado, ya no se sube archivo)
// -------------------------------------------------------------
const EmptySchema = Yup.object().shape({});

// Array de datos simulados para el siguiente resultado
const simulatedResults = [
    "95.04", // 1
    "88.21", // 2
    "98.70", // 3
    "75.50", // 4
    "52.10", // 5
    "82.78", // 6
    "96.33", // 7
    "78.90", // 8
    "85.67", // 9
    "93.01", // 10
    "02.03", // 11
    "98.15", // 12
    "72.36", // 13
    "89.52", // 14
    "94.88", // 15
    "83.19", // 16
    "97.60", // 17
    "70.05", // 18
    "90.22", // 19
    "86.74", // 20
];


// -------------------------------------------------------------
// Componente Resultado
// -------------------------------------------------------------
const Resultado = ({ selectedModel }) => {
  const [subiendo, setSubiendo] = useState(false);
  const [resultIndex, setResultIndex] = useState(0); // Índice para el array de resultados simulados
  
  // 'serverState' almacena el resultado actual simulado
  const [serverState, setServerState] = useState({ 
    success: false, 
    error: null,
    result: simulatedResults[0], // Iniciamos con el primer resultado simulado
  });

  // Función de simulación de "Subida/Cálculo"
  const simulateCalculation = useCallback(async (isNext = false) => {
    // Determine el índice del resultado a mostrar
    const newIndex = isNext 
        ? (resultIndex + 1) % simulatedResults.length // Ciclar
        : 0; 
    
    const baseResultString = simulatedResults[newIndex];

    setSubiendo(true); 
    setServerState({ success: false, error: null, result: null }); 

    // Simular el tiempo de "cálculo" del servidor
    await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 segundos de "carga"

    // -------------------------------------------------------------------
    // ⭐ IMPLEMENTACIÓN DE LA ALEATORIEDAD (+/- 1.3) ⭐
    // -------------------------------------------------------------------
    const baseResult = parseFloat(baseResultString);
    
    // Generar un número aleatorio entre 0 y 1. Si es < 0.5, restamos 1.3. Si es >= 0.5, sumamos 1.3.
    const factor = Math.random() < 0.5 ? -1.3 : 1.3;
    
    let finalResult = baseResult + factor;
    
    // Opcional: Asegurarse de que el resultado no sea negativo
    if (finalResult < 0) {
        finalResult = 0; 
    }
    
    // Formatear a String con 2 decimales para el display
    const finalResultString = finalResult.toFixed(2);
    // -------------------------------------------------------------------

    // Simulación de respuesta exitosa
    console.log(`Respuesta base: ${baseResultString} -> Factor: ${factor} -> Resultado final: ${finalResultString}`);
    setServerState({ 
        success: true, 
        error: null, 
        result: finalResultString // Usamos el resultado con aleatoriedad
    });
    setResultIndex(newIndex); 

    // Retraso para que se vea la animación de rotación rápida antes de mostrar el resultado
    setTimeout(() => {
        setSubiendo(false); 
    }, 500); // Pequeño retraso extra
    
  }, [resultIndex]);


  const formik = useFormik({
    initialValues: {}, // No hay campos
    validationSchema: EmptySchema, // Usamos un esquema vacío
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await simulateCalculation(false); // Simular el cálculo inicial
      setSubmitting(false);
    },
  });
  
  // Función para el botón "Siguiente Número"
  const handleNextResult = async () => {
    // Si ya está en medio de un proceso, ignorar
    if (subiendo || formik.isSubmitting) return; 
    
    // Simular el proceso de "subida" y obtener el siguiente resultado
    formik.setSubmitting(true);
    await simulateCalculation(true);
    formik.setSubmitting(false);
  };


  // Controla la velocidad de rotación: Rápido (15) si está subiendo o calculando, normal (2) si no.
  const planetRotationSpeed = subiendo || formik.isSubmitting ? 15 : 2; 

  // Determinar el mensaje de estado (MODIFICADO para mostrar el porcentaje como texto grande)
  let resultDisplay = (
    <div className="flex flex-col items-center justify-center h-full">
      <p className={`${styles.sectionSubText} text-center`}>
        Cargando resultado inicial...
      </p>
      <h3 className={`${styles.sectionHeadText} text-center text-secondary`}>
        ...
      </h3>
    </div>
  );
  
  if (serverState.success && serverState.result) {
    // Ahora mostramos el resultado con la aleatoriedad aplicada
    resultDisplay = (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <p className={`${styles.sectionSubText} text-center`}>
            Precisión actual del modelo <strong className="text-white">{selectedModel}</strong>
        </p> 
        <h3 className={`${styles.sectionHeadText} text-center text-green-400 text-[60px] md:text-[80px]`}>
            {serverState.result}%
        </h3>
        <p className="text-sm text-gray-400 text-center">
            (Dato #{resultIndex + 1} de {simulatedResults.length})
        </p>
      </div>
    );
  } else if (serverState.error) {
    resultDisplay = (
        <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-500 font-bold text-[18px] text-center">❌ {serverState.error}</p>
        </div>
    );
  } else if (subiendo) {
      resultDisplay = (
        <div className="flex flex-col items-center justify-center h-full">
            <p className={`${styles.sectionSubText} text-center`}>
                Analizando datos y recalculando...
            </p>
            <h3 className={`${styles.sectionHeadText} text-center text-secondary`}>
                Cargando...
            </h3>
        </div>
      );
  }


  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      
      {/* -------------------- RESULTADO (IZQUIERDA) -------------------- */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl flex flex-col justify-between min-h-[400px]"
      >
        
        {/* Contenedor del Resultado */}
        <div className="flex-grow flex items-center justify-center">
            {resultDisplay}
        </div>

        {/* Botones de control (Simulación de acciones) */}
        <div className="mt-8 flex flex-col gap-4">
            {/* El botón Submit ahora inicia la carga del primer dato (si es la primera vez) */}
            <button
                type="button" // Cambiado a 'button' ya que no es un formulario con campos
                onClick={formik.handleSubmit} // Usamos handleSubmit para simular la acción inicial
                disabled={formik.isSubmitting || subiendo} 
                className={`py-3 px-8 rounded-xl outline-none w-full text-white font-bold shadow-md ${
                    serverState.success ? 'bg-tertiary shadow-primary' : 'bg-secondary shadow-tertiary'
                }`}
            >
                {formik.isSubmitting ? "Calculando..." : "Iniciar Análisis / Recalcular"}
            </button>
            
            {/* Nuevo Botón para el Siguiente Número */}
            <button
                type="button"
                onClick={handleNextResult}
                disabled={formik.isSubmitting || subiendo || !serverState.success} 
                className={`py-3 px-8 rounded-xl outline-none w-full text-white font-bold shadow-md ${
                    (formik.isSubmitting || subiendo || !serverState.success) 
                        ? 'bg-gray-700 cursor-not-allowed opacity-60' 
                        : 'bg-indigo-600 shadow-indigo-400 hover:bg-indigo-500'
                }`}
            >
                {subiendo ? "Cargando siguiente..." : `Siguiente Resultado  (${resultIndex + 1}/${simulatedResults.length})`}
            </button>
        </div>
      </motion.div>

      {/* -------------------- PLANETA (DERECHA) -------------------- */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas 
          autoRotate={true}
          autoRotateSpeed={planetRotationSpeed}
        />
      </motion.div>
    </div>
  );
};

// -------------------------------------------------------------
// Estilos (Ya no son necesarios los estilos del uploader, pero los mantenemos por la estética)
// -------------------------------------------------------------
// NOTA: Se mantiene StyledWrapper vacío para no romper la importación, pero se eliminan los estilos del file-upload.
const StyledWrapper = styled.div`
  display: none; /* Ocultamos el div StyledWrapper ya que no tiene uso con el formulario */
`;

export default SectionWrapper(Resultado, "resultado");