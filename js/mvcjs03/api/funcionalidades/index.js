const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {

    switch (req.body.btnAction) {
        case "Eliminar":
        
        case "Actualizar":
        
        case "Nuevo":
        
        case  "Enviar Actualizar":

        case "Enviar Nuevo":
        
        default:
        
        break;
    }
}

module.exports = router;