const express = require("express");
const router = express.Router();

// let app = require("../index");
// const app = express();
// console.log(app,'asdfasdf');
// app.use("/", router);

router.get("/", html);

function html(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.write(
    `<body>
      <h1>Grupo JavaScript</h1>
      <a href="./login">Login</a><br>
      <a href="./modulo/index.js">Gestion de Modulos y Funcionalidades</a><br>
      <a href="./rol">Gestion de Roles</a><br>
      <a href="./usuario">Gestion de Usuarios</a><br>
    </body>`
  );

  res.end();
}

module.exports = router;
