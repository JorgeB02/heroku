// establecer la conexion
const mongoose = require('mongoose');
let database_url = 'mongodb://localhost:27017/apiadat';


// conexión a base de datos
mongoose.connect(database_url, {
    keepAlive: true,
    
   
    
}).then(() => {
    console.log("conexión correcta a la base de datos");
}).catch(err => {
    console.log("no se ha pedido conectar a la base de datos por...", err);
});

module.exports = mongoose.connection;