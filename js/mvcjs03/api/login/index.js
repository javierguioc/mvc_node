const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  console.log("Se hizo post:", req.body);
  switch (req.body.btnAction) {
    case "Enviar":
      break;

    case "Ingresar":
      var datos = {};
      datos["usu_login"] = req.body.usuario;
      datos["usu_clave"] = req.body.pass;
      datos = await modelo.validar(datos);
      pagina02 = require("./pagina02"); 
      pagina02(res,datos);
      break;

    default:
      pagina01 = require("./pagina01");
      break;
  }
}

router.get("/", getFuncion);
// Muestra el formulario para ingresar el usuario y la contraseña
function getFuncion(req, res, next) {
  //   console.log("Se hizo get");
  switch (req.body.btnAction) {
    default:
      //   console.log("Entro a default");
      pagina01 = require("./pagina01");
      pagina01(req, res);
      break;
  }
}

module.exports = router;