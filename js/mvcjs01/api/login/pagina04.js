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
router.get("/", getFunction);
router.post("/", postFunction);


async function postFunction(req, res, next) {
    console.log(req.body)
    let usu_login = req.body.usu_login;
    let rol_id = req.body.rol_id;
    console.log(usu_login, rol_id)
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

    //Trae las funcion
    let FuncionesUsuario = `select * from 
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
    and ro.rol_id::integer='${rol_id}' ;`;
    console.log(FuncionesUsuario)
    let FunxUsu = "";

    try {
        let client = new Client(connectionData);
        client.connect();
        FunxUsu = await client.query(FuncionesUsuario);
        FunxUsu = JSON.parse(JSON.stringify(FunxUsu.rows)) || "";
        console.log(FunxUsu)
        client.end();
    } catch (err) {
        console.log("[Error Pagina04] ", err);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
  <h3>Usuario: ${usu_login} </h3>
  <h3>Rol:  ${result.rol_nombre} </h3>
  <h3>Descripcion:  ${result.rol_descripcion} </h3>
  <h3>Permisos:  </h3>
  `);
    FunxUsu.forEach(element => {
        res.write(
            ` ${element.fun_nombre} </br>`
        );
    });

    res.write(`<br><button onclick="window.location.href = '/'">Salir</button> `)
    res.end();

}
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

    //Trae las funcion
    let FuncionesUsuario = `select f.fun_nombre from usuarioxrol as uxr, rolxfuncionalidad as rxf, funcionalidad as f where uxr.rol_id=rxf.rol_id and rxf.fun_id=f.fun_id and uxr.usu_login='${usu_login}'`;
    console.log(FuncionesUsuario)
    let FunxUsu = "";

    try {
        let client = new Client(connectionData);
        client.connect();
        FunxUsu = await client.query(FuncionesUsuario);
        FunxUsu = JSON.parse(JSON.stringify(FunxUsu.rows)) || "";
        console.log(FunxUsu)
        client.end();
    } catch (err) {
        console.log("[Error Pagina04] ", err);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
  <h3>Usuario: ${usu_login} </h3>
  <h3>Rol:  ${result.rol_nombre} </h3>
  <h3>Descripcion:  ${result.rol_descripcion} </h3>
  <h3>Permisos:  </h3>
  `);
    FunxUsu.forEach(element => {
        res.write(
            ` ${element.fun_nombre} </br>`
        );
    });

    res.write(`<br><button onclick="window.location.href = '/'">Salir</button> `)
    res.end();
}

module.exports = router;