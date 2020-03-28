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
  if (req.body.btnAction != "Enviar nuevo") {
    console.log("[Pagina 03] Se hizo post ", req.body);
    // let sql = `SELECT * FROM rol where rol_id=${req.body.rol_id}`;
    // let constul = await new Promise((resolve, reject) => {
    //   connection.query(sql, (err, data) => {
    //     if (err) return reject(err);
    //     // console.log("Query", data);
    //     resolve(data);
    //   });
    // });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="pagina03.js" method="POST" target="resultado">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
                            <TR>
                                <TD align="right">Id:</TD><TD align="left"><INPUT type="text"  name="rol_id" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text"  name="rol_nombre" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text"  name="rol_descripcion" size="25"></TD>
                            </TR>
                            <TR >
                                <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar nuevo">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
                            </TR>
                        </TABLE>
                    </TD></TR>
            </TABLE>
        </FORM>
    </BODY>
</HTML>`);
    res.end();
  } else {
    console.log("[else 03] Se hizo post ", req.body);
    let sql = `insert into rol values ('${req.body.rol_id}','${req.body.rol_nombre}','${req.body.rol_descripcion}')`;
    let constul = await new Promise((resolve, reject) => {
      connection.query(sql, (err, data) => {
        if (err) return reject(err);
        // console.log("Query", data);
        resolve(data);
      });
    });
    console.log(sql, constul);
    res.redirect("/rol/index.js");
  }
}

module.exports = router;