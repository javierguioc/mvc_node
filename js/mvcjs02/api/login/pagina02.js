const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);
// Recibe el usuario y la contraseña y verifica que exista en la base de datos
async function postFunction(req, res, next) {
  var datos = {};
  datos["usu_login"] = req.body.usuario;
  datos["usu_clave"] = req.body.pass;
  
  console.log("asdfdasfafafadsfasdfasdfasdfasdfdsaf",datos)
  datos = await modelo.validar(datos);
  console.log("object: ", datos);
  // Verifica que la existencia del usuario y su respectiva contraseña sean validas
  if (
    datos["r_usu_login"] === datos["usu_login"] &&
    datos["r_usu_clave"] === datos["usu_clave"]
  ) {
    let cant = datos["queryRole"]["cant"];
    let us = datos["usu_login"];
    if (parseInt(cant) === 1) {
      res.redirect(
        `/login/pagina03.js?usu_login=${datos["usu_login"]}&rol_id=${datos["rol_id"]}`
      );
    } 
    else if   (parseInt(cant) === 0){
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<p>El usuario seleccionado no tiene asignado un rol</p>
        <br><button onclick="window.location.href = '/'">Salir</button>`
      );
      res.end();
    }
    else {
      datos=await modelo.Roles(datos);
      console.log('Roles Usuario',datos["Roles"]);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<p>ROLES DEL USUARIO:  ${datos["Roles"][0].usu_login}</p>`
      );
      res.write(`<form method="POST" >`);
      datos["Roles"].forEach(element => {
        res.write(
          ` <input type="radio" name="rol_id" value="${element.rol_id} "> ${element.rol_nombre}</br>`
        );
      });
      res.write(
        `<br><input type="submit" value="Aceptar" name="btnAction" formaction="pagina03.js"/>
        <INPUT type="hidden" value="${datos["Roles"][0].usu_login}" name="rol_id" size="25">
        `
      );
      res.write(`<button onclick="window.location.href = '/'">Salir</button> `);
      res.end();
    }
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
