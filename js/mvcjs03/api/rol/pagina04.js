module.exports = async function (res,datos) {
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

