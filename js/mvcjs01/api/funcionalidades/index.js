//Importa los requerimientos necesarios para el funcionamiento
const { Client } = require("pg");
const express = require("express");
const router = express.Router();

// Parametros para la conexion con la base de datos
const connectionData = {
    user: "efi",
    host: "localhost",
    database: "efi",
    password: "efi",
    port: 5432
};

router.post("/", postFunction);

// Muestra las funcionalidades asociadas a un modulo
async function postFunction(req, res, next) {
    if (req.body.btnAction != "Eliminar") {
        let searchFuncrionality = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${req.body.mod_id}`;
        let client = new Client(connectionData);
        client.connect();
        let funtionality = await client.query(searchFuncrionality);
        client.end();

        funtionality = JSON.parse(JSON.stringify(funtionality.rows)) || "";
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h2>Funcionalidades:</h2>`);
        res.write(
            `<form method="POST" action="index.js">
        <table border="5" width="200">`
        );
        funtionality.forEach(element => {
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
    <input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.js"/>
    <input type="submit" value="Nuevo" name="btnAction" formaction="pagina03.js"/>
    <INPUT type="hidden" value="${req.body.mod_id}" name="mod_id" size="25">
    
    </form>`);
        res.write(`<button onclick="window.location.href = '/'"><==</button> `)
        res.end();
    } else {
        // Permite borrar las funcionalidades de un modulo
        let deleteFunctionality = `DELETE FROM funcionalidad where fun_id::integer=${req.body.fun_id};`;
        const client = new Client(connectionData);

        let deleteAnswer = "";
        client.connect();
        client
            .query(deleteFunctionality)
            .then(response => {
                deleteAnswer = response;
                res.redirect(`/modulo/index.js`);
            })
            .catch(err => {
                client.end();
                res.redirect(`/modulo/index.js`);
            });

    }
}

module.exports = router;