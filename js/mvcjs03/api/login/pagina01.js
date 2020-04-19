module.exports = function (req, res) {
  //   console.log("Entro en la pagina 01");
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
                      <form method="POST" action="./index.js">
                          <input type="text" name="usuario" placeholder="Usuario" />
                          <br />
                          
                          <input type="password" name="pass" placeholder="Contraseña" />
                          <br />
                          <br />
                          <INPUT name="btnAction" type="submit" value="Ingresar">
                      </form>
                  </center>
              </div>
          </body>
      </html>
      `
  );
  res.end();
};
