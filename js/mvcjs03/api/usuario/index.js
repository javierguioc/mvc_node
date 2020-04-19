const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  console.log("[Se hizo post]:", req.body);
  switch (req.body.btnAction) {
    case "Buscar":
      console.log("Entro a Buscar post");
      var datos = {};
      datos["usu_buscar"] = req.body.buscar;
      datos = await modelo.recuperarUsuarios(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "Eliminar":
      var datos = {};
      datos["per_id"] = req.body.per_id;
      await modelo.borrarUsuario(datos);
      datos["usu_buscar"] = "";
      datos = await modelo.recuperarUsuarios(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;

    case "Actualizar":
      var datos = {};
      datos["per_id"] = req.body.per_id;
      datos = await modelo.traerUsuario(datos);
      pagina02 = require("./pagina02");
      pagina02(res, datos);
      break;

    case "Enviar Actualizar":
      var datos = { ...req.body };
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
      var datos = {};
      datos["per_id"] = req.body.per_id;
      // Buscar a la persona para ver si existe

      try {
        let respuesta = await modelo.existePersona(datos);

        // console.log(respuesta.rows);
        // Si la persona no existe se pasa a la pagina 04 de registro de persona
        if (respuesta.rows.length === 0) {
          // res.redirect("/usuario/pagina04.js?per_id=" + req.body.per_id);
          var datos = {};
          datos["per_id"] = req.body.per_id;

          pagina04 = require("./pagina04");
          pagina04(res, datos);
        } else {
          // console.log("Si existe la persona");
          var datos = {};
          datos["usu_login"] = req.body.usu_login;
          datos["usu_clave"] = req.body.usu_clave;
          datos["per_id"] = req.body.per_id;

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
      var datos = {};
      datos["per_id"] = req.body.per_id;
      datos["per_nombre"] = req.body.per_nombre;
      datos["per_apellido"] = req.body.per_apellido;
      datos["per_fecha_nacimiento"] = req.body.per_fecha_nacimiento;
      datos["per_direccion"] = req.body.per_direccion;
      datos["per_correo"] = req.body.per_correo;

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
      var datos = {};
      datos["per_id"] = req.body.per_id;
      datos = await modelo.obtenerPermisos(datos);
      pagina05 = require("./pagina05");
      pagina05(res, datos);
      break;
    case "<-":
      console.log("object", req.body);
      var datos = {};
      datos.per_id = req.body.per_id;

      let usuBD = await modelo.obtenerUsuLogin(datos);
      datos["LoginUsuario"] = usuBD.usu_login;
      // console.log("login usuarui", datos["LoginUsuario"]);
      datos["sel_der"] = req.body.sel_der;
      await modelo.insertarPermisos(datos);
      datos = await modelo.obtenerPermisos(datos);
      pagina05 = require("./pagina05");
      pagina05(res, datos);
      break;

    case "->":
      // console.log("Se oprimio ->", req.body);
      var datos = {};
      datos.per_id = req.body.per_id;
      let usuBD2 = await modelo.obtenerUsuLogin(datos);
      datos["LoginUsuario"] = usuBD2.usu_login;
      datos["sel_izq"] = req.body.sel_izq;

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
    default:
      console.log("Entro a default");
      var datos = {};
      datos["usu_buscar"] = "";
      datos = await modelo.recuperarUsuarios(datos);
      pagina01 = require("./pagina01");
      pagina01(res, datos);
      break;
  }
}

module.exports = router;
