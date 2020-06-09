module.exports = async function (res, datos) {

  // Renderizar el formulario HTML
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
      <html>
        <head><meta charset="UTF-8"></head>
        <body>
          <h2>Registro de usuario</h2>
          <form name="registrarUsuario" action="./index.js" method="POST" target="resultado">
            <table border="1">
              <tr><td>
              <table>
                <tr>
                  <td align="right">Usuario:</td><td align="left"> <input type="text" value="" name="usu_login" size="20"></td>
                </tr>
                <tr>
                  <td align="right">Contraseña:</td><td align="left"> <input type="password" value="" name="usu_clave" size="10" maxlength="10" placeholder="Contraseña"></td>
                </tr>
                <tr>
                  <td align="right">Id persona:</td><td align="left"> <input type="text" value="" name="per_id" size="10" maxlength="10"></td>
                </tr>
                <tr >
                  <td colspan="2" align="center"><input name="btnAction" type="submit" value="Enviar nuevo"> <input type="reset" value="Borrar"></td>
                </tr>
              </table>
              </td></tr>
            </table>
          </form>
        </body>
      </html>`);
  res.end();

};
