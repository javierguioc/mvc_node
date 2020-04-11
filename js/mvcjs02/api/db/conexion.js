// //Importa los requerimientos necesarios para el funcionamiento
// const { Client } = require("pg");

// // Parametros para la conexion con la base de datos
// const connectionData = {
//   user: "efi",
//   host: "localhost",
//   database: "efi",
//   password: "efi",
//   port: 5432,
// };

// let client = new Client(connectionData);

// client.connect();

// function query(queryStructure) {
//   console.log("entro", queryStructure);

//   return new Promise((resolve, reject) => {
//     client
//       .query(queryStructure)
//       .then((respuesta) => {
//         // console.log("[BD] Respuesta de la consulta ", respuesta);
//         resolve(respuesta);
//       })
//       .catch((e) => {
//         console.log("[BD]: error ", e);
//         reject(e);
//       });
//   });
// }

// module.exports = {
//   query,
// };
const { Client } = require("pg");
class Postgres {
  conexion() {
    this.client = new Client({
      user: "efi",
      host: "localhost",
      database: "efi",
      password: "efi",
      port: 5432,
    });
    this.client.connect();
    console.log("[BD] - Iniciando la conexion");
  }

  query(queryStructure) {
    console.log("[BD] - Accion: ", queryStructure);

    return new Promise((resolve, reject) => {
      this.client
        .query(queryStructure)
        .then((respuesta) => {
          // console.log("[BD] Respuesta de la consulta ", respuesta);
          resolve(respuesta);
        })
        .catch((e) => {
          console.log("[BD]: error ", e);
          reject(e);
        });
    });
  }

  cerrarConexion() {
    this.client.end();
    console.log("[BD] - Cerrando la conexion");
  }
}
module.exports = Postgres;
