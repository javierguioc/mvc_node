
// Muestra la estructura del formulario
module.exports = async function (res, datos) {

 

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

