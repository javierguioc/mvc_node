const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);
router.get("/", getFunction);

async function postFunction(req, res, next) {
  // Mensaje de log
  console.log("[Usuario01] Se hizo post ", req.body);

  var datos = {};
  datos["per_id"] = req.body.per_id;  
  await modelo.borrarUsuario(datos);

  res.redirect(`/usuario/index.js`);
}

async function getFunction(req, res, next) {

  var datos = {};

  datos = await modelo.recuperarUsuarios();
  // console.log("object: ", datos);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Usuarios:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  res.write(
    `<tr> <td></td> <td>usu_login</td> <td>per_nombre</td> <td>per_apellido </td> </tr>`
  );
  datos["Usuario"].forEach((element) => {
    res.write(
      `<tr> <td><input type="radio" name="per_id" value="${element.per_id} "></td> <td>${element.usu_login}</td> <td>${element.per_nombre}</td> <td>${element.per_apellido}</center> </td> </tr>`
    );
  });
  res.write(`</table><br>`);
  res.write(`<input type="submit" value="Eliminar" name="btnAction" />`);
  res.write(
    `<input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>`
  );
  res.write(
    `<input type="submit" value="Nuevo" name="btnAction"   formaction="pagina03.js"/>`
  );
  res.write(
    ` <input type="submit" value="Permisos" name="btnAction" formaction="pagina05.js"/>`
  );
  res.write(`<p id="demo"></p>`);
  res.write(`</form>`);
  res.end();
}

module.exports = router;
