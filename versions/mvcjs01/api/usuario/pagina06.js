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

// Muestra las funcionalidades asociadas a un modulo
async function postFunction(req, res, next) {
  console.log("Se hizo post a pag 6:", req.body.per_id);
  let searchUser = `select * from persona as pe, usuario as us where us.per_id=pe.per_id and pe.per_id::integer=${req.body.per_id}`;
  console.log("consulta:", searchUser);
  let client = new Client(connectionData);
  client.connect();
  let user = await client.query(searchUser);
  //   client.end();

  user = JSON.parse(JSON.stringify(user.rows[0])) || "";
  console.log(user);
  // 1
  let sql1 = `select * from usuarioxrol as ur, rol as ro, usuario as us where ro.rol_id=ur.rol_id and ur.usu_login=us.usu_login and us.per_id::integer=${req.body.per_id}`;
  console.log("consulta:", sql1);
  //   let client = new Client(connectionData);
  //   client.connect();
  let res1 = await client.query(sql1);
  //   client.end();

  res1 = JSON.parse(JSON.stringify(res1.rows)) || "";
  console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+", res1);

  //   2
  let sql2 = ` select ro.rol_id,ro.rol_nombre from rol as ro  except  select ro.rol_id,ro.rol_nombre 
from usuarioxrol as ur, rol as ro, usuario as us  
where ro.rol_id=ur.rol_id and us.usu_login=ur.usu_login and us.per_id::integer=${req.body.per_id}
  `;
  console.log("consulta:", sql2);
  //   let client = new Client(connectionData);
  //   client.connect();
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

  let cons = user.usu_login;
  // Boton de asignar y quitar

  res.write(`
<form action="pagina06.js" method="POST" name="form_permisos">
            <input type="hidden" name="per_id" value="${req.body.per_id}">
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

                                <input type="submit" name="btnAction" value="Asignar">
                            </div>
                            <br>
                            <div>
                                <input type="submit" name="btnAction" value="Quitar">
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

//   res.end();
  if (req.body.btnAction == "Quitar") {
    console.log("Se oprimio quitar", req.body);
    // // Permite borrar las funcionalidades de un modulo
    let deleteFunctionality = ` delete from usuarioxrol where usu_login='${cons}' and rol_id::integer=${req.body.sel_izq}
      `;
    console.log(
      "=0===0===00====00000==00==0==0==0=0========00=0===",
      deleteFunctionality
    );
    let client = new Client(connectionData);

    let deleteAnswer = "";
    client.connect();
    client
      .query(deleteFunctionality)
      .then(response => {
        deleteAnswer = response;
        console.log(
          "Respuestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          deleteAnswer
        );
        // res.write(`
        // <form action="pagina06.js" method="POST" name="form_permisos">
        //   <input type="hidden" name="per_id" value="109245683"></input>
        // </form>
        // `)
        res.end();
        // res.redirect("/modulo/index.js");
        
      })
      .catch(err => {
        client.end();
        // res.write(`
        // <form action="pagina06.js" method="POST" name="form_permisos">
        //   <input type="hidden" name="per_id" value="${req.body.per_id}"></input>
        // </form>
        // `)
        res.end();
        // res.redirect("/modulo/index.js");
      });
      res.write(`
        <form action="pagina06.js" method="POST" name="form_permisos">
          <input type="hidden" name="per_id" value="123"></input>
          <input type="submit" name="btnAction" value="Recargar">
        </form>
        `)
        res.end();
  }

  if (req.body.btnAction == "Asignar") {
    console.log("Se oprimio Asignar");
    // // Permite borrar las funcionalidades de un modulo
    let deleteFunctionality = `  insert into usuarioxrol values ('${req.body.sel_der}','${cons}')
      `;
    console.log(
      "=0===0===00====00000==00==0==0==0=0========00=0===",
      deleteFunctionality
    );
    let client = new Client(connectionData);

    let deleteAnswer = "";
    client.connect();
    client
      .query(deleteFunctionality)
      .then(response => {
        deleteAnswer = response;
        console.log(
          "Respuestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          deleteAnswer
        );
        res.end();
      })
      .catch(err => {
        client.end();
        res.end();
        //   res.redirect(`/usuario/index.js`);
      });
      
      res.write(`
      <form action="pagina06.js" method="POST" name="form_permisos">
        <input type="hidden" name="per_id" value="123"></input>
        <input type="submit" name="btnAction" value="Recargar">
      </form>
      `)
      res.end();
  }res.end();

  //       });
  //   }
}

module.exports = router;
