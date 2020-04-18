Modelo = require("./modelo");
const express = require("express");
const router = express.Router();

var modelo = new Modelo();

router.post("/", postFunction);
async function postFunction(req, res, next) {
  if (req.body.btnAction != "Enviar Nuevo") {
    console.log("[Rol02] Se hizo post ", req.body);
    console.log("Cambio Rol");

    var datos = {};
    datos["rol_id"] = req.body.rol_id;

    datos = await modelo.traerRol(datos);
    console.log("User: ", datos);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Roles:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
    );
    res.write(
      ` <INPUT type="hidden" value="${req.body.rol_id}" name="id" size="25">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right"></TD><TD align="left"><INPUT type="hidden" value="${req.body.rol_id}" name="rol_id" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${datos["Roles"]["rol_nombre"]}" name="rol_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${datos["Roles"]["rol_descripcion"]}" name="rol_descripcion" size="25"></TD>
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
        console.log("[else] Se hizo post ", req.body);

        var datos = { ...req.body };

        datos = await modelo.actualizarRol(datos);

        res.redirect("/rol/index.js");
  }
}

module.exports = router;
