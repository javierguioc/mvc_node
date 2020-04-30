const { Client } = require("pg");
//Clase para la conexion con la base de datos
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

  sql(queryStructure) {
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

  eliminar(queryStructure,param) {
    console.log("[BD] - Accion: ", queryStructure,param);
    return new Promise((resolve, reject) => {
      this.client
        .query(queryStructure,param)
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
