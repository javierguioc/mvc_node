Modelo = require("./modelo");
const express = require("express");
const router = express.Router();

var modelo = new Modelo();

// Función asíncrona que recoge la request POST
router.post("/", postFunction);
async function postFunction(req, res, next) {
  console.log("Entrando a usuarios");
  if (req.body.btnAction != "Enviar Nuevo") {
    // Mensaje de log
    console.log("[Usuario02] Se hizo post ", req.body);
    console.log("Cambio usuario");

    var datos = {};
    datos.per_id = req.body.per_id;

    datos = await modelo.traerUsuario(datos);
    console.log("User: ", datos);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Usuario:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="pagina02.js" method="POST" target="resultado">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Usuario:</TD><TD align="left"><INPUT type="text" value="${datos.User.usu_login}" name="usu_login" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Contraseña:</TD><TD align="left"><INPUT type="text" value="${datos.User.usu_clave}" name="usu_clave" size="25"></TD>
      </TR>
      <TR>
          <TD align="left"><INPUT type="hidden" name="per_id" value="${datos.User.per_id}" ></TD>
      </TR>
      <TR>
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

    datos = await modelo.actualizarUsuario(datos);

    res.redirect("/usuario/index.js");
  }
}

module.exports = router;
