module.exports = async function (res, datos) {
    console.log("[Funcionalidad02] Se hizo post ", datos);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="./index.js" method="POST" target="resultado">
            <INPUT type="hidden" value="${datos.fun_id}" name="id" size="25">
            <INPUT type="hidden" value="${datos.mod_id}" name="mod_id" size="25">
            <TABLE border="1">
                <TR><TD>
                        <TABLE>
                            <TR>
                                <TD align="right"></TD><TD align="left"><INPUT type="hidden" value="${datos.functionality.fun_id}" name="fun_id" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="${datos.functionality.fun_nombre}" name="fun_nombre" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Ruta:</TD><TD align="left"><INPUT type="text" value="${datos.functionality.fun_ruta}" name="fun_ruta" size="25"></TD>
                            </TR>
                            <TR>
                                <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="${datos.functionality.fun_descripcion}" name="fun_descripcion" size="25"></TD>
                            </TR>
                            <TR >
                                <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Actualizar">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
                            </TR>
                        </TABLE>
                    </TD></TR>
            </TABLE>
        </FORM>
    </BODY>
</HTML>
    `);

    res.end();

}
