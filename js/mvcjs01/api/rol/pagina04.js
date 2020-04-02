//Importa los requerimientos necesarios para el funcionamiento
const { Client } = require("pg");
const express = require("express");
const router = express.Router();

// Parametros para la conexion con la base de datos
const connectionData = {
  user: "efi",
  host: "localhost",
  database: "efi",
  password: "efi",
  port: 5432
};

router.post("/", postFunction);

// Muestra los permisos de un usuario
async function postFunction(req, res, next) {
  console.log("[Se hizo post a pag 4]:", req.body);
  if (req.body.btnAction == "Permisos") {
    Mostrar_estructura(req.body.rol_id, res);
  }
  let Rol_id = req.body.rol_id.trim();
  //   res.end();
  if (req.body.btnAction == "->") {
    console.log("Se oprimio ->", req.body);
    let BorrarPermiso = `delete from rolxfuncionalidad where rol_id='${Rol_id}' and fun_id::integer=${req.body.sel_izq}
    `;
    // console.log("Delete ", BorrarPermiso);
    let client = new Client(connectionData);

    let deleteAnswer = "";
    client.connect();
    client
      .query(BorrarPermiso)
      .then(response => {
        deleteAnswer = response;
        // console.log("resolve", deleteAnswer);
        Mostrar_estructura(req.body.rol_id, res);
      })
      .catch(err => {
        console.log("reject", err);
        Mostrar_estructura(req.body.rol_id, res);
      });
  }

  if (req.body.btnAction == "<-") {
    console.log("Se oprimio <-");
    // // Permite borrar las funcionalidades de un modulo
    let InsertarPermiso = `  insert into rolxfuncionalidad values ('${Rol_id}','${req.body.sel_der}')
      `;

    // console.log("Inser ", InsertarPermiso);
    let client = new Client(connectionData);

    let deleteAnswer = "";
    client.connect();
    client
      .query(InsertarPermiso)
      .then(response => {
        deleteAnswer = response;
        // console.log("resolve", deleteAnswer);
        Mostrar_estructura(req.body.rol_id, res);
      })
      .catch(err => {
        console.log("reject", err);
        Mostrar_estructura(req.body.rol_id, res);
      });
  }
}


// Muestra la estructura del formulario
Mostrar_estructura = async (rol_id, res) => {

  let ListarRol = `select * from rol as ro where ro.rol_id::integer=${rol_id}`;
  console.log(ListarRol);
  let client = new Client(connectionData);
  client.connect();
  let Rol = await client.query(ListarRol);
  Rol = JSON.parse(JSON.stringify(Rol.rows[0])) || "";
  console.log(Rol);
  //Consulta rol por funcionalidad
 let ListarRxF = `select * from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${rol_id}'`;
 console.log(ListarRxF);
 let RolxFun = await client.query(ListarRxF);
 console.log(RolxFun);
 RolxFun = JSON.parse(JSON.stringify(RolxFun.rows)) || "";
//Consulta Funcionalidades
 let ListarFun = `select fu.fun_id, fu.fun_nombre from funcionalidad as fu except select fu.fun_id, fu.fun_nombre from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${rol_id}'`;
 console.log(ListarFun);
 let Funciones = await client.query(ListarFun);
 Funciones = JSON.parse(JSON.stringify(Funciones.rows)) || "";
 console.log(Funciones)
 client.end();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
    <h3> Codigo: ${Rol.rol_id}&nbsp;&nbsp;&nbsp;&nbsp;
    Nombre: ${Rol.rol_nombre}&nbsp;&nbsp;&nbsp;&nbsp;
    Descripcion: ${Rol.rol_descripcion}
    </h3>`);

  // Boton de <- y ->

  res.write(`
  <form action="pagina04.js" method="POST" name="form_permisos">
              <input type="hidden" name="rol_id" value="${rol_id}">
                  <table>
                      <tr>
                          <th>
                              <select name="sel_izq" size="4">`);
  RolxFun.forEach(element => {
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

  Funciones.forEach(element => {
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
