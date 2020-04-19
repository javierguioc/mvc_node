const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  console.log("Se hizo post:", req.body);
  switch (req.body.btnAction) {
    case "Eliminar":
            var datos = {};
            datos["mod_id"] = req.body.mod_id;  
            await modelo.borrarModulo(datos);
            datos = await modelo.recuperarModulo();
            pagina01 = require("./pagina01");
            pagina01(res,datos);
    case "Actualizar":
      var datos = {};
      datos["mod_id"] = req.body.mod_id;
      datos = await modelo.traerModulo(datos);
      pagina02 = require("./pagina02");
      pagina02(res,datos);

    case  "Enviar Actualizar":
      var datos = {};
      console.log('Datos Actualizar', datos)
      datos["mod_id"] = req.body.mod_id;
      datos["mod_nombre"] = req.body.mod_nombre;
      datos["mod_descripcion"] = req.body.mod_descripcion;
      datos = await modelo.actualizarModulo(datos);
      datos = await modelo.recuperarModulo();
      pagina01 = require("./pagina01");
      pagina01(res,datos);
    default:
      pagina01 = require("./pagina01");
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
      datos = await modelo.recuperarModulo();
      pagina01 = require("./pagina01");
      pagina01(res,datos);
      break;
  }
}

module.exports = router;