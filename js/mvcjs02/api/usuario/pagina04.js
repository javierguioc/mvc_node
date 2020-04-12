const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

// Función asíncrona que recoge la request GET
router.get("/", getFunction);
async function getFunction(req, res, next) {
  // Mensaje de log
  console.log("[Usuario04] Se recibió get ", req.query);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
      <html>
        <head><meta charset="UTF-8"></head>
        <body>
          <h2>Registro de persona</h2>
          <p>La id proporcionada no corresponde a ninguna persona en la base de datos, por favor regístrese</p>
          <form name="registrarPersona" action="pagina04.js" method="POST">
            <table border="0">
              <tr>
                <td align="right">Id persona:</td>
                <td> <input type="text" value="${req.query.per_id}" name="per_id" size="20" ></td>
              </tr>
              <tr>
                <td align="right">Nombre:</td>
                <td> <input type="text" value="" name="per_nombre" size="20" placeholder="Nombre"></td>
              </tr>
              <tr>
                <td align="right">Apellido:</td>
                <td> <input type="text" value="" name="per_apellido" size="20" placeholder="Apellido"></td>
              </tr>
              <tr>
                <td align="right">Fecha de Nacimiento:</td>
                <td> <input type="date" value="" name="per_fecha_nacimiento" size="20" placeholder="Apellido"></td>
              </tr>
              <tr>
                <td align="right">Dirección:</td>
                <td> <input type="text" value="" name="per_direccion" size="20" placeholder="Dirección"></td>
              </tr>
              <tr>
                <td align="right">Correo:</td>
                <td> <input type="text" value="" name="per_correo" size="20" placeholder="Correo"></td>
              </tr>
              <tr>
                <td align="center">
                <input name="btnAction" type="submit" value="Registrar">
                <input type="reset" value="Borrar">
                </td>
              </tr>
            </table>
          </form>
        </body>
      </html>`);
  res.end();
}

router.post("/", postFunction);
async function postFunction(req, res, next) {
  // Mensaje de log
  console.log("[Usuario04] Se hizo post ", req.body);
  if (req.body.btnAction == "Registrar") {
    var datos = {};
    datos.per_id = req.body.per_id;
    datos.per_nombre = req.body.per_nombre;
    datos.per_apellido = req.body.per_apellido;
    datos.per_fecha_nacimiento = req.body.per_fecha_nacimiento;
    datos.per_direccion = req.body.per_direccion;
    datos.per_correo = req.body.per_correo;

    try {
      // Ejecutar la consulta de inserción de usuario
      let respuesta = await modelo.insertarNuevaPersona(datos);

      console.log(respuesta);
      // Renderizar el HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            <h2>Registro de Persona</h2>
            <p>Registro exitoso</p>
          </body>
        </html>`);
      res.end();
      // res.redirect("/usuario/index.js");
    } catch (e) {
      console.log("Error");
      console.log(e);
      // Renderizar el error en HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<html><head><meta charset="UTF-8"></head>
          <body>
          <h2>Error en la inserción</h2>`);
      res.write(
        "<p>" + e["detail"] + "</p> <p><a href='/usuario/index.js'> Volver </a>"
      );
    }
  }
}

module.exports = router;
