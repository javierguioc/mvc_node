Modelo = require("./modelo");
const express = require("express");
const router = express.Router();

var modelo = new Modelo();

router.post("/", postFunction);

// Muestra el modulo a actualizar
async function postFunction(req, res, next) {
  if (req.body.btnAction != "Enviar Nuevo") {
    console.log("[Modulo02] Se hizo post ", req.body);
    console.log("Cambio Modulo");

    var datos = {};
    datos["mod_id"] = req.body.mod_id;

    datos = await modelo.traerModulo(datos);
    console.log("User: ", datos);
    

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Modulos:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
    );
    res.write(
      ` <INPUT type="hidden" value="${req.body.mod_id}" name="id" size="25">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Id:</TD><TD align="left"><INPUT type="text" value="${req.body.mod_id}" name="mod_id" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${datos["Module"]["mod_nombre"]}" name="mod_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${datos["Module"]["mod_descripcion"]}" name="mod_descripcion" size="25"></TD>
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
    console.log("[else] Se hizo post ", req.body);

        var datos = { ...req.body };

        datos = await modelo.actualizarModulo(datos);

        res.redirect("/modulo/index.js");
  }
}

module.exports = router;
