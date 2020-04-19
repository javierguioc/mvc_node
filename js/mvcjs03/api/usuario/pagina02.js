module.exports = async function (res, datos) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Usuario:</h2>`);
  res.write(`<HTML>`);
  res.write(`<BODY>  `);
  res.write(`<H2>Registro en sistema</H2>`);
  res.write(
    `<FORM name="login" action="./index.js" method="POST" target="resultado">`
  );
  res.write(`<TR><TD>
  <TABLE>
      <TR>
          <TD align="right">Usuario:</TD><TD align="left"><INPUT type="text" value="${datos["User"]["usu_login"]}" name="usu_login" size="25"></TD>
      </TR>
      <TR>
          <TD align="right">Contraseña:</TD><TD align="left"><INPUT type="text" value="${datos["User"]["usu_clave"]}" name="usu_clave" size="25"></TD>
      </TR>
      <TR>
          <TD align="left"><INPUT type="hidden" name="per_id" value="${datos["User"]["per_id"]}" ></TD>
      </TR>
      <TR>
          <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Actualizar">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
      </TR>
  </TABLE>
</TD></TR>`);
  res.write(`</TABLE>
  </FORM>
</BODY>
</HTML>`);

  res.end();

};
