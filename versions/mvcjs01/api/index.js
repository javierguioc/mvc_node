const express = require("express");
const router = express.Router();

router.get("/", html);

function html(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.write(
    `
  <body>
    <h1>Grupo JavaScript</h1>
    <ul>
      <li><a href="./login">Login</a></li>
      <li>
        <a href="./modulo/index.js">Gestion de Modulos y Funcionalidades</a>
      </li>
      <li><a href="./rol">Gestion de Roles</a></li>
      <li><a href="./usuario">Gestion de Usuarios</a></li>
    </ul>
  </body>
    `
  );

  res.end();
}

module.exports = router;
