const express = require("express");
var body_parser = require("body-parser");

const homePage = require("./api/index");

const loginPage = require("./api/login/index");

const modulePage = require("./api/modulo/index");

const functionalityPage = require("./api/funcionalidades/index");

const rolePage = require("./api/rol/index");

const userPage = require("./api/usuario/index");


const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

// Se indica el directorio donde se almacenarán las plantillas
app.set("views", "./api/views");

// Se indica el motor del plantillas a utilizar
app.set("view engine", "pug");

app.use("/", homePage);

app.use("/login/index.js", loginPage);

app.use("/modulo/index.js", modulePage);

app.use("/funcionalidad/index.js", functionalityPage);

app.use("/rol/index.js", rolePage);

app.use("/usuario/index.js", userPage);

app.listen(3000, () => {
    console.clear();
    console.log("MVC04 Grupo JavaScript - Escuchando en: http://localhost:3000 ");
});

module.exports = app;