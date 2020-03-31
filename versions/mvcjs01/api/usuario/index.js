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

const client = new Client(connectionData);
client.connect();

router.post("/", postFunction);
router.get("/", getFunction);

async function postFunction(req, res, next) {

  console.log("Se hizo post ", req.body);
  let DeleteUsuario = `DELETE FROM usuario where per_id::integer=${req.body.per_id}`;
  const client = new Client(connectionData);
  let deleteAnswer = "";
  client.connect();
  client
    .query(DeleteUsuario)
    .then(response => {
      deleteAnswer = response;
      res.redirect(`/usuario/index.js`);
    })
    .catch(err => {
      client.end();
      res.redirect(`/usuario/index.js`);
    });
}

async function getFunction(req, res, next) {
  let queryUsuario = "SELECT * FROM usuario as us, persona as per where us.per_id=per.per_id ";
  let client = new Client(connectionData);
  client.connect();
  let Usuario = await client.query(queryUsuario);
  client.end();
  Usuario = JSON.parse(JSON.stringify(Usuario.rows)) || "";

  res.writeHead(200, { "Content-Type": "text/html" });

  res.write(`<h2>Usuarios:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  Usuario.forEach(element => {
    res.write(
      `<tr><td><center> <input type="radio" name="per_id" value="${element.per_id} "></td> <td> ${element.per_nombre} </center></td> <td> ${element.per_apellido} </center> </td> </tr>`
    );
  });
  res.write(`</table><br>`);
  res.write( `<input type="submit" value="Eliminar" name="btnAction" />`);
  res.write(
    `<input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>`
  );
  res.write(
    `<input type="submit" value="Nuevo" name="btnAction" formaction="pagina03.js"/> `
  );
  res.write(
    ` <input type="submit" value="Permisos" name="btnAction" formaction="pagina06.js"/>`
  );
  res.write(`<p id="demo"></p>`);
  res.write(`</form>`);
  res.end();
}

module.exports = router;