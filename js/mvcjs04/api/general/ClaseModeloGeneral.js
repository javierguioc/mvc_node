Conexion = require("../db/conexion");

class ClaseModeloGeneral {
  constructor() {
    this.con = new Conexion();
  }

  async consulta(tabla) {
    console.log("=-=-=-=-=-=-= Entro por la clase general=-=-=-=-=-=-=");
    this.con.conexion();
    var estructura = `SELECT * FROM ${tabla}`;
    var rs = "";
    try {
      rs = await this.con.sql(estructura);
    } catch (error) {
      console.log("[Error Consulta] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }

  async consulta(tabla) {
    console.log("=-=-=-=-=-=-= Entro por la clase general=-=-=-=-=-=-=");
    this.con.conexion();
    var estructura = `SELECT * FROM ${tabla}`;
    var rs = "";
    try {
      rs = await this.con.sql(estructura);
    } catch (error) {
      console.log("[Error Consulta] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }
}
module.exports = ClaseModeloGeneral;
