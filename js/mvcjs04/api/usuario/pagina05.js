ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();

// Muestra la estructura del formulario
module.exports = async function(res, datos) {



    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <h3> Codigo: ${datos["user"]["per_id"]}&nbsp;&nbsp;&nbsp;&nbsp;
    Nombre: ${datos["user"]["per_nombre"]}&nbsp;&nbsp;&nbsp;&nbsp;
    Apellido: ${datos["user"]["per_apellido"]}
    </h3>`);

    // Boton de <- y ->

    res.write(`
  <form action="./index.js" method="POST" name="form_permisos">
              <input type="hidden" name="per_id" value="${datos.per_id}">
                  <table>
                      <tr>
                          <th>
                          ${vista.select('sel_izq',  datos["res1"],"4","rol_id","rol_nombre")}
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
                          ${vista.select('sel_der',  datos["res2"],"4","rol_id","rol_nombre")}
                          </th>
                      </tr>
                  </table>
         
          </form>`);
    res.end();
};