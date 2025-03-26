const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Filtros de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError('FILE_TYPE_NOT_ALLOWED'), false);
  }
};

// Configuración principal
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
});

// Middleware de manejo de errores personalizado
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.code === 'LIMIT_FILE_SIZE' 
        ? 'El archivo es demasiado grande (máximo 5MB)'
        : err.code === 'FILE_TYPE_NOT_ALLOWED'
        ? 'Solo se permiten imágenes (JPEG, PNG, WEBP, GIF)'
        : 'Error al subir el archivo'
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
  next();
};

module.exports = {
  upload,
  handleMulterErrors
};