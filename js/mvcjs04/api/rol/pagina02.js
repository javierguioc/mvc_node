ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();

module.exports = async function(res, datos) {

        console.log('Datos Pagina2 Rol', datos);

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
        res.write(`${vista.tabla([
                 [`${datos.rol_id}`, "rol_id"]
                ], [
                [`${datos.Roles.rol_nombre}`, "rol_nombre", "Nombre:","text"],
                [`${datos.Roles.rol_descripcion}`, "rol_descripcion", "Descripcion:","text"]
              ])}
              ${vista.boton("Enviar Actualizar")}
              ${vista.botonreset()}
          </FORM>
      </BODY>
  </HTML>
  `);
    res.end();
}