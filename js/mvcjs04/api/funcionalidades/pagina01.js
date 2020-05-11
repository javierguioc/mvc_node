ClaseVistaGeneral = require("../general/ClaseVistaGeneral");
var vista = new ClaseVistaGeneral();
module.exports = async function (res, datos) {
  console.log("object: ", datos);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Funcionalidades:</h2>`);
  res.write(
    `<form method="POST" action="./index.js">
        <table border="5" width="200">
        ${vista.radio(
          "fun_id",
          "fun_id",
          ["fun_nombre"],
          datos["Funcionalidad"]
        )}
                ${vista.boton("Eliminar")}
                ${vista.boton("Actualizar")}
                ${vista.boton("Nuevo")}
                ${vista.hidden("mod_id", `${datos.mod_id}`)}
                </form>
                ${vista.botonr()}
        
        `
  );
  res.end();
};
