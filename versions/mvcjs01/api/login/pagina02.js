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
// Recibe el usuario y la contraseña y verifica que exista en la base de datos
async function postFunction(req, res, next) {
  let usu_login = req.body.usuario;
  let usu_clave = req.body.pass;
  // Consulta para buscar que exista el usuario
  let searchUser = `SELECT * FROM usuario WHERE usu_login='${usu_login}' and usu_clave='${usu_clave}' `;
  // Verifica que el usuario tenga un rol asignado
  let role = ` select count(*) as cant from usuario as u , usuarioxrol as ur where u.usu_login = ur.usu_login and u.usu_login='${usu_login}' `;
  let querySearchUser = "";
  let queryRole = "";
  try {
    //Consulta la base de datos
    let client = new Client(connectionData);
    client.connect();
    querySearchUser = await client.query(searchUser);
    queryRole = await client.query(role);
    // Verifica si hay respuesta que represente la existencia de un usuario en la base de datos
    if (querySearchUser.rows[0]) {
      //Da formato json a la respuesta de la base de datos
      querySearchUser =
        JSON.parse(JSON.stringify(querySearchUser.rows[0])) || "";
      queryRole = JSON.parse(JSON.stringify(queryRole.rows[0])) || "";
    } else {
      querySearchUser.usu_login = "";
      querySearchUser.usu_clave = "";
    }

    // Termina la sesion de la base de datos
    client.end();
  } catch (error) {
    console.log("[Error Pagina02] ", error);
  }

  // Verifica que la existencia del usuario y su respectiva contraseña sean validas
  if (
    querySearchUser.usu_login === usu_login &&
    querySearchUser.usu_clave === usu_clave
  ) {
    let cant = queryRole.cant;
    let us = usu_login;

    res.redirect(`/login/pagina03.js?usu_login=${us}&c=${cant}`);
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
