import type { Request, Response } from "express";

// Definición extendida para Request con el archivo de Multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const manageData = (req: MulterRequest, res: Response) => {
  const { type } = req.params;
  
  // 1. Verificar si el archivo fue subido
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      error: "No se ha subido ningún archivo CSV." 
    });
  }

  const file = req.file;
  
  // Vamos a verificar si efectivamente es un CSV
  if (file.mimetype !== 'text/csv' && file.originalname.split('.').pop() !== 'csv') {
      return res.status(400).json({ 
          success: false, 
          error: "El archivo no es un CSV válido." 
      });
  }

  // 2. Procesamiento del archivo (ejemplo)
  try {
    // El contenido del archivo está en req.file.buffer (porque usaste multer.memoryStorage())
    const csvContent = file.buffer.toString('utf8');
    
    console.log(`Tipo de análisis: ${type}`);
    console.log(`Nombre del archivo: ${file.originalname}`);
    console.log(`Tamaño del archivo: ${file.size} bytes`);

    // ************ // Pon tu logica aqui candelas
    // ************

    // 3. Respuesta Exitosa
    return res.status(200).json({
      success: true,
      message: `Archivo '${file.originalname}' subido y analizado para el tipo: ${type}`,
      fileInfo: {
        size: file.size,
        mimetype: file.mimetype,
      },
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en el procesamiento del archivo:", error.message);
      return res.status(500).json({ 
        success: false,
        error: `Error interno al procesar el archivo: ${error.message}` 
      });
    }
    return res.status(500).json({ 
      success: false,
      error: "Error desconocido al procesar el archivo." 
    });
  }
};