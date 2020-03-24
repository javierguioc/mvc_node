const express = require("express");
var body_parser = require("body-parser");

const pagina02login = require("./api/login/pagina02");
const pagina03login = require("./api/login/pagina03");
const pagina04login = require("./api/login/pagina04");
const indexpage = require("./api/index");
const loginpage = require("./api/login/index");

const modulopage = require("./api/modulo/index");
const pagina02modulo = require("./api/modulo/pagina02");
const pagina03modulo = require("./api/modulo/pagina03");

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


app.use("/", indexpage);
app.use("/login", loginpage);
app.use("/login/pagina02.js", pagina02login);
app.use("/login/pagina03.js", pagina03login);
app.use("/login/pagina04.js", pagina04login);

app.use("/modulo/index.js", modulopage);
app.use("/modulo/pagina02.js", pagina02modulo);
app.use("/modulo/pagina03.js", pagina03modulo);

app.use("/rol/index.js", rolePage);
app.use("/rol/pagina02.js", rolePage02);
app.use("/rol/pagina03.js", rolePage03);
app.use("/rol/pagina04.js", rolePage04);

app.use("/rol/index.js", rolePage);
app.use("/rol/pagina02.js", rolePage02);
app.use("/rol/pagina03.js", rolePage03);
app.use("/rol/pagina04.js", rolePage04);


app.listen(3000, () => {
  console.clear();
  console.log(
    " ================ Api escuchando en el puerto ",
    "http://localhost:3000",
    "================"
  );
});

module.exports = app;