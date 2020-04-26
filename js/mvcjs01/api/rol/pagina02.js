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


async function postFunction(req, res, next) {
    if (req.body.btnAction != "Enviar Nuevo") {
        console.log("Se hizo post ", req.body);
        let RolesToUpdate = `SELECT * FROM rol where rol_id::integer=${req.body.rol_id}`;
        let client = new Client(connectionData);
        client.connect();
        let Roles = await client.query(RolesToUpdate);
        client.end();

        Roles = JSON.parse(JSON.stringify(Roles.rows[0])) || "";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h2>Roles:</h2>`);
        res.write(`<HTML>`);
        res.write(`<BODY>  `);
        res.write(`<H2>Registro en sistema</H2>`);
        res.write(
            `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
        );
        res.write(
            ` <INPUT type="hidden" value="${req.body.rol_id}" name="rol_id" size="25">`
        );
        res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${Roles.rol_nombre}" name="rol_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${Roles.rol_descripcion}" name="rol_descripcion" size="25"></TD>
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
        console.log("[else] Se hizo post ", req.body.rol_id);
        let UpdateRoles = `UPDATE rol SET rol_id=${req.body.rol_id}, rol_nombre='${req.body.rol_nombre}',rol_descripcion='${req.body.rol_descripcion}' where rol_id::integer=${req.body.rol_id}`;
        let client = new Client(connectionData);
        client.connect();
        let Module = await client.query(UpdateRoles);
        client.end();
        res.redirect("/rol/index.js");
    }
}

module.exports = router;