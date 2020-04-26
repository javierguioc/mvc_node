module.exports = async function (res,datos) {

    console.log('Datos Pagina2 Rol', datos);

    //var datos = {};
    datos["rol_id"] = datos.rol_id;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Roles:</h2>`);
    res.write(`<HTML>`);
    res.write(`<BODY>  `);
    res.write(`<H2>Registro en sistema</H2>`);
    res.write(
      `<FORM name="login" action="./index.js" method="POST" target="resultado">`
    );
    res.write(
      ` <INPUT type="hidden" value="${datos.rol_id}" name="id" size="25">`
    );
    res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right"></TD><TD align="left"><INPUT type="hidden" value="${datos.rol_id}" name="rol_id" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${datos.Roles.rol_nombre}" name="rol_nombre" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${datos.Roles.rol_descripcion}" name="rol_descripcion" size="25"></TD>
      </TR>
      <TR >
          <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Actualizar">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
      </TR>
  </TABLE>
</TD></TR>`);
    res.write(`</TABLE>
  </FORM>
</BODY>
</HTML>`);

    res.end();
}
