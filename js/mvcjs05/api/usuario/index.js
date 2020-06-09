const express = require("express");
const router = express.Router();
ClaseControladorGeneral = require("../general/ClaseControladorGeneral");
// var control = new ClaseControladorGeneral();
Modelo = require("./modelo");
var modelo = new Modelo();

router.post("/", postFunction);

async function postFunction(req, res, next) {
  var control = new ClaseControladorGeneral(req.body);
  var datos = {};
  datos = control.capturar(datos);
  switch (datos["btnAction"].replace(/ /g, "").toLowerCase()) {
    case "buscar":
      datos = control.capturar(datos);
      datos = await modelo.recuperarUsuarios(datos);
      res.render("usuario-pagina01.pug", { datos });
      res.end();
      break;

    case "eliminar":
      datos = control.capturar(datos);
      await modelo.borrarUsuario(datos);
      datos["usu_buscar"] = "";
      datos = await modelo.recuperarUsuarios(datos);
      res.render("usuario-pagina01.pug", { datos });
      res.end();
      break;

    case "actualizar":
      datos = control.capturar(datos);
      datos = await modelo.traerUsuario(datos);
      res.render("usuario-pagina02.pug", { datos });
      res.end();
      break;

    case "enviaractualizar":
      datos = control.capturar(datos);
      datos = await modelo.actualizarUsuario(datos);
      datos["usu_buscar"] = "";
      datos = await modelo.recuperarUsuarios(datos);
      res.render("usuario-pagina01.pug", { datos });
      break;

    case "nuevo":
      var datos = {};
      res.render("usuario-pagina03.pug", { datos });
      res.end();
      break;

    case "enviarnuevo":
      // Mensaje de log
      // Ya que la funcion es asincrona, aunque la persona no exista la inserción se va a ejecutar. Por esto se usa la variable bandera 'existe'. Si la persona no existe se evita que se intente insertar un usuario con esa persona.
      datos = control.capturar(datos);
      // Buscar a la persona para ver si existe

      try {
        let respuesta = await modelo.existePersona(datos);

        // console.log(respuesta.rows);
        // Si la persona no existe se pasa a la pagina 04 de registro de persona
        if (respuesta.rows.length === 0) {
          // res.redirect("/usuario/pagina04.js?per_id=" + req.body.per_id);
          datos = control.capturar(datos);

          res.render("usuario-pagina04.pug", { datos });
          res.end();
        } else {
          // console.log("Si existe la persona");
          datos = control.capturar(datos);

          // Ejecutar la consulta de inserción de usuario
          let r = await modelo.insertarNuevoUsuaio(datos);
          datos["usu_buscar"] = "";
          datos = await modelo.recuperarUsuarios(datos);
          res.render("usuario-pagina01.pug", { datos });
          res.end();
          break;
        }
      } catch (e) {
        console.log("[Usuario03] Error en la consulta de busqueda", e);
      }
      break;

    case "registrar":
      datos = control.capturar(datos);

      try {
        // Ejecutar la consulta de inserción de usuario
        let respuesta = await modelo.insertarNuevaPersona(datos);
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
      datos["usu_buscar"] = "";
      datos = await modelo.recuperarUsuarios(datos);
      res.end();
      break;

    case "permisos":
      datos = control.capturar(datos);
      datos = await modelo.obtenerPermisos(datos);
      res.render("usuario-pagina05.pug", { datos });
      res.end();
      break;
    case "<-":
      console.log("object", req.body);
      datos = control.capturar(datos);

      let usuBD = await modelo.obtenerUsuLogin(datos);
      datos["LoginUsuario"] = usuBD.usu_login;
      // console.log("login usuarui", datos["LoginUsuario"]);
      //datos = control.capturar( datos);
      await modelo.insertarPermisos(datos);
      res.render("usuario-pagina05.pug", { datos });
      // res.end();
      // pagina05(res, datos);
      break;

    case "->":
      // console.log("Se oprimio ->", req.body);
      datos = control.capturar(datos);
      let usuBD2 = await modelo.obtenerUsuLogin(datos);
      datos["LoginUsuario"] = usuBD2.usu_login;
      //datos["sel_izq"] = req.body.sel_izq;

      await modelo.borrarPermisos(datos);
      datos = await modelo.obtenerPermisos(datos);
      res.render("usuario-pagina05.pug", { datos });
      res.end();
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
      res.render("usuario-pagina01.pug", { datos });
      res.end();
      break;
  }
}

module.exports = router;
