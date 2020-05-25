const express = require("express");
const router = express.Router();

const React = require("react");
const ReactDOMServer = require("react-dom/server");

ClaseControladorGeneral = require("../general/ClaseControladorGeneral");

Modelo = require("./modelo");
var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  //console.log("Se hizo post* :", req.body);
  switch (datos["btnAction"].replace(/ /g, "").toLowerCase()) {
    case "Enviar":
      break;

    case "ingresar":
      datos = control.capturar(datos);
    //console.log("Los datos para ingresar son",datos)
      datos = await modelo.validar(datos);
      datos = await modelo.Roles(datos);
      pagina02 = require("./pagina02");
      pagina02(res, datos);
      break;

    case "aceptar":
      datos = control.capturar(datos);
      console.log("Los datos que viajaran para la pagina 03 seran: ",datos)
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
      //res.writeHead(200, { "Content-Type": "text/html" });
      pagina01 = require("./pagina01.jsx");
      var html = ReactDOMServer.renderToString(React.createElement(pagina01));
      res.send(html);
      res.end();
    // pagina01 = require("./pagina01");
    // pagina01(req, res);
    // break;
  }
}

module.exports = router;
