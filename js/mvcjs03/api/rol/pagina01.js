module.exports = async function(res, datos) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Roles:</h2>`);
    res.write(`<form method="POST" action="./index.js">`);
    res.write(`<table border="5" width="200">`);
    datos["Rol"].forEach(element => {
        res.write(
            `<tr><td><center> <input type="radio" name="rol_id" value="${element.rol_id} "></td> <td> ${element.rol_nombre} </center></td></tr>`
        );
    });
    res.write(`</table><br>`);
    res.write(`<input type="submit" value="Eliminar" name="btnAction" />`);
    res.write(
        `<input type="submit" value="Actualizar" name="btnAction"/>`
    );
    res.write(
        `<input type="submit" value="Nuevo" name="btnAction"/>`
    );
    res.write(
        `<input type="submit" value="Permisos" name="btnAction"/>`
    );
    res.write(`<p id="demo"></p>`);
    res.write(`</form>`);
    res.write(`<button onclick="window.location.href = '/'"><==</button> `)
    res.end();
}