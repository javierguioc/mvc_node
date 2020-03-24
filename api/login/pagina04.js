const mysql = require("mysql");
const express = require("express");
const router = express.Router();

router.get("/", function_get);

let connection;

connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "12345",
  database: "efi"
});

connection.connect(err => {
  if (err) {
    console.error("[DB error]:", err);
  } else {
    console.log("BD conectada");
  }
});

async function function_get(req, res, next) {
  console.log(req.query);
  let usu_login = req.query.usu_login;
  let rol_id = req.query.rol_id;
  let sql =
    "select * " +
    "from usuario as usu, " +
    "rol as ro, " +
    "usuarioxrol as usr, " +
    "modulo as mo, " +
    "funcionalidad as fun, " +
    "rolxfuncionalidad as rf " +
    "where usu.usu_login=usr.usu_login " +
    "and ro.rol_id=usr.rol_id " +
    "and fun.mod_id=mo.mod_id " +
    "and rf.rol_id=ro.rol_id " +
    "and rf.fun_id=fun.fun_id " +
    `and usu.usu_login='${usu_login}' ` +
    ` and ro.rol_id='${rol_id}' `;
  let sql2 = `select * from rol where rol_id='${rol_id}'`;
  let result = "";
  let resul1 = "";
  try {
    result = await new Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        console.log("Query", data);
        resolve(data);
      });
    });
    result = JSON.parse(JSON.stringify(result[0])) || "";

    resul1 = await new Promise((resolve, reject) => {
      connection.query(sql2, (err, data) => {
        if (err) return reject(err);
        console.log("Query", data);
        resolve(data);
      });
    });
    resul1 = JSON.parse(JSON.stringify(resul1[0])) || "";
    console.log(
      "[Pagina04]: Resultado de la primera consulta: ",
      result,
      " 2 ",
      resul1
    );
  } catch (err) {
    console.log("[Error Pagina04] ", err);
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h3>Usuario: ${usu_login} </h3>`);
  res.write(`<h3>Rol:  ${resul1.rol_nombre} </h3>`);
  //   res.write(`  </select> <br></br>`);

  res.write(
    `<br><br><button onclick="window.location.href = '/'">Salir</button>`
  );
  res.end();
}

module.exports = router;
