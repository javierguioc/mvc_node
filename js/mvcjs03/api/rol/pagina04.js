const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

// Muestra los permisos de un usuario
async function postFunction(req, res, next) {
  console.log("[Se hizo post a pag 4]:", req.body);
  if (req.body.btnAction == "Permisos") {
    await Mostrar_estructura(req.body.rol_id, res);
  }
  let RolId = req.body.rol_id.trim();
  //   res.end();
  if (req.body.btnAction == "->") {
    console.log("Se oprimio ->", req.body);
    var datos = {RolId};
    datos["sel_izq"] = req.body.sel_izq;

    await modelo.borrarPermisosRol(datos);
    Mostrar_estructura(req.body.rol_id, res);
    }
  

  if (req.body.btnAction == "<-") {
    console.log("Se oprimio <-");
    // // Permite borrar las funcionalidades de un modulo
    var datos = {RolId};
    datos["sel_der"] = req.body.sel_der;
    
    await modelo.insertarPermisosRol(datos);
    Mostrar_estructura(req.body.rol_id, res);
  }
}



// Muestra la estructura del formulario
Mostrar_estructura = async (rol_id, res) => {
  var datos = { rol_id };
  datos = await modelo.obtenerPermisosRol(datos);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
    <h3> Codigo: ${datos["Rol"]["rol_id"]}&nbsp;&nbsp;&nbsp;&nbsp;
    Nombre: ${datos["Rol"]["rol_nombre"]}&nbsp;&nbsp;&nbsp;&nbsp;
    Descripcion: ${datos["Rol"]["rol_descripcion"]}
    </h3>`);

  // Boton de <- y ->

  res.write(`
  <form action="./index.js" method="POST" name="form_permisos">
              <input type="hidden" name="rol_id" value="${rol_id}">
                  <table>
                      <tr>
                          <th>
                              <select name="sel_izq" size="4">`);
  datos["RolxFun"].forEach(element => {
    res.write(
      `<option value="${element.fun_id}">${element.fun_nombre}</option>`
    );
  });

  res.write(`
                              </select>
                          </th>
                          <th>
                              <div>
  
                                  <input type="submit" name="btnAction" value="<-">
                              </div>
                              <br>
                              <div>
                                  <input type="submit" name="btnAction" value="->">
                              </div>
                          </th>
                          <th>
                              <select name="sel_der" size="4">`);

  datos["Funciones"].forEach(element => {
    res.write(
      `<option value="${element.fun_id}">${element.fun_nombre}</option> `
    );
  });

  res.write(` </select>
                          </th>
                      </tr>
                  </table>
         
          </form>
  `);
  res.end();
};

module.exports = router;
