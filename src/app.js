// Importamos la dependencia
const express = require('express');

// Instanciamos nuestra app
const app = express();

// Iniciamos el servidor
app.listen(3000, 
	()=> console.log("Server is Ready! 🫡")
)