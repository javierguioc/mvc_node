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
    let sql = `SELECT * FROM rol where rol_id=${req.body.rol_id}`;
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

    res.write(`<h2>Roles:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
    );
    res.write(
      ` <INPUT type="hidden" value="${req.body.rol_id}" name="id" size="25">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Id:</TD><TD align="left"><INPUT type="text" value="${req.body.rol_id}" name="rol_id" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${constul.rol_nombre}" name="rol_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${constul.rol_descripcion}" name="rol_descripcion" size="25"></TD>
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
    let sql = `UPDATE rol SET rol_id=${req.body.rol_id}, rol_nombre='${req.body.rol_nombre}',rol_descripcion='${req.body.rol_descripcion}' where rol_id=${req.body.rol_id}`;
    let constul = await new Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        // console.log("Query", data);
        resolve(data);
      });
    });
    // console.log(sql, constul);
    res.redirect("/rol/index.js");
  }
}

module.exports = router;
