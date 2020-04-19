module.exports = async function (res,datos) {
  console.log("object APgina03: ", datos);
res.writeHead(200, { "Content-Type": "text/html" });
res.write(`
<h3>Usuario: ${datos["usu_login"]} </h3>
<h3>Rol:  ${datos["result"]["rol_nombre"]} </h3>
<h3>Descripcion:  ${datos["result"]["rol_descripcion"]} </h3>
<h3>Funcionalidades:  </h3>
<ul>`);
datos["FunxUsu"].forEach((element) => {
  res.write(`<li> ${element.fun_nombre}</li>`);
});
res.write(`</ul>`);

res.write(`<br><button onclick="window.location.href = '/'">Salir</button> `);
res.end();

}

