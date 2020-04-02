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
// Determina si el usuario tiene un rol asignado
async function getFunction(req, res, next) {
  // Recupera el valor de usuario y contraseña pasados en la pagina anterior
  let usu_login = req.query.usu_login;
  let cant = req.query.c;
  // Obtiene al usuario con su rol respectivo
  let userRole = `select * from usuario as u , usuarioxrol as ur,rol as r where u.usu_login = ur.usu_login and u.usu_login='${usu_login}' and r.rol_id=ur.rol_id`;
  let queryUserRole = "";
  try {
    let client = new Client(connectionData);
    client.connect();
    queryUserRole = await client.query(userRole);
    queryUserRole = JSON.parse(JSON.stringify(queryUserRole.rows[0])) || "";
    client.end();
  } catch (err) {
    console.log("[Error Pagina03] ", err);
  }
  if (parseInt(cant) === 1) {
    let rol_id = queryUserRole.rol_id;
    res.redirect(`/login/pagina04.js?usu_login=${usu_login}&rol_id=${rol_id}`);
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `<p>El usuario seleccionado no tiene asignado un rol</p>
      <br><button onclick="window.location.href = '/'">Salir</button>`
    );
    res.end();
  }
}

module.exports = router;
