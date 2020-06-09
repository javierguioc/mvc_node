const express = require("express");
const router = express.Router();
ClaseControladorGeneral = require("../general/ClaseControladorGeneral");
// var control = new ClaseControladorGeneral();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res) {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  switch (datos["btnAction"].replace(/ /g, "").toLowerCase()) {
    case "eliminar":
      datos = control.capturar(datos);
      await modelo.borrarRol(datos);
      datos = await modelo.recuperarRol();
      // pagina01 = require("./pagina01");
      // pagina01(res, datos);

      res.render("rol-pagina01.pug", {datos});
      res.end();

      break;
    case "actualizar":
      datos = control.capturar(datos);
      datos = await modelo.traerRol(datos);

      res.render("rol-pagina02.pug", {datos});
      res.end();
      // pagina02 = require("./pagina02");
      // pagina02(res, datos);
      break;

    case "nuevo":
      res.render("rol-pagina03.pug", {datos});
      res.end();
      break;

    case "permisos":
      datos = control.capturar(datos);
      datos = await modelo.obtenerPermisosRol(datos);
      res.render("rol-pagina04.pug", {datos});
      res.end();
      break;

    case "enviaractualizar":
      datos = control.capturar(datos);
      datos = await modelo.actualizarRol(datos);
      datos = await modelo.recuperarRol();
      res.render("rol-pagina01.pug", {datos});
      res.end();
      break;

    case "enviarnuevo":
      datos = control.capturar(datos);
      datos = await modelo.insertarNuevoRol(datos);
      datos = await modelo.recuperarRol();
      res.render("rol-pagina01.pug", {datos});
      res.end();
      break;

    case "<-":
      datos = control.capturar(datos);
      await modelo.insertarPermisosRol(datos);
      datos = await modelo.obtenerPermisosRol(datos);
      res.render("rol-pagina04.pug", {datos});
      res.end();
      break;

    case "->":
      datos = control.capturar(datos);
      await modelo.borrarPermisosRol(datos);
      datos = await modelo.obtenerPermisosRol(datos);
      res.render("rol-pagina04.pug", {datos});
      res.end();
      break;

    default:
      pagina01 = require("./pagina01");
      break;
      break;
  }
}

router.get("/", getFuncion);
// Muestra el formulario para ingresar el usuario y la contraseña
async function getFuncion(req, res, next) {
  switch (req.body.btnAction) {
    default:
      //   console.log("Entro a default");
      var datos = {};
      datos = await modelo.recuperarRol();

      res.render("rol-pagina01.pug", {datos});
      res.end();

      // pagina01 = require("./pagina01");
      // pagina01(res, datos);
      break;
  }
}

module.exports = router;
