module.exports = function(req, res) {
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
                          <input type="text" name="usu_login" placeholder="Usuario" />
                          <br />
                          
                          <input type="password" name="usu_clave" placeholder="Contraseña" />
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
};