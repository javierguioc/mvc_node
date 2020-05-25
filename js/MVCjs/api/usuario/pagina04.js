ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();

module.exports = async function(res, datos) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
      <html>
        <head><meta charset="UTF-8"></head>
        <body>
          <h2>Registro de persona</h2>
          <p>La id proporcionada no corresponde a ninguna persona en la base de datos, por favor regístrese</p>
          <form name="registrarPersona" action="./index.js" method="POST">
            <table border="0">
            ${vista.formulario(`${datos["per_id"]}:per_id:Id persona:text,:per_nombre:Nombre:text,:per_apellido:Apellido:text,:per_fecha_nacimiento:Fecha de Nacimiento:date,:per_direccion:Dirección:text,:per_correo:Correo:text`)}
          ${vista.boton("Registrar")}
          ${vista.botonreset()}
            </table>
          </form>
        </body>
      </html>`);
  res.end();
};