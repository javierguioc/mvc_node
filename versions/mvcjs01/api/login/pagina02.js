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
    querySearchUser = await client.query(searchUser);
    queryRole = await client.query(role);
    //Da formato json a la respuesta de la base de datos
    querySearchUser = JSON.parse(JSON.stringify(querySearchUser.rows[0])) || "";
    queryRole = JSON.parse(JSON.stringify(queryRole.rows[0])) || "";

    console.log("Ms:", querySearchUser);
    console.log(queryRole);
    // Termina la sesion de la base de datos
    client.end();
  } catch (error) {
    console.log("[Error Pagina02] ", error);
  }

  // Verifica la existencia del usuario y su respectiva contraseña
  if (
    querySearchUser.usu_login === usu_login &&
    querySearchUser.usu_clave === usu_clave
  ) {
    let cant = queryRole.cant;
    let us = usu_login;
    console.log("Se envia a pagina03: ", querySearchUser, " , ", queryRole);

    res.redirect(`/login/pagina03.js?usu_login=${us}&c=${cant}`);
  } else {
    res.redirect("/login");
    console.log("[No coincidencia] Se regresa a index.js");
  }
}

module.exports = router;
