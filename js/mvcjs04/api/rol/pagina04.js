ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();

module.exports = async function(res, datos) {
    console.log("RolPagina4", datos)
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <h3> Codigo: ${datos.Rol.rol_id}&nbsp;&nbsp;&nbsp;&nbsp;
    Nombre: ${datos.Rol.rol_nombre}&nbsp;&nbsp;&nbsp;&nbsp;
    Descripcion: ${datos.Rol.rol_descripcion}
    </h3>`);

    // Boton de <- y ->

    res.write(`
  <form action="./index.js" method="POST" name="form_permisos">
              <input type="hidden" name="rol_id" value="${datos.Rol.rol_id}">
                  <table>
                      <tr>
                          <th>
                              ${vista.select('sel_izq',  datos["RolxFun"],"4","fun_id","fun_nombre")}
                              </th>
                          <th>
                              <div>
                              ${vista.boton("<-")}
                              </div>
                              <br>
                              <div>
                              ${vista.boton("->")}
                              </div>
                          </th>
                          <th>
                          ${vista.select('sel_der', datos["Funciones"],"4","fun_id","fun_nombre")}
                          </th>
                          </tr>
                      </table>
             
              </form> `);
    res.end();
};