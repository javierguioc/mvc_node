ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function (res, datos) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Roles:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  res.write(`${vista.radio("rol_id", "rol_id", ["rol_nombre"], datos["Rol"])}
                ${vista.boton("Eliminar")}
                ${vista.boton("Actualizar")}
                ${vista.boton("Nuevo")}
                ${vista.boton("Permisos")}
                </form>
                ${vista.botonr()}`);
  res.end();
};
