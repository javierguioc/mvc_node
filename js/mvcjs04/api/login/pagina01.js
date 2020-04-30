ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = function(req, res) {
    //   console.log("Entro en la pagina 01");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
        `
      <html lang="es">
          <head>
              <meta charset="utf-8">
              <title>Login</title></head>
          <body>
              <div>
                  <center>
                      <h3>Inicio de Sesion</h3>
                      <form method="POST" action="./index.js">
                      ${vista.cajaTexto('text', 'usu_login', '', 'Usuario')}
                      ${vista.cajaTexto('password', 'usu_clave', '', 'Contraseña')}
                      ${vista.boton('Ingresar')}
                      </form>
                      ${vista.botonr()}
                  </center>
              </div>
          </body>
      </html>
      `
    );
    res.end();
};