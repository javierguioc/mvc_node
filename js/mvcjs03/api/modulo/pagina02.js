module.exports = async function (res,datos) {
  
  console.log("object pagina2 Modulo: ", datos);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Modulos:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="./index.js" method="POST" target="resultado">`
    );
    res.write(
      ` <INPUT type="hidden" value="${datos.mod_id}" name="id" size="25">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right"></TD><TD align="left"><INPUT type="hidden" value="${datos.mod_id}" name="mod_id" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${datos.Module.mod_nombre}" name="mod_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${datos.Module.mod_descripcion}" name="mod_descripcion" size="25"></TD>
      </TR>
      <TR >
          <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Actualizar">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
      </TR>
  </TABLE>
</TD></TR>
</TABLE>
  </FORM>
</BODY>
</HTML>`);

    res.end();
}
