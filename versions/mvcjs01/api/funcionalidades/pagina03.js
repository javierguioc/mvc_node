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

const client = new Client(connectionData);
client.connect();

router.post("/", postFunction);
// Permite crear una nueva funcionalidad
async function postFunction(req, res, next) {
    // Genera el formulario para ingresar el nuevo modulo
  if (req.body.btnAction != "Enviar Nuevo") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="pagina03.js" method="POST" target="resultado">
        <INPUT type="hidden" value="${req.body.mod_id}" name="mod_id" size="25">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
                            <TR>
                                <TD align="right">Id:</TD><TD align="left"><INPUT type="text"  name="fun_id" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text"  name="fun_nombre" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Ruta:</TD><TD align="left"><INPUT type="text"  name="fun_ruta" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text"  name="fun_descripcion" size="25"></TD>
                            </TR>
                            <TR >
                                <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Nuevo">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
                            </TR>
                        </TABLE>
                    </TD></TR>
            </TABLE>
        </FORM>
    </BODY>
</HTML>
    `);
    res.end();
  } else {
    // Inserta la nueva funcionalidad
    let insertFunctionality = `insert into funcionalidad values ('${req.body.fun_id}','${req.body.fun_nombre}','${req.body.fun_ruta}','${req.body.fun_descripcion}',${req.body.mod_id});
    `;
    console.log(insertFunctionality)
    let insertResponse = await client.query(insertFunctionality);
    res.redirect("/modulo/index.js");
  }
}

module.exports = router;
