const express = require("express");
const router = express.Router();
Modelo = require("./modelo");

var modelo = new Modelo();

router.post("/", postFunction);

// Muestra los permisos de un usuario
async function postFunction(req, res, next) {
  console.log("[Se hizo post a pag 6]:", req.body);
  if (req.body.btnAction == "Permisos") {
    await show_structure(req.body.per_id, res);
  }
  let LoginUsuario = await getUsuLogin(req.body.per_id);

  
  if (req.body.btnAction == "->") {
    console.log("Se oprimio ->", req.body);
    var datos = { LoginUsuario };
    datos["sel_izq"] = req.body.sel_izq;

    await modelo.borrarPermisos(datos);
    show_structure(req.body.per_id, res);
  }

  if (req.body.btnAction == "<-") {
    console.log("Se oprimio <-");
    // // Permite borrar las funcionalidades de un modulo

    var datos = { LoginUsuario };
    datos["sel_der"] = req.body.sel_der;

    await modelo.insertarPermisos(datos);
    show_structure(req.body.per_id, res);
  }
}
// Retorna el login del usuario que se esta mostrando
getUsuLogin = async (per_id) => {
  var datos = { per_id };

  datos = await modelo.obtenerUsuLogin(datos);
  
  return datos["usu_login"];
};

// Muestra la estructura del formulario
show_structure = async (per_id, res) => {

  var datos = { per_id };
  datos = await modelo.obtenerPermisos(datos);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
    <h3> Codigo: ${datos["user"]["per_id"]}&nbsp;&nbsp;&nbsp;&nbsp;
    Nombre: ${datos["user"]["per_nombre"]}&nbsp;&nbsp;&nbsp;&nbsp;
    Apellido: ${datos["user"]["per_apellido"]}
    </h3>`);

  // Boton de <- y ->

  res.write(`
  <form action="pagina05.js" method="POST" name="form_permisos">
              <input type="hidden" name="per_id" value="${per_id}">
                  <table>
                      <tr>
                          <th>
                              <select name="sel_izq" size="4">`);
  datos["res1"].forEach((element) => {
    res.write(
      `
                                          <option value="${element.rol_id}">${element.rol_nombre}</option>
                                          `
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

  datos["res2"].forEach((element) => {
    res.write(
      `
                                    <option value="${element.rol_id}">${element.rol_nombre}</option>
                                    `
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
