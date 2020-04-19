const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);
router.get("/", getFunction);

//El boton eliminar hacer post a la misma pagina para borrar el registro
async function postFunction(req, res, next) {
  console.log("[IndexModulo] Se hizo post", req.body);
  var datos = {};
  datos["mod_id"] = req.body.mod_id;  
  await modelo.borrarModulo(datos);
  res.redirect(`/modulo/index.js`);
}
// Recorre los modulos y los muestra en una tabla
async function getFunction(req, res, next) {
  var datos = {};
  datos = await modelo.recuperarModulo();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Modulos:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  datos["Modulo"].forEach((element) => {
    res.write(
      `<tr><td><center> <input type="radio" name="mod_id" value="${element.mod_id} "></td> <td> ${element.mod_nombre} </center></td></tr>`
    );
  });
  res.write(`
  </table><br>
  <input type="submit" value="Eliminar" name="btnAction" />&nbsp;
  <input type="submit" value="Actualizar" name="btnAction" />&nbsp;
  <input type="submit" value="Nuevo" name="btnAction" />&nbsp;
  <input type="submit" value="Funcionalidades" name="btnAction"/>
  </form>`);
  res.end();
}

module.exports = router;