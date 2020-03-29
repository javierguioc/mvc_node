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
    console.log("Se hizo post a pag02 funcionalidad ", req.body);
    let functionalityToUpdate = ` SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${req.body.mod_id} and fun.fun_id::integer=${req.body.fun_id}
    `;
    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*',functionalityToUpdate)
    let client = new Client(connectionData);
    client.connect();
    let functionality = await client.query(functionalityToUpdate);
    client.end();

    functionality = JSON.parse(JSON.stringify(functionality.rows[0])) || "";
    // console.log(functionality);

    console.log("Consulta-----:", functionality);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="pagina02.js" method="POST" target="resultado">
            <INPUT type="hidden" value="${req.body.fun_id}" name="id" size="25">
            <INPUT type="hidden" value="${req.body.mod_id}" name="mod_id" size="25">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
                            <TR>
                                <TD align="right">Id:</TD><TD align="left"><INPUT type="text" value="${functionality.fun_id}" name="fun_id" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${functionality.fun_nombre}" name="fun_nombre" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Ruta:</TD><TD align="left"><INPUT type="text" value="${functionality.fun_descripcion}" name="fun_ruta" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${functionality.fun_descripcion}" name="fun_descripcion" size="25"></TD>
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
    // Actualiza el modulo 
    console.log("Actualizar FUncionalidad ========================= ", req.body);
    let updatefunctionality = ` UPDATE funcionalidad SET fun_id=${req.body.fun_id}, fun_nombre='${req.body.fun_nombre}', fun_ruta='${req.body.fun_ruta}',fun_descripcion='${req.body.fun_descripcion}',mod_id=${req.body.mod_id} where fun_id::integer=${req.body.fun_id} 
    `;
    console.log('Consultaaaaa:',updatefunctionality)
    let client = new Client(connectionData);
    // client.connect();
    client.connect();
    let functionality = await client.query(updatefunctionality);
    client.end();
    // console.log(updatefunctionality, functionality);
    res.redirect("/modulo/index.js");
  }
}

module.exports = router;