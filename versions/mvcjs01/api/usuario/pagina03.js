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

// Función asíncrona que recoge la request POST
router.post("/", postFunction);
async function postFunction(req, res, next) {
  if (req.body.btnAction != "Enviar nuevo") {
    // Mensaje de log
    console.log("[Usuario03] Se hizo post ", req.body);
    // Renderizar el formulario HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h2>Registro de usuario</h2>
          <form name="registrarUsuario" action="pagina03.js" method="POST" target="resultado">
            <table border="1">
              <tr><td>
              <table>
                <tr>
                  <td align="right">Usuario:</td><td align="left"> <input type="text" value="" name="usu_login" size="20"></td>
                </tr>
                <tr>
                  <td align="right">Contraseña:</td><td align="left"> <input type="password" value="" name="usu_clave" size="10" maxlength="10" placeholder="Contraseña"></td>
                </tr>
                <tr>
                  <td align="right">Id persona:</td><td align="left"> <input type="text" value="" name="per_id" size="10" maxlength="10"></td>
                </tr>
                <tr >
                  <td colspan="2" align="center"><input name="btnAction" type="submit" value="Enviar nuevo"> <input type="reset" value="Borrar"></td>
                </tr>
              </table>
              </td></tr>
            </table>
          </form>
        </body>
      </html>`);
    res.end();
  } else {
    // Mensaje de log
    console.log("[Usuario03] Se hizo post ", req.body);

    // Ya que la funcion es asincrona, aunque la persona no exista la inserción se va a ejecutar. Por esto se usa la variable bandera 'existe'. Si la persona no existe se evita que se intente insertar un usuario con esa persona.
    var existe = false;
    // Buscar a la persona para ver si existe
    let selectConsulta = `select from persona where per_id='${req.body.per_id}'`;
    console.log("[Usuario03] Se hará la consulta ", selectConsulta)
    // Ejecutar la consulta de búsqueda de persona
    let selectRespuesta = await client.query(selectConsulta)
    .then(respuesta => {
      console.log("[Usuario03] Respuesta de la consulta ", respuesta);
      console.log(respuesta.rows);
        // Si la persona no existe se pasa a la pagina 04 de registro de persona
        if (respuesta.rows.length===0) {
          console.log("[Usuario03] No existe la persona")
          res.redirect("/usuario/pagina04.js?per_id="+req.body.per_id); 
        } else{
          existe = true;
        }
      })
    .catch(e => {
      console.log('[Usuario03] Error en la consulta de busqueda', e);
      res.redirect("/usuario/index.js");
    });
    if (existe) {
      // Armar la consulta de inserción de usuario
      let insertConsulta = `insert into usuario values ('${req.body.usu_login}','${req.body.usu_clave}','${req.body.per_id}')`;
      console.log("[Usuario03] Se hará la consulta ", insertConsulta)
      // Ejecutar la consulta de inserción de usuario
      let insertRespuesta = await client.query(insertConsulta)
      .then(r => {
        console.log(r);
        client.end();
        res.redirect("/usuario/index.js");
      })
      .catch(e => {
        console.log('Error');
        console.log(e);
          // Renderizar el error en HTML
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(`<html><head><meta charset="UTF-8"></head>
            <body>
            <h2>Error en la inserción</h2>`);
          res.write("<p>"+ e["detail"] +"</p> <p><a href='/usuario/index.js'> Volver </a>");
        });
    }
  }
}

module.exports = router;