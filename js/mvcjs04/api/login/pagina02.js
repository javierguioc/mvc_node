module.exports = async function (res, datos) {
  console.log("object: ", datos);
  if (
    datos.usu_login == datos.r_usu_login &&
    datos.usu_clave == datos.r_usu_clave
  ) {
    if (datos.queryRole.cant == 1) {
      var request = require("request");
   
      request.post(
        "http://localhost:3000/login/index.js",
        {
          json: {
            rol_id: datos["rol_id"],
            btnAction: "Aceptar",
            usu_login: datos["usu_login"],
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(body);
            res.end();
          }
        }
      );
    } else if (datos.queryRole == 0) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<p>El usuario seleccionado no tiene asignado un rol</p>
        <br><button onclick="window.location.href = '/'">Salir</button>`
      );
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<p>ROLES DEL USUARIO:  ${datos.Roles[0].usu_login}</p>
        `
      );
      res.write(`<form method="POST" action="./index.js" >`);
      res.write(`<select name="rol_id">`);
      datos.Roles.forEach((element) => {
        res.write(
          ` <option value="${element.rol_id}"> ${element.rol_nombre}</option> >`
        );
      });
      res.write(`</select> </br>`);
      res.write(
        `
        <br><input type="submit" value="Aceptar" name="btnAction"/>
        <INPUT type="hidden" value="${datos["Roles"][0].usu_login}" name="usu_login" size="25">
        `
      );
      res.write(`<button onclick="window.location.href = '/'">Salir</button> `);
      res.write(`</form>`);
      res.end();
    }
  }
};
// Verifica que la existencia del usuario y su respectiva contraseña sean validas
