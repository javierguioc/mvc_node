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
  console.log("[Se hizo post a pag 6]:", req.body);
  if (req.body.btnAction == "Permisos") {
    show_structure(req.body.per_id, res);
  }
  let LoginUsuario = await getUsuLogin(req.body.per_id);
  //   res.end();
  if (req.body.btnAction == "->") {
    console.log("Se oprimio ->", req.body);
    let BorrarPermiso = ` delete from usuarioxrol where usu_login='${LoginUsuario}' and rol_id::integer=${req.body.sel_izq}
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
        show_structure(req.body.per_id, res);
      })
      .catch(err => {
        console.log("reject", err);
        show_structure(req.body.per_id, res);
      });
  }

  if (req.body.btnAction == "<-") {
    console.log("Se oprimio <-");
    // // Permite borrar las funcionalidades de un modulo
    let InsertarPermiso = `  insert into usuarioxrol values ('${req.body.sel_der}','${LoginUsuario}')
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
        show_structure(req.body.per_id, res);
      })
      .catch(err => {
        console.log("reject", err);
        show_structure(req.body.per_id, res);
      });
  }
}
// Retorna el login del usuario que se esta mostrando
getUsuLogin = async per_id => {
  let searchUser = `select * from persona as pe, usuario as us where us.per_id=pe.per_id and pe.per_id::integer=${per_id}`;

  let client = new Client(connectionData);
  client.connect();
  let user = await client.query(searchUser);

  user = JSON.parse(JSON.stringify(user.rows[0])) || "";
  return user.usu_login;
};

// Muestra la estructura del formulario
show_structure = async (per_id, res) => {
  let searchUser = `select * from persona as pe, usuario as us where us.per_id=pe.per_id and pe.per_id::integer=${per_id}`;
  //console.log("consulta:", searchUser);
  let client = new Client(connectionData);
  client.connect();
  let user = await client.query(searchUser);
  // console.log("Usuario: ", user);
  user = JSON.parse(JSON.stringify(user.rows[0])) || "";

  let sql1 = `select * from usuarioxrol as ur, rol as ro, usuario as us where ro.rol_id=ur.rol_id and ur.usu_login=us.usu_login and us.per_id::integer=${per_id}`;
  console.log("consulta:", sql1);

  let res1 = await client.query(sql1);

  res1 = JSON.parse(JSON.stringify(res1.rows)) || "";

  //   2
  let sql2 = ` select ro.rol_id,ro.rol_nombre from rol as ro  except  select ro.rol_id,ro.rol_nombre 
  from usuarioxrol as ur, rol as ro, usuario as us  
  where ro.rol_id=ur.rol_id and us.usu_login=ur.usu_login and us.per_id::integer=${per_id}
  `;

  let res2 = await client.query(sql2);
  client.end();

  res2 = JSON.parse(JSON.stringify(res2.rows)) || "";
  console.log(res2);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
    <h3> Codigo: ${user.per_id}&nbsp;&nbsp;&nbsp;&nbsp;
    Nombre: ${user.per_nombre}&nbsp;&nbsp;&nbsp;&nbsp;
    Apellido: ${user.per_apellido}
    </h3>`);

  // Boton de <- y ->

  res.write(`
  <form action="pagina05.js" method="POST" name="form_permisos">
              <input type="hidden" name="per_id" value="${per_id}">
                  <table>
                      <tr>
                          <th>
                              <select name="sel_izq" size="4">`);
  res1.forEach(element => {
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

  res2.forEach(element => {
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
