const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res) {
  switch (req.body.btnAction) {
    case "Eliminar":
      var datos = {};
      datos["rol_id"] = req.body.rol_id;
      await modelo.borrarRol(datos);
      datos = await modelo.recuperarRol();
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;
    case "Actualizar":
      var datos = {};
      datos["rol_id"] = req.body.rol_id;
      datos = await modelo.traerRol(datos);
      pagina02 = require("./pagina02");
      pagina02(res, datos);
      break;

    case "Nuevo":
      pagina03 = require("./pagina03");
      pagina03(res);
      break;

    case "Permisos":
      var datos = {};
      datos["rol_id"] = req.body.rol_id;
      datos = await modelo.obtenerPermisosRol(datos);
      pagina04 = require("./pagina04");
      pagina04(res, datos);
      break;

    case "Enviar Actualizar":
      var datos = {};
      datos["rol_id"] = req.body.rol_id;
      datos["rol_nombre"] = req.body.rol_nombre;
      datos["rol_descripcion"] = req.body.rol_descripcion;
      datos = await modelo.actualizarRol(datos);
      datos = await modelo.recuperarRol();
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "Enviar nuevo":
      var datos = {};
      datos["rol_nombre"] = req.body.rol_nombre;
      datos["rol_descripcion"] = req.body.rol_descripcion;
      datos = await modelo.insertarNuevoRol(datos);
      datos = await modelo.recuperarRol();
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "<-":
      var datos = {};
      datos["rol_id"] = req.body.rol_id;
      datos["sel_der"] = req.body.sel_der;
      await modelo.insertarPermisosRol(datos);
      datos = await modelo.obtenerPermisosRol(datos);
      pagina04 = require("./pagina04");
      pagina04(res, datos);
      break;

    case "->":
      var datos = {};
      datos["rol_id"] = req.body.rol_id;
      datos["sel_izq"] = req.body.sel_izq;
      await modelo.borrarPermisosRol(datos);
      datos = await modelo.obtenerPermisosRol(datos);
      pagina04 = require("./pagina04");
      pagina04(res, datos);
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
  console.log("Se hizo get");
  switch (req.body.btnAction) {
    default:
      //   console.log("Entro a default");
      var datos = {};
      datos = await modelo.recuperarRol();
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;
  }
}

module.exports = router;
