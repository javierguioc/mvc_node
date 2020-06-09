module.exports = async function(res, datos) {

    // console.log("object: ", datos);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Usuarios:</h2>`);

    res.write(`<form method="POST" action="./index.js">
  <input type="text" value="" name="buscar" size="20">
  <input type="submit" value="Buscar" name="btnAction" "/>&nbsp;
  <input type="submit" value="Nuevo" name="btnAction""/>
  
  </form>`);
    res.write(`<form method="POST" action="./index.js">`);
    res.write(`<table border="5" width="200">`);
    res.write(
        `<tr> <td></td> <td>usu_login</td> <td>per_nombre</td> <td>per_apellido </td> </tr>`
    );
    datos["Usuario"].forEach((element) => {
        res.write(
            `<tr> <td><input type="radio" name="per_id" value="${element.per_id} "></td> <td>${element.usu_login}</td> <td>${element.per_nombre}</td> <td>${element.per_apellido}</center> </td> </tr>`
        );
    });
    res.write(`</table><br>`);
    res.write(`<input type="submit" value="Eliminar" name="btnAction" />`);
    res.write(`<input type="submit" value="Actualizar" name="btnAction"/>`);
    res.write(` <input type="submit" value="Permisos" name="btnAction" />`);
    res.write(`<p id="demo"></p>`);
    res.write(`</form>`);
    res.write(`<button onclick="window.location.href = '/'"><==</button> `)
    res.end();
};