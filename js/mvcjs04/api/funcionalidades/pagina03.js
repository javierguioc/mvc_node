ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function(res, datos) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
    <HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="./index.js" method="POST" target="resultado">
        ${vista.formulario(`${datos.mod_id}:mod_id: :hidden,:fun_nombre:Nombre:text,:fun_ruta:Ruta:text,:fun_descripcion:Descripcion:text`)}
        ${vista.boton("Enviar Nuevo")}
        ${vista.botonreset()}
        </FORM>
    </BODY>
</HTML>
    `);
    res.end();
}