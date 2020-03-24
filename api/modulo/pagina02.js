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

// router.get("/", function_get);
router.post("/", function_post);

async function function_post(req, res, next) {
  if (req.body.btnAction != "Enviar Nuevo") {
    console.log("Se hizo post ", req.body);
    let sql = `SELECT * FROM modulo where mod_id=${req.body.mod_id}`;
    let constul = await new Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        // console.log("Query", data);
        resolve(data);
      });
    });

    constul = JSON.parse(JSON.stringify(constul[0])) || "";
    console.log(constul);

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(`<h2>Modulos:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
    );
    res.write(
      ` <INPUT type="hidden" value="${req.body.mod_id}" name="id" size="25">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Id:</TD><TD align="left"><INPUT type="text" value="${req.body.mod_id}" name="mod_id" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${constul.mod_nombre}" name="mod_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${constul.mod_descripcion}" name="mod_descripcion" size="25"></TD>
      </TR>
      <TR >
          <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Nuevo">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
      </TR>
  </TABLE>
</TD></TR>`);
    res.write(`</TABLE>
  </FORM>
</BODY>
</HTML>`);

    res.end();
  } else {
    // console.log("[else] Se hizo post ", req.body);
    let sql = `UPDATE modulo SET mod_id=${req.body.mod_id}, mod_nombre='${req.body.mod_nombre}',mod_descripcion='${req.body.mod_descripcion}' where mod_id=${req.body.mod_id}`;
    let constul = await new Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        // console.log("Query", data);
        resolve(data);
      });
    });
    // console.log(sql, constul);
    res.redirect("/modulo/index.js");
  }
}

module.exports = router;
