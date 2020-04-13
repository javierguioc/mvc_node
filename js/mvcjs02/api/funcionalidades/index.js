//Importa los requerimientos necesarios para el funcionamiento
const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

// Muestra las funcionalidades asociadas a un modulo
async function postFunction(req, res, next) {
  console.log(req.body, "+++++++++++++++++++++++++");
  if (req.body.btnAction != "Eliminar") {


    var datos = {};
    datos.mod_id = req.body.mod_id; 
    datos = await modelo.recuperarFuncionalidad(datos);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Funcionalidades:</h2>`);
    res.write(
      `<form method="POST" action="index.js">
        <table border="5" width="200">`
    );
    datos.Funcionalidad.forEach(element => {
      res.write(
        `
        <tr><td><center> <input type="radio" name="fun_id" value="${element.fun_id}"></td>
        <td> ${element.fun_nombre}</center></td></tr>
        `
      );
    });
    res.write(`
    </table><br>
    <input type="submit" value="Eliminar" name="btnAction" />
    <input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>
    <input type="submit" value="Nuevo" name="btnAction" formaction="pagina03.js"/>
    <INPUT type="hidden" value="${req.body.mod_id}" name="mod_id" size="25">
    
    </form>`);

    res.end();
  } else {
    // Permite borrar las funcionalidades de un modulo
    var datos = {};
    datos.fun_id = req.body.fun_id;  
    await modelo.borrarFuncionalidad(datos);
    res.redirect(`/modulo/index.js`);

  }
}

module.exports = router;