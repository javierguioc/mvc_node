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
// Permite la creacion de un nuevo modulo
async function postFunction(req, res, next) {
    // Genera el formulario para ingresar el nuevo modulo
  if (req.body.btnAction != "Enviar nuevo") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="pagina03.js" method="POST" target="resultado">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
                            <TR>
                                <TD align="right">Id:</TD><TD align="left"><INPUT type="text"  name="mod_id" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text"  name="mod_nombre" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text"  name="mod_descripcion" size="25"></TD>
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
    let insertModule = `insert into modulo values ('${req.body.mod_id}','${req.body.mod_nombre}','${req.body.mod_descripcion}')`;
    let insertResponse = await client.query(insertModule);
    res.redirect("/modulo/index.js");
  }
}

module.exports = router;
