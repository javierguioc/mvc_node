const { Client } = require("pg");
const express = require("express");
const router = express.Router();
module.exports = router;
// Parametros para la conexion con la base de datos
const connectionData = {
  user: "efi",
  host: "localhost",
  database: "efi",
  password: "efi",
  port: 5432
};

const client = new Client(connectionData);
client.connect();

router.post("/", postFunction);
router.get("/", getFunction);

//El boton eliminar hacer post a la misma pagina para borrar el registro
async function postFunction(req, res, next) {
  console.log("Se hizo post ", req.body);
  let deleteRol = `DELETE FROM rol where rol_id::integer=${req.body.rol_id}`;
  const client = new Client(connectionData);
  let deleteAnswer = "";
  client.connect();
  client
    .query(deleteRol)
    .then(response => {
      deleteAnswer = response;
      res.redirect(`/rol/index.js`);
    })
    .catch(err => {
      client.end();
      res.redirect(`/rol/index.js`);
    });
}

async function getFunction(req, res, next) {

  let queryRoles = "SELECT * FROM rol ";
  let client = new Client(connectionData);
  client.connect();
  let roles = await client.query(queryRoles);
  client.end();
  roles = JSON.parse(JSON.stringify(roles.rows)) || "";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Roles:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  roles.forEach(element => {
    res.write(
      `<tr><td><center> <input type="radio" name="rol_id" value="${element.rol_id} "></td> <td> ${element.rol_nombre} </center></td></tr>`
    );
  });
  res.write(`</table><br>`);
  res.write(`<input type="submit" value="eliminar" name="btnAction" />`);
  res.write(
    `<input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>`
  );
  res.write(
    `<input type="submit" value="nuevo" name="btnAction" formaction="pagina03.js"/>`
  );
  res.write(
    `<input type="submit" value="Permisos" name="btnAction" formaction="pagina04.js"/>`
  );
  res.write(`<p id="demo"></p>`);
  res.write(`</form>`);
  res.end();
}

module.exports = router;