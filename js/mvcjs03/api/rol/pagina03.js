module.exports = async function (res,datos) {
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
  }