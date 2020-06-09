module.exports = async function(res, datos) {
    console.log("object Pagina01 Modulo: ", datos);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Modulos:</h2>`);
    res.write(`<form method="POST" action="./index.js">`);
    res.write(`<table border="5" width="200">`);
    datos["Modulo"].forEach((element) => {
        res.write(
            `<tr><td><center> <input type="radio" name="mod_id" value="${element.mod_id} "></td> <td> ${element.mod_nombre} </center></td></tr>`
        );
    });
    res.write(`
  </table><br>
  <input type="submit" value="Eliminar" name="btnAction" />&nbsp;
  <input type="submit" value="Actualizar" name="btnAction" />&nbsp;
  <input type="submit" value="Nuevo" name="btnAction" />&nbsp;
  <input type="submit" value="Funcionalidades" name="btnAction" formaction="../funcionalidad/index.js"/>
  </form>`);
    res.write(`<button onclick="window.location.href = '/'"><==</button> `)
    res.end();
}