const { Client } = require("pg");
const express = require("express");
const router = express.Router();

// Parámetros para la conexión con la base de datos
const connectionData = {
  user: "efi",
  host: "localhost",
  database: "efi",
  password: "efi",
  port: 5432
};

// Conexión a la base de datos
const client = new Client(connectionData);
client.connect()

// Función asíncrona que recoge la request GET
router.get("/", getFunction);
async function getFunction(req, res, next) {
  // Mensaje de log
  console.log("[Usuario04] Se recibió get ", req.query);
  res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h2>Registro de persona</h2>
          <form name="registrarPersona" action="pagina05.js" method="POST" target="resultado">
            <table border="1">
              <tr><td>
              <table>
                <tr>
                  <td align="right">Id persona:</td><td align="left"> <input type="text" value="${req.query.per_id}" name="per_id" size="20" disabled></td>
                </tr>
                <tr>
                  <td align="right">Nombre:</td><td align="left"> <input type="text" value="" name="per_nombre" size="20" placeholder="Nombre"></td>
                </tr>
                <tr>
                  <td align="right">Apellido:</td><td align="left"> <input type="text" value="" name="per_apellido" size="20"placeholder="Apellido"></td>
                </tr>
                <tr>
                  <td align="right">Fecha de Nacimiento:</td><td align="left"> <input type="date" value="" name="per_fecha_nacimiento" size="20"placeholder="Apellido"></td>
                </tr>
                <tr>
                  <td align="right">Dirección:</td><td align="left"> <input type="text" value="" name="per_direccion" size="20"placeholder="Dirección"></td>
                </tr>
                <tr>
                  <td align="right">Correo:</td><td align="left"> <input type="text" value="" name="per_correo" size="20"placeholder="Correo"></td>
                </tr>

                <tr>
                  <td colspan="2" align="center"><input name="btnAction" type="submit" value="Enviar nuevo"> <input type="reset" value="Borrar"></td>
                </tr>
              </table>
              </td></tr>
            </table>
          </form>
        </body>
      </html>`);
  res.end();
  client.end();
}

module.exports = router;