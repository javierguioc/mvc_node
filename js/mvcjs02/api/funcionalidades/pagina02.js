Modelo = require("./modelo");
const express = require("express");
const router = express.Router();

var modelo = new Modelo();

router.post("/", postFunction);

// Muestra el modulo a actualizar
async function postFunction(req, res, next) {
  if (req.body.btnAction != "Enviar Nuevo") {
    console.log("[Funcionalidad02] Se hizo post ", req.body);
    console.log("Cambio Funcionalidad");

    var datos = {};
    datos["mod_id"] = req.body.mod_id;
    datos["fun_id"]= req.body.fun_id;
    datos = await modelo.traerFuncionalidad(datos);
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
                                <TD align="right">Id:</TD><TD align="left"><INPUT type="text" value="${datos["functionality"]["fun_id"]}" name="fun_id" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${datos["functionality"]["fun_nombre"]}" name="fun_nombre" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Ruta:</TD><TD align="left"><INPUT type="text" value="${datos["functionality"]["fun_ruta"]}" name="fun_ruta" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${datos["functionality"]["fun_descripcion"]}" name="fun_descripcion" size="25"></TD>
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
    console.log("[else] Se hizo post ", req.body);

        var datos = { ...req.body };

        datos = await modelo.actualizarFuncionalidad(datos);

        res.redirect("/modulo/index.js");

  }
}

module.exports = router;