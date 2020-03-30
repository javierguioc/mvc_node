const { Client } = require("pg");
const express = require("express");
const router = express.Router();

router.get("/", getFunction);

// Parametros para la conexion con la base de datos
const connectionData = {
  user: "efi",
  host: "localhost",
  database: "efi",
  password: "efi",
  port: 5432
};

async function getFunction(req, res, next) {
  let usu_login = req.query.usu_login;
  let rol_id = req.query.rol_id;
  // Trae información del usuario, su rol, modalidades a las que puede acceder
  let sql = `select * from 
  usuario as usu,  
  rol as ro,  
  usuarioxrol as usr,  
  modulo as mo,  
  funcionalidad as fun,  
  rolxfuncionalidad as rf  
  where usu.usu_login=usr.usu_login  
  and ro.rol_id=usr.rol_id  
  and fun.mod_id=mo.mod_id  
  and rf.rol_id=ro.rol_id  
  and rf.fun_id=fun.fun_id  
  and usu.usu_login='${usu_login}'  
  and ro.rol_id='${rol_id}' ;`;

  let result = "";

  try {
    let client = new Client(connectionData);
    client.connect();
    result = await client.query(sql);
    result = JSON.parse(JSON.stringify(result.rows[0])) || "";

    client.end();
  } catch (err) {
    console.log("[Error Pagina04] ", err);
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
  <h3>Usuario: ${result.rol_nombre} </h3>
  <h3>Rol:  ${result.rol_nombre} </h3>
  <h3>Descripcion:  ${result.rol_descripcion} </h3>
  <br><button onclick="window.location.href = '/'">Salir</button>`);
  res.end();
}

module.exports = router;
