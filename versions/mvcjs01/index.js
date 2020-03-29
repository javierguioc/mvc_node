const express = require("express");
var body_parser = require("body-parser");

const homePage = require("./api/index");

const loginPage = require("./api/login/index");
const loginPage02 = require("./api/login/pagina02");
const loginPage03 = require("./api/login/pagina03");
const loginPage04 = require("./api/login/pagina04");

const modulePage = require("./api/modulo/index");
const modulePage02 = require("./api/modulo/pagina02");
const modulePage03 = require("./api/modulo/pagina03");

const functionalityPage = require("./api/funcionalidades/index");
const functionalityPage02 = require("./api/funcionalidades/pagina02");
const functionalityPage03 = require("./api/funcionalidades/pagina03");

const rolePage = require("./api/rol/index");
const rolePage02 = require("./api/rol/pagina02");
const rolePage03 = require("./api/rol/pagina03");
const rolePage04 = require("./api/rol/pagina04");

const userPage = require("./api/usuario/index");
const userPage02 = require("./api/usuario/pagina02");
const userPage03 = require("./api/usuario/pagina03");
const userPage04 = require("./api/usuario/pagina04");
const userPage05 = require("./api/usuario/pagina05");
const userPage06 = require("./api/usuario/pagina05");

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use("/", homePage);

app.use("/login", loginPage);
app.use("/login/pagina02.js", loginPage02);
app.use("/login/pagina03.js", loginPage03);
app.use("/login/pagina04.js", loginPage04);

app.use("/modulo/index.js", modulePage);
app.use("/modulo/pagina02.js", modulePage02);
app.use("/modulo/pagina03.js", modulePage03);

app.use("/funcionalidad/index.js", functionalityPage);
app.use("/funcionalidad/pagina02.js", functionalityPage02);
app.use("/funcionalidad/pagina03.js", functionalityPage03);

// -------------- work in progress --------------
// app.use("/rol/index.js", rolePage);
// app.use("/rol/pagina02.js", rolePage02);
// app.use("/rol/pagina03.js", rolePage03);
// app.use("/rol/pagina04.js", rolePage04);

// app.use("/rol/index.js", rolePage);
// app.use("/rol/pagina02.js", rolePage02);
// app.use("/rol/pagina03.js", rolePage03);
// app.use("/rol/pagina04.js", rolePage04);

app.listen(3000, () => {
  console.clear();
  console.log("MVC01 Grupo JavaScript - Escuchando en: http://localhost:3000 ");
});

module.exports = app;
