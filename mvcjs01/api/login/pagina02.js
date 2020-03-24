const mysql = require("mysql");
const express = require("express");
const router = express.Router();

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

router.post("/", function_post);

async function function_post(req, res, next) {
  let usu_login = req.body.usuario;
  let usu_clave = req.body.pass;
  let sql = `SELECT * FROM usuario WHERE usu_login='${usu_login}' and usu_clave='${usu_clave}' `;
  let rol = ` select count(*) as cant from usuario as u , usuarioxrol as ur where u.usu_login = ur.usu_login and u.usu_login='${usu_login}' `;
  let constul = "";
  let sconsult = "";
  try {
    constul = await new  Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        console.log("Query",data);
        resolve(data);
      });
    });
    sconsult = await new  Promise((resolve, reject) => {
      connection.query(rol, (err, data) => {
        if (err) return reject(err);
        console.log("Query",data);
        resolve(data);
      });
    });
    constul = JSON.parse(JSON.stringify(constul[0])) || "";
    sconsult = JSON.parse(JSON.stringify(sconsult[0])) || "";

    console.log(constul);
    console.log(sconsult);
  } catch (error) {
    console.log("[Error Pagina02] ", error);
  }

  if (constul.usu_login === usu_login && constul.usu_clave === usu_clave) {
    let cant = sconsult.cant;
    let us = usu_login;
    console.log("Se envia a pagina03: ", constul, " , ", sconsult);

    res.redirect(`/login/pagina03.js?usu_login=${us}&c=${cant}`);
  } else {
    res.redirect("/login");
    console.log("[No coincidencia] Se regresa a index.js");
  }
}


module.exports = router;
