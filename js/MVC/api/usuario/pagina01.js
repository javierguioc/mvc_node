ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function(res, datos) {

    // console.log("object: ", datos);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Usuarios:</h2>`);

    res.write(`<form method="POST" action="./index.js">
        ${vista.cajaTexto("text", "buscar", "", "")}
        ${vista.boton("Buscar")}
        ${vista.boton("Nuevo")}
  </form>`);
    res.write(`<form method="POST" action="./index.js">`);
    res.write(`<table border="5" width="200">
            ${vista.radio("per_id", "per_id", ["usu_login","per_nombre","per_apellido"], datos["Usuario"])}
            </table><br>
            ${vista.boton("Eliminar")}
            ${vista.boton("Actualizar")}
             ${vista.boton("Permisos")}
             </form>
                ${vista.botonr()}
            `);
    res.end();
};