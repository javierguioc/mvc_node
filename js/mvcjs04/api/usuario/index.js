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
        case "Buscar":
            datos = control.capturar(req.body, datos);
            datos = await modelo.recuperarUsuarios(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Eliminar":
            datos = control.capturar(req.body, datos);
            await modelo.borrarUsuario(datos);
            datos["usu_buscar"] = "";
            datos = await modelo.recuperarUsuarios(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Actualizar":
            datos = control.capturar(req.body, datos);
            datos = await modelo.traerUsuario(datos);
            pagina02 = require("./pagina02");
            pagina02(res, datos);
            break;

        case "Enviar Actualizar":
            datos = control.capturar(req.body, datos);
            datos = await modelo.actualizarUsuario(datos);
            datos["usu_buscar"] = "";
            datos = await modelo.recuperarUsuarios(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Nuevo":
            var datos = {};
            pagina03 = require("./pagina03");
            pagina03(res, datos);
            break;

        case "Enviar nuevo":
            // Mensaje de log
            // Ya que la funcion es asincrona, aunque la persona no exista la inserción se va a ejecutar. Por esto se usa la variable bandera 'existe'. Si la persona no existe se evita que se intente insertar un usuario con esa persona.
            datos = control.capturar(req.body, datos);
            // Buscar a la persona para ver si existe

            try {
                let respuesta = await modelo.existePersona(datos);

                // console.log(respuesta.rows);
                // Si la persona no existe se pasa a la pagina 04 de registro de persona
                if (respuesta.rows.length === 0) {
                    // res.redirect("/usuario/pagina04.js?per_id=" + req.body.per_id);
                    datos = control.capturar(req.body, datos);

                    pagina04 = require("./pagina04");
                    pagina04(res, datos);
                } else {
                    // console.log("Si existe la persona");
                    datos = control.capturar(req.body, datos);

                    // Ejecutar la consulta de inserción de usuario
                    let r = await modelo.insertarNuevoUsuaio(datos);
                    datos["usu_buscar"] = "";
                    datos = await modelo.recuperarUsuarios(datos);
                    pagina01 = require("./pagina01");
                    pagina01(res, datos);
                    break;
                }
            } catch (e) {
                console.log("[Usuario03] Error en la consulta de busqueda", e);
            }
            break;

        case "Registrar":
            datos = control.capturar(req.body, datos);

            try {
                // Ejecutar la consulta de inserción de usuario
                let respuesta = await modelo.insertarNuevaPersona(datos);
            } catch (e) {
                console.log("Error");
                console.log(e);
            }
            datos["usu_buscar"] = "";
            datos = await modelo.recuperarUsuarios(datos);
            pagina01 = require("./pagina01");
            pagina01(res, datos);
            break;

        case "Permisos":
            datos = control.capturar(req.body, datos);
            datos = await modelo.obtenerPermisos(datos);
            pagina05 = require("./pagina05");
            pagina05(res, datos);
            break;
        case "<-":
            console.log("object", req.body);
            datos = control.capturar(req.body, datos);

            let usuBD = await modelo.obtenerUsuLogin(datos);
            datos["LoginUsuario"] = usuBD.usu_login;
            // console.log("login usuarui", datos["LoginUsuario"]);
            //datos = control.capturar(req.body, datos);
            await modelo.insertarPermisos(datos);
            datos = await modelo.obtenerPermisos(datos);
            pagina05 = require("./pagina05");
            pagina05(res, datos);
            break;

        case "->":
            // console.log("Se oprimio ->", req.body);
            datos = control.capturar(req.body, datos);
            let usuBD2 = await modelo.obtenerUsuLogin(datos);
            datos["LoginUsuario"] = usuBD2.usu_login;
            //datos["sel_izq"] = req.body.sel_izq;

            await modelo.borrarPermisos(datos);
            datos = await modelo.obtenerPermisos(datos);
            pagina05 = require("./pagina05");
            pagina05(res, datos);
            break;

        default:
            break;
    }
}

router.get("/", getFuncion);
async function getFuncion(req, res, next) {
    console.log("Se hizo get");
    switch (req.body.btnAction) {
        default: console.log("Entro a default");
        var datos = {};
        datos["usu_buscar"] = "";
        datos = await modelo.recuperarUsuarios(datos);
        pagina01 = require("./pagina01");
        pagina01(res, datos);
        break;
    }
}

module.exports = router;