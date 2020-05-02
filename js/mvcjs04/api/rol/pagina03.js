ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function(res, datos) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="./index.js" method="POST" target="resultado">
            <TABLE border="1">
            ${vista.formulario(`:rol_nombre:Nombre:text,:rol_descripcion:Descripcion:text`)}
            ${vista.boton("Enviar nuevo")}
            ${vista.botonreset()}
            </TABLE>
        </FORM>
    </BODY>
</HTML>`);
    res.end();
  }