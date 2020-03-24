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

router.get("/", function_get);

async function function_get(req, res, next) {
  console.log(req.query);
  let usu_login = req.query.usu_login;
  let cant = req.query.c;
  let sql = `select * from usuario as u , usuarioxrol as ur,rol as r where u.usu_login = ur.usu_login and u.usu_login='${usu_login}' and r.rol_id=ur.rol_id`;
  let data = "";
  let constul = "";
  try {
    constul = await new  Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        console.log("Query",data);
        resolve(data);
      });
    });
    constul = JSON.parse(JSON.stringify(constul[0])) || "";
    console.log("Resultado de la primera consulta: ", constul);
  } catch (err) {
    console.log("[Error Pagina03] ", err);
  }
  console.log('La cant es =', parseInt(cant) === 1)
  if (parseInt(cant) === 1) {
    let rol_id = constul.rol_id;
    res.redirect(`/login/pagina04.js?usu_login=${usu_login}&rol_id=${rol_id}`);
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `<center> <form method = "POST" action = "pagina04.js" role = "login" >`
    );
    res.write(`<select name = "rol_id" class = "form-control">`);
    res.write(`<OPTION VALUE=" Test "> prueba </OPTION>`);

    res.write(`  </select> <br></br>`);
    res.write(` <input type="hidden" name="usu_login" value=" Valor"/>`);
    res.write(`<INPUT name="btnAction" type="submit" value="Enviar">`);
    res.write(`</form>`);
    res.write(`<center>`);
    res.end();
  }
}


module.exports = router;
