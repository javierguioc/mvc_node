module.exports = async function (res,datos) {
  
  console.log("object: ", datos);
  // Verifica que la existencia del usuario y su respectiva contraseña sean validas
  if (
    datos["r_usu_login"] === datos["usu_login"] &&
    datos["r_usu_clave"] === datos["usu_clave"]
  ) {
    let cant = datos["queryRole"]["cant"];
    let us = datos["usu_login"];
    if (parseInt(cant) === 1) {
      res.redirect(
        `/login/pagina03.js?usu_login=${datos["usu_login"]}&rol_id=${datos["rol_id"]}`
      );
    } 
    else if   (parseInt(cant) === 0){
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<p>El usuario seleccionado no tiene asignado un rol</p>
        <br><button onclick="window.location.href = '/'">Salir</button>`
      );
      res.end();
    }
    else {
      datos=await modelo.Roles(datos);
      console.log('Roles Usuario',datos["Roles"]);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<p>ROLES DEL USUARIO:  ${datos["Roles"][0].usu_login}</p>
        `
      );
      res.write(`<form method="POST" >`);
      res.write(`<select name="rol">`)
      datos["Roles"].forEach(element => {
        res.write(
         ` <option value="${element.rol_id}"> ${element.rol_nombre}</option> >`
        );
      });
      res.write(`</select>`)
      res.write(

        `
        <br><input type="submit" value="Aceptar" name="btnAction"/>
        <INPUT type="hidden" value="${datos["Roles"][0].usu_login}" name="usu_login" size="25">
        `
      );
      res.write(`<button onclick="window.location.href = '/'">Salir</button> `);
      res.end();
    }
  } else {
    res.redirect("/login");
  }
}

