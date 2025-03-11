const express = require('express');
const cors = require("cors");
const config = require("./config/config");
const connection = require('./config/database.config');
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');
const path = require('path');

const app = express();

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

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});