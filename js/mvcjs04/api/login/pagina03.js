ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function (res, datos) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
              <h3>Usuario: ${datos["usu_login"]} </h3>
              <h3>Rol:  ${datos["result"]["rol_nombre"]} </h3>
              <h3>Descripcion:  ${datos["result"]["rol_descripcion"]} </h3>
              <h3>Funcionalidades:  </h3>
              ${vista.listar(datos["FunxUsu"], "fun_nombre")}
              ${vista.botonr()}
`);
  res.end();
};
