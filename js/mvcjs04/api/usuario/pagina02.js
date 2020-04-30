ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();

module.exports = async function(res, datos) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h2>Usuario:</h2>`);
        res.write(`<HTML>`);
        res.write(`<BODY>  `);
        res.write(`<H2>Registro en sistema</H2>`);
        res.write(
                `<FORM name="login" action="./index.js" method="POST" target="resultado">
    ${vista.tabla([
      [`${datos["User"]["per_id"]}`, "per_id"]
     ], [
     [`${datos["User"]["usu_login"]}`, "usu_login", "Usuario:"],
     [`${datos["User"]["usu_clave"]}`, "usu_clave", "Contraseña:"]
   ])}
   ${vista.boton("Enviar Actualizar")}
   ${vista.botonreset()}
    </FORM>
    </BODY>
    </HTML>
    
    `
  );
  res.end();

};