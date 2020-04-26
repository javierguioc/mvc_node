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

// Muestra el modulo a actualizar
async function postFunction(req, res, next) {
    if (req.body.btnAction != "Enviar Nuevo") {
        // Trae el modulo seleccionado en la pagina principal
        let ModuleToUpdate = `SELECT * FROM modulo where mod_id::integer=${req.body.mod_id}`;
        let client = new Client(connectionData);
        client.connect();
        let Module = await client.query(ModuleToUpdate);
        client.end();
        // Convierte las respuesta a formato Json
        Module = JSON.parse(JSON.stringify(Module.rows[0])) || "";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h2>Modulos:</h2>`);
        res.write(`<HTML>`);
        res.write(`<BODY>  `);
        res.write(`<H2>Registro en sistema</H2>`);
        res.write(
            `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
        );
        res.write(
            ` <INPUT type="hidden" value="${req.body.mod_id}" name="mod_id" size="25">`
        );
        res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${Module.mod_nombre}" name="mod_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${Module.mod_descripcion}" name="mod_descripcion" size="25"></TD>
      </TR>
      <TR >
          <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Nuevo">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
      </TR>
  </TABLE>
</TD></TR>
</TABLE>
  </FORM>
</BODY>
</HTML>`);

        res.end();
    } else {
        // Actualiza el modulo
        let updateModule = `UPDATE modulo SET mod_id=${req.body.mod_id}, mod_nombre='${req.body.mod_nombre}',mod_descripcion='${req.body.mod_descripcion}' where mod_id::integer=${req.body.mod_id}`;
        let client = new Client(connectionData);
        client.connect();
        let Module = await client.query(updateModule);
        client.end();
        // Regresa a la pagina del modulo
        res.redirect("/modulo/index.js");
    }
}

module.exports = router;