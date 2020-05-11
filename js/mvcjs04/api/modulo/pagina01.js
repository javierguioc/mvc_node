ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function (res, datos) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Modulos:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  res.write(`${vista.radio("mod_id", "mod_id", ["mod_nombre"], datos["Modulo"])}
                ${vista.boton("Eliminar")}
                ${vista.boton("Actualizar")}
                ${vista.boton("Nuevo")}
                ${vista.botonred(
                  "Funcionalidades",
                  "../funcionalidad/index.js"
                )}
                </form>
                ${vista.botonr()}`);
  res.end();
};
