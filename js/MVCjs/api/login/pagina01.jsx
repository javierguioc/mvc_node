const React = require("react");
class App extends React.Component {
  render() {
    return React.createElement(
      "center",
      null,
      React.createElement("h3", null, "Inicio de Sesion"),
      React.createElement(
        "form",
        { method: "POST", action: "./index.js" },
        React.createElement("input", {
          type: "text",
          name: "usu_login",
          placeholder: "Usuario",
        }),

        React.createElement("br", null),

        React.createElement("input", {
          type: "password",
          name: "usu_clave",
          placeholder: "Contraseña",
        }),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("input", {
          name: "btnAction",
          type: "submit",
          value: "Ingresar",
        })
      )
    );
  }
}
module.exports = App;
