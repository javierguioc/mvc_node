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
  if (req.body.btnAction != "Enviar nuevo") {
    console.log("[Pagina 03] Se hizo post ", req.body);
    

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="pagina03.js" method="POST" target="resultado">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
                            <TR>
                                <TD align="right">Usuario:</TD><TD align="left"><INPUT type="text" value="" name="usu_login" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Contraseña:</TD><TD align="left"><INPUT type="password" value="" name="usu_clave" size="8" maxlength="10" placeholder="Contraseña"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Id persona:</TD><TD align="left"><INPUT type="text" value="" name="per_id" size="20" maxlength="10"></TD>
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
    let InsertUsuario = `insert into usuario values ('${req.body.usu_login}','${req.body.usu_clave}','${req.body.per_id}')`;
      let insertResponse = await client.query(InsertUsuario);
      res.redirect("/usuario/index.js");
  }
}

module.exports = router;