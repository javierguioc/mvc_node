const express = require("express");
const router = express.Router();

ClaseControladorGeneral = require("../general/ClaseControladorGeneral");

Modelo = require("./modelo");
var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  console.log("Se hizo post**-*-*-*-*-*-*-*-*-*-*-*-*-* :", req.body);
  switch (datos["btnAction"].replace(/ /g, "").toLowerCase()) {
    case "Enviar":
      break;

    case "ingresar":
      datos = control.capturar(datos);
    //console.log("Los datos para ingresar son",datos)
      datos = await modelo.validar(datos);
      datos = await modelo.Roles(datos);

      res.render("login-pagina02.pug", {datos});
      res.end();

      // pagina02 = require("./pagina02");
      // pagina02(res, datos);
      break;

    case "aceptar":
      datos = control.capturar(datos);
      console.log("Los datos que viajaran para la pagina 03 seran: ",datos)
      datos = await modelo.funcionalidades(datos);
      res.render("login-pagina03.pug", {datos});
      res.end();

      // pagina03 = require("./pagina03");
      // pagina03(res, datos);
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

      res.render("login-pagina01.pug", {});

  }
}

module.exports = router;
