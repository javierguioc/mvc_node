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
  if (req.body.btnAction != "Enviar Nuevo") {
    console.log("Se hizo post ", req.body);
    let UserToUpdate = `SELECT * FROM usuario as us where us.per_id::integer=${req.body.per_id}`;
    let client = new Client(connectionData);
    client.connect();
    let User = await client.query(UserToUpdate);
    client.end();

    User = JSON.parse(JSON.stringify(User.rows[0])) || "";
    
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Usuario:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Usuario:</TD><TD align="left"><INPUT type="text" value="${User.usu_login}" name="usu_login" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Contraseña:</TD><TD align="left"><INPUT type="text" value="${User.usu_clave}" name="usu_clave" size="25"></TD>
      </TR>
      <TR>
          <TD align="left"><INPUT type="hidden" name="per_id" value="${User.per_id}" ></TD>
      </TR>
      <TR>
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
    console.log("[else] Se hizo post ", req.body);
    let UpdateUser = `UPDATE usuario SET usu_login='${req.body.usu_login}', usu_clave='${req.body.usu_clave}' where per_id::integer='${req.body.per_id}' `;
    let client = new Client(connectionData);
    client.connect();
    let User = await client.query(UpdateUser);
    client.end();
    res.redirect("/usuario/index.js");
  }
}

module.exports = router;
