const express = require("express");
const router = express.Router();
// const router = express.Router();

var modelo = new Modelo();

// Función asíncrona que recoge la request POST
router.post("/", postFunction);

async function postFunction(req, res, next) {
  if (req.body.btnAction != "Enviar nuevo") {
    console.log("[Rol03] Se hizo post ", req.body);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="./index.js" method="POST" target="resultado">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
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
    console.log("[else] Se hizo post ", req.body);
    var datos = { ...req.body };
    let respuesta = await modelo.insertarNuevoRol(datos);
    console.log(respuesta);
    res.redirect("/rol/index.js");
  }
}

module.exports = router;