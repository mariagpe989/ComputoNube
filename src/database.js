//coneccion base de datos
//const mongoose = require('mongoose');
//require('dotenv').config();
// Definir la URL de conexión antes de usarla
//const{ ESTETICA_MONGODB_HOST, ESTETICA_MONGODB_DATABASE}= process.env;
//const MONGODB_URI = `mongodb://${process.env.ESTETICA_MONGODB_HOST}/${process.env.ESTETICA_MONGODB_DATABASE}`;


//mongoose.connect(MONGODB_URI)

  //.then(db => console.log('Base de datos conectada'))
  //.catch(err => console.log('Error de conexión:', err));
  const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/estetica', {
    useNewUrlParser: true, // Soluciona la advertencia del analizador de URL
    useUnifiedTopology: true, // Soluciona la advertencia del motor de monitoreo
    useCreateIndex: true, // Permite el uso de createIndexes
})
.then(() => console.log('Base de datos conectada'))
.catch(err => console.error('Error al conectar la base de datos:', err));

