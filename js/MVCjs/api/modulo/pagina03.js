ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function (res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="./index.js" method="POST" target="resultad">
            ${vista.formulario(
              `:mod_nombre:Nombre:text,:mod_descripcion:Descripcion:text`
            )}
            ${vista.boton("Enviar nuevo")}
            ${vista.botonreset()}
        </FORM>
    </BODY>
</HTML>`);
  res.end();
};
