ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function(res, datos) {
        console.log("[Funcionalidad02] Se hizo post ", datos);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
    <HTML>
    <BODY>          
        <H2>Rigistro en sistema</H2>
        <FORM name="login" action="./index.js" method="POST" target="resultado">
        ${vista.formulario(`${datos.mod_id}:mod_id: :hidden,${datos.functionality.fun_id}:fun_id: :hidden,${datos.functionality.fun_nombre}:fun_nombre:Nombre:text,${datos.functionality.fun_ruta}:fun_ruta:Ruta:text,${datos.functionality.fun_descripcion}:fun_descripcion:Descripcion:text`)}
            ${vista.boton("Enviar Actualizar")}
            ${vista.botonreset()}
            </FORM>
            </BODY>
        </HTML>
    `);

    res.end();

}