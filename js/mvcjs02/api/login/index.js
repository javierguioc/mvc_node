const express = require("express");
const router = express.Router();

router.get("/", showForm);
// Muestra el formulario para ingresar el usuario y la contraseña
function showForm(req, res, next) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
        `
    <html lang="es">
        <head>
            <meta charset="utf-8">
            <title>Login</title></head>
        <body>
            <div>
                <center>
                    <h3>Inicio de Sesion</h3>
                    <form method="POST" action="./login/pagina02.js">
                        <input type="text" name="usuario" placeholder="Usuario" />
                        <br />
                        
                        <input type="password" name="pass" placeholder="Contraseña" />
                        <br />
                        <br />
                        <INPUT name="btnAction" type="submit" value="Ingresar">
                    </form>
                    <button onclick="window.location.href = '/'"><==</button>
                </center>
            </div>
        </body>
    </html>
    `
    );

    res.end();
}

module.exports = router;