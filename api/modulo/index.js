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
router.post("/", function_post);

async function function_post(req, res, next) {
  console.log("Se hizo post ", req.body);
  let sql = `DELETE FROM modulo where mod_id=${req.body.mod_id}`;
  let constul = await new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) return reject(err);
      // console.log("Query", data);
      resolve(data);
    });
  });
  console.log(sql,constul);
  res.redirect(`/modulo/index.js`);
}

async function function_get(req, res, next) {
  let sql = "SELECT * FROM modulo ";
  let constul = await new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) return reject(err);
      // console.log("Query", data);
      resolve(data);
    });
  });

  constul = JSON.parse(JSON.stringify(constul)) || "";

  res.writeHead(200, { "Content-Type": "text/html" });

  res.write(`<h2>Modulos:</h2>`);
  res.write(`<form method="POST" action="./index.js">`);
  res.write(`<table border="5" width="200">`);
  constul.forEach(element => {
    res.write(
      `<tr><td><center> <input type="radio" name="mod_id" value="${element.mod_id} "></td> <td> ${element.mod_nombre} </center></td></tr>`
    );
  });
  res.write(`</table><br>`);
  res.write(`<input type="submit" value="eliminar" name="btnAction" />`);
  res.write(
    `<input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>`
  );
  res.write(
    `<input type="submit" value="nuevo" name="btnAction" formaction="pagina03.js"/>`
  );
  res.write(
    `<input type="submit" value="Funcionalidades" name="btnAction" formaction="../funcionalidades/index.php"/>`
  );
  res.write(`<p id="demo"></p>`);
  res.write(`</form>`);
  res.end();
}

module.exports = router;
