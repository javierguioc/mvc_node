const express = require("express");
const router = express.Router();
ClaseControladorGeneral = require("../general/ClaseControladorGeneral");
// var control = new ClaseControladorGeneral();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  switch (datos["btnAction"].replace(/ /g, "").toLowerCase()) {
    case "eliminar":
      datos = control.capturar(datos);
      await modelo.borrarFuncionalidad(datos);
      datos = await modelo.recuperarFuncionalidad(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "actualizar":
      datos = control.capturar(datos);
      datos = await modelo.traerFuncionalidad(datos);
      pagina02 = require("./pagina02");
      pagina02(res, datos);
      break;

    case "enviaractualizar":
      datos = control.capturar(datos);
      datos = await modelo.actualizarFuncionalidad(datos);
      datos = await modelo.recuperarFuncionalidad(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "nuevo":
      datos = control.capturar(datos);
      pagina03 = require("./pagina03");
      pagina03(res, datos);
      break;

    case "enviarnuevo":
      datos = control.capturar(datos);
      datos = await modelo.insertarNuevaFuncionalidad(datos);
      datos = await modelo.recuperarFuncionalidad(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "funcionalidades":
      datos = control.capturar(datos);
      datos = await modelo.recuperarFuncionalidad(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;
  }
}

module.exports = router;
