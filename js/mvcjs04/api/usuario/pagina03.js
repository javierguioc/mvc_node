ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();

module.exports = async function(res, datos) {

        // Renderizar el formulario HTML
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
      <html>
        <head><meta charset="UTF-8"></head>
        <body>
          <h2>Registro de usuario</h2>
          <form name="registrarUsuario" action="./index.js" method="POST" target="resultado">
            <table border="1">
            ${vista.formulario(`:usu_login:Usuario:text,:usu_clave:Contraseña:password, :per_id:persona:text`)}
          ${vista.boton("Enviar nuevo")}
          ${vista.botonreset()}
            </table>
          </form>
        </body>
      </html>`);
  res.end();

};