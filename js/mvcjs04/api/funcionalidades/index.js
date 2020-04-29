const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {

    switch (req.body.btnAction) {
        case "Eliminar":
            var datos = {};
            datos["fun_id"] = req.body.fun_id;  
            datos["mod_id"] = req.body.mod_id; 
            await modelo.borrarFuncionalidad(datos);
            datos = await modelo.recuperarFuncionalidad(datos);  
            pagina01 = require("./pagina01");
            pagina01(res,datos);
            break;
        
        case "Actualizar":
            var datos = {};
            datos["mod_id"] = req.body.mod_id;
            datos["fun_id"]= req.body.fun_id;
            datos = await modelo.traerFuncionalidad(datos);
            pagina02 = require("./pagina02");
            pagina02(res,datos);
            break;

        case  "Enviar Actualizar":
            var datos = {};
            console.log('Datos Actualizar', datos)
            datos["mod_id"] = req.body.mod_id;
            datos["fun_id"] = req.body.fun_id;
            datos["fun_nombre"] = req.body.fun_nombre;
            datos["fun_ruta"] = req.body.fun_ruta;
            datos["fun_descripcion"] = req.body.fun_descripcion;
            datos = await modelo.actualizarFuncionalidad(datos);
            datos = await modelo.recuperarFuncionalidad(datos);  
            pagina01 = require("./pagina01");
            pagina01(res,datos);
            break;
        
        case "Nuevo":
            var datos = {};
            datos["mod_id"] = req.body.mod_id;
            pagina03 = require("./pagina03");
            pagina03(res,datos);
            break;

        case "Enviar Nuevo":
            var datos = {};
            datos["mod_id"] = req.body.mod_id;
            datos["fun_nombre"] = req.body.fun_nombre;
            datos["fun_ruta"] = req.body.fun_ruta;
            datos["fun_descripcion"] = req.body.fun_descripcion;
            datos = await modelo.insertarNuevaFuncionalidad(datos);
            datos = await modelo.recuperarFuncionalidad(datos);  
            pagina01 = require("./pagina01");
            pagina01(res,datos);
            break;

        case  "Funcionalidades":
            var datos = {};
            datos["mod_id"] = req.body.mod_id; 
            datos = await modelo.recuperarFuncionalidad(datos);  
            pagina01 = require("./pagina01");
            pagina01(res,datos);
            break;
    }
}

module.exports = router;