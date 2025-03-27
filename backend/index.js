const express = require('express');
const cors = require("cors");
const config = require("./config/config");
const connection = require('./config/database.config');
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');
const path = require('path');
const fs = require("fs");
const https = require("https");
require('dotenv').config();
const recipesRoutes = require('./routes/recipes.routes')
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors({origin:"*"}));
app.use(fileUpload({
    useTempFiles: false,
    limits: { fileSize: 5 * 1024 * 1024 }
}));
app.use('/uploads', express.static('uploads'));

// Middleware para subida de archivos (debe estar antes de las rutas)
app.use('/api', recipesRoutes);

app.use(morgan('dev'))
// Middleware para manejar JSON
app.use(express.json());
app.use(express.static('public'))

// Conectar a la base de datos
connection();

app.use(cors({origin:"*"}))

app.get('/:page',(req , res)=> {
  const page = req.params.page
  const filePath = path.resolve('public/templates', `${page}.html`)
  res.sendFile(filePath)
})
// Ruta de prueba
app.get('/', (req, res) => {
  const index = path.resolve('public/templates', 'index.html')
  res.sendFile(index);
});

app.use('/api', authRoutes);
app.use('/api', recipesRoutes);

const isDev = config.ENVIROMENT === "dev"

if (isDev){
  try {
    const options = {
      key: fs.readFileSync("../../certs/localhost-key.pem"),
      cert: fs.readFileSync("../../certs/localhost.pem"),
    };
    https.createServer(options, app).listen(config.port,()=>{
      console.log(`https://localhost:${config.port}`);
    })
  } catch (error) {
    console.error('No se pudo cargar el resultado ssl:',error)
  }
} else{
    // Iniciar servidor
    app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });
}


// ... existing imports ...
const notificationRoutes = require('./routes/notification.routes');

// ... existing middleware ...
app.use('/api/notifications', notificationRoutes);