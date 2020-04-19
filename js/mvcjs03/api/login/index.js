const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {

    switch (req.body.btnAction) {
        case "Ingresar":
            var datos = {};
            datos["usu_login"] = req.body.usuario;
            datos["usu_clave"] = req.body.pass;
            datos = await modelo.validar(datos);
            
        default:
        
        break;
    }
}

module.exports = router;
