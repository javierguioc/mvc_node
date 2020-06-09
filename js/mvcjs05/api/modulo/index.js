const express = require("express");
const router = express.Router();
ClaseControladorGeneral = require("../general/ClaseControladorGeneral");
// var control = new ClaseControladorGeneral();
Modelo = require("./modelo");
var modelo = new Modelo();

// [POST] http://localhost:3000/modulo/index.js/eliminar
router.post("/eliminar", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);

  await modelo.borrarModulo(datos);
  datos = await modelo.recuperarModulo();
  res.render("modulo-pagina01.pug", { datos });
  res.end();
});

// [POST] http://localhost:3000/modulo/index.js/actualizar
router.post("/actualizar", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);

  datos = await modelo.traerModulo(datos);
  res.render("modulo-pagina02.pug", { datos });
  res.end();
});

// [POST] http://localhost:3000/modulo/index.js/enviaractualizar
router.post("/enviaractualizar", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);

  datos = await modelo.actualizarModulo(datos);
  datos = await modelo.recuperarModulo();
  res.render("modulo-pagina01.pug", { datos });
  res.end();
});

// [POST] http://localhost:3000/modulo/index.js/nuevo
router.post("/nuevo", async (req, res) => {
  var datos = {};
  res.render("modulo-pagina03.pug", { datos });
  res.end();
});

// [POST] http://localhost:3000/modulo/index.js/nuevo
router.post("/enviarnuevo", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  datos = await modelo.insertarNuevoModulo(datos);
  datos = await modelo.recuperarModulo();
  res.render("modulo-pagina01.pug", { datos });
  res.end();
});

// [GET] http://localhost:3000/modulo/index.js
router.get("/", async (req, res) =>{
  console.log("Se hizo get");
  switch (req.body.btnAction) {
    default:
      //   console.log("Entro a default");
      var datos = {};
      datos = await modelo.recuperarModulo();
      res.render("modulo-pagina01.pug", { datos });
      res.end();
      break;
  }
});
// Muestra el formulario para ingresar el usuario y la contraseña


module.exports = router;
