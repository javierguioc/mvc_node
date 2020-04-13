const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);
router.get("/", getFunction);

//El boton eliminar hacer post a la misma pagina para borrar el registro
async function postFunction(req, res, next) {
  console.log("[IndexRol] Se hizo post", req.body);
  var datos = {};
  datos.rol_id = req.body.rol_id;  
  await modelo.borrarRol(datos);
  res.redirect(`/rol/index.js`);
}

async function getFunction(req, res, next) {
  var datos = {};
  datos = await modelo.recuperarRol();


  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Roles:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  datos.Rol.forEach(element => {
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