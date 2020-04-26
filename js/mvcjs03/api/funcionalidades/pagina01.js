module.exports = async function(res, datos) {
    console.log("object: ", datos);


    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Funcionalidades:</h2>`);
    res.write(
        `<form method="POST" action="./index.js">
        <table border="5" width="200">`
    );
    datos["Funcionalidad"].forEach(element => {
        res.write(
            `
        <tr><td><center> <input type="radio" name="fun_id" value="${element.fun_id}"></td>
        <td> ${element.fun_nombre}</center></td></tr>
        `
        );
    });
    res.write(`
    </table><br>
    <input type="submit" value="Eliminar" name="btnAction" />
    <input type="submit" value="Actualizar" name="btnAction"/>
    <input type="submit" value="Nuevo" name="btnAction"/>
    <INPUT type="hidden" value="${datos.mod_id}" name="mod_id" size="25">
    
    </form>`);
    res.write(`<button onclick="window.location.href = '/'"><==</button> `)
    res.end();
}