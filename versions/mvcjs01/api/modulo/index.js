//Importa los requerimientos necesarios para el funcionamiento
const { Client } = require("pg");
const express = require("express");
const router = express.Router();

// Parametros para la conexion con la base de datos
const connectionData = {
  user: "efi",
  host: "localhost",
  database: "efi",
  password: "efi",
  port: 5432
};

router.get("/", getFunction);
router.post("/", postFunction);

//El boton eliminar hacer post a la misma pagina para borrar el registro
async function postFunction(req, res, next) {
  let deleteModule = `DELETE FROM modulo where mod_id::integer=${req.body.mod_id};`;
  const client = new Client(connectionData);
  let deleteAnswer = "";
  client.connect();
  client
    .query(deleteModule)
    .then(response => {
      deleteAnswer = response;
      res.redirect(`/modulo/index.js`);
    })
    .catch(err => {
      client.end();
      res.redirect(`/modulo/index.js`);
    });

}
// Recorre los modulos y los muestra en una tabla
async function getFunction(req, res, next) {
  let queryModules = "SELECT * FROM modulo ";
  let client = new Client(connectionData);
  client.connect();
  let modules = await client.query(queryModules);
  client.end();
  modules = JSON.parse(JSON.stringify(modules.rows)) || "";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Modulos:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  modules.forEach(element => {
    res.write(
      `<tr><td><center> <input type="radio" name="mod_id" value="${element.mod_id} "></td> <td> ${element.mod_nombre} </center></td></tr>`
    );
  });
  res.write(`
  </table><br>
  <input type="submit" value="Eliminar" name="btnAction" />&nbsp;
  <input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>&nbsp;
  <input type="submit" value="Nuevo" name="btnAction" formaction="pagina03.js"/>&nbsp;
  <input type="submit" value="Funcionalidades" name="btnAction" formaction="../funcionalidad/index.js"/>
  </form>`);
  res.end();
}

module.exports = router;
