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

const client = new Client(connectionData);
client.connect();

router.post("/", postFunction);
//router.get("/", getFunction);

async function postFunction(req, res, next) {
  let ListarRol = `select * from rol as ro where ro.rol_id::integer=${req.body.rol_id}`;
  let client = new Client(connectionData);
    client.connect();
    let Rol = await client.query(ListarRol);
    //client.end();
    Rol = JSON.parse(JSON.stringify(Rol.rows[0])) || "";

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <h3>Codigo: ${Rol.rol_id} </h3>
    <h3>Nombre: ${Rol.rol_nombre} </h3>
    <h3>Descripcion: ${Rol.rol_descripcion} </h3> `);

    if (req.body.btnAction == "Quitar") {
      console.log(req.body);
      let r_id =  req.body.rol_id.trim();
      let f_id =  req.body.fun_id.trim();
        deleteRxF= `delete from rolxfuncionalidad where rol_id='${r_id}' and fun_id='${f_id}' `;
        console.log(deleteRxF);
        const client = new Client(connectionData);
        let deleteAnswer = "";
        client.connect();
        client
          .query(deleteRxF)
          .then(response => {
            deleteAnswer = response;
            res.redirect(`/rol/pagina04.js`);
          })
          .catch(err => {
            client.end();
            //res.redirect(`/rol/pagina04.js`);
          });

    }

    if (req.body.btnAction == "Asignar"){
      console.log(req.body);
      let r_id =  req.body.rol_id.trim();
      let f_id =  req.body.fun_id.trim();
      InsertRxF = `insert into rolxfuncionalidad values ('${r_id}','${f_id}') `;
      console.log(InsertRxF)
      let insertResponse = await client.query(InsertRxF);
    }
    res.write(
      ` <form action="pagina04.js" method="POST" name="form_permisos">`
    );
    res.write(
      ` <INPUT type="hidden" value="${req.body.rol_id}" name="rol_id" size="25">`
    );

    
      let ListarRxF = `select * from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${req.body.rol_id}'`;
      let RolxFun = await client.query(ListarRxF);
      RolxFun = JSON.parse(JSON.stringify(RolxFun.rows)) || "";
      //console.log(RolxFun)
      
      let ListarFun = `select fu.fun_id, fu.fun_nombre from funcionalidad as fu except select fu.fun_id, fu.fun_nombre from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${req.body.rol_id}'`;
      let Funciones = await client.query(ListarFun);
      Funciones = JSON.parse(JSON.stringify(Funciones.rows)) || "";
      //console.log(Funciones)

      res.write(
        `   <H2>FUNCIONALIDADES DEL ROL</H2>  `
      );

      RolxFun.forEach(element => {
        res.write(
          `<tr><td><center> <input type="radio" name="fun_id" value="${element.fun_id} "></td> <td> ${element.fun_nombre} </center></td></tr>`
        );
      });
      res.write(
        `   <H2>ASIGNAR FUNCIONALIDADES</H2>  `
      ); 

      Funciones.forEach(element => {
        res.write(
          `<tr><td><center> <input type="radio" name="fun_id" value="${element.fun_id} "></td> <td> ${element.fun_nombre} </td></tr>`
        );
      });

      res.write(
        `
        <th>
            <div>
                 <input type="submit" name="btnAction" value="Asignar">
            </div>
            <br>
            <div>
                 <input type="submit" name="btnAction" value="Quitar">
            </div>
         </th>        
        `
      );

res.end();
}

module.exports = router;