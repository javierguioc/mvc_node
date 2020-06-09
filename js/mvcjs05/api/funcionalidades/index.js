const express = require("express");
const router = express.Router();
ClaseControladorGeneral = require("../general/ClaseControladorGeneral");
// var control = new ClaseControladorGeneral();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/funcionalidad", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  datos = await modelo.recuperarFuncionalidad(datos);
  res.render("funcionalidades-pagina01.pug", { datos });
  res.end();
});

router.post("/eliminar", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  await modelo.borrarFuncionalidad(datos);
  datos = await modelo.recuperarFuncionalidad(datos);
  res.render("funcionalidades-pagina01.pug", { datos });
  res.end();
});

router.post("/actualizar", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  datos = await modelo.traerFuncionalidad(datos);
  res.render("funcionalidades-pagina02.pug", { datos });
  res.end();
});

router.post("/enviaractualizar", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);

  datos = await modelo.actualizarFuncionalidad(datos);
  datos = await modelo.recuperarFuncionalidad(datos);
  res.render("funcionalidades-pagina01.pug", { datos });
  res.end();
});

router.post("/nuevo", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  res.render("funcionalidades-pagina03.pug", { datos });
  res.end();
});

router.post("/enviarnuevo", async (req, res) => {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  datos = await modelo.insertarNuevaFuncionalidad(datos);
  datos = await modelo.recuperarFuncionalidad(datos);
  res.render("funcionalidades-pagina01.pug", { datos });
  res.end();
});

router.post("/", postFunction);

async function postFunction(req, res, next) {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  switch (datos["btnAction"].replace(/ /g, "").toLowerCase()) {
    // case "eliminar":
    //   datos = control.capturar(datos);
    //   await modelo.borrarFuncionalidad(datos);
    //   datos = await modelo.recuperarFuncionalidad(datos);
    //   res.render("funcionalidades-pagina01.pug", { datos });
    //   res.end();
    //   break;

    // case "actualizar":
    //   datos = control.capturar(datos);
    //   datos = await modelo.traerFuncionalidad(datos);
    //   res.render("funcionalidades-pagina02.pug", { datos });
    //   res.end();
    //   break;

    // case "enviaractualizar":
    //   datos = control.capturar(datos);
    //   datos = await modelo.actualizarFuncionalidad(datos);
    //   datos = await modelo.recuperarFuncionalidad(datos);
    //   res.render("funcionalidades-pagina01.pug", { datos });
    //   res.end();
    //   break;

    // case "nuevo":
    //   datos = control.capturar(datos);
    //   res.render("funcionalidades-pagina03.pug", { datos });
    //   res.end();
    //   break;

    // case "enviarnuevo":
    //   datos = control.capturar(datos);
    //   datos = await modelo.insertarNuevaFuncionalidad(datos);
    //   datos = await modelo.recuperarFuncionalidad(datos);
    //   res.render("funcionalidades-pagina01.pug", { datos });
    //   res.end();
    //   break;

    // case "funcionalidades":
    //   datos = control.capturar(datos);
    //   datos = await modelo.recuperarFuncionalidad(datos);
    //   res.render("funcionalidades-pagina01.pug", { datos });
    //   res.end();
    //   break;
  }
}

module.exports = router;
