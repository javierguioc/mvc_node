const express = require("express");
const router = express.Router();
ClaseControladorGeneral = require("../general/ClaseControladorGeneral");
var control = new ClaseControladorGeneral();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
    var datos = {};
    datos = control.capturar(req.body, datos);
    switch (datos["btnAction"]) {

        case "Eliminar":
            datos = control.capturar(req.body, datos);
            await modelo.borrarFuncionalidad(datos);
            datos = await modelo.recuperarFuncionalidad(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Actualizar":
            datos = control.capturar(req.body, datos);
            datos = await modelo.traerFuncionalidad(datos);
            pagina02 = require("./pagina02");
            pagina02(res, datos);
            break;

        case "Enviar Actualizar":
            datos = control.capturar(req.body, datos);
            datos = await modelo.actualizarFuncionalidad(datos);
            datos = await modelo.recuperarFuncionalidad(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Nuevo":
            datos = control.capturar(req.body, datos);
            pagina03 = require("./pagina03");
            pagina03(res, datos);
            break;

        case "Enviar Nuevo":
            datos = control.capturar(req.body, datos);
            datos = await modelo.insertarNuevaFuncionalidad(datos);
            datos = await modelo.recuperarFuncionalidad(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Funcionalidades":
            datos = control.capturar(req.body, datos);
            datos = await modelo.recuperarFuncionalidad(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;
    }
}

module.exports = router;