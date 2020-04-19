const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  console.log("Se hizo post :", req.body);
  switch (req.body.btnAction) {
    case "Enviar":
      break;

    case "Ingresar":
      var datos = {};
      datos["usu_login"] = req.body.usuario;
      datos["usu_clave"] = req.body.pass;

      datos = await modelo.validar(datos);
      datos = await modelo.Roles(datos);
      pagina02 = require("./pagina02");
      pagina02(res, datos);
      break;

    case "Aceptar":
      var datos = {};
      datos["usu_login"] = req.body.usu_login;
      datos["rol_id"] = req.body.rol;
      datos = await modelo.funcionalidades(datos);
      pagina03 = require("./pagina03");
      pagina03(res, datos);
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
