Conexion = require("../db/conexion");

class ClaseModeloGeneral {
  constructor() {
    this.con = new Conexion();
  }

  async consulta(tabla) {
    console.log("=-=-=-=-=-=-= Consulta en clase general=-=-=-=-=-=-=");
    this.con.conexion();
    var estructura = `SELECT * FROM ${tabla}`;
    var rs = "";
    try {
      rs = await this.con.sql(estructura);
      rs = JSON.parse(JSON.stringify(rs.rows)) || "";
    } catch (error) {
      console.log("[Error Consulta] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }

  async consultaIndividual(tabla, campos, datos) {
    console.log("=-=-=-=-=-=-= Consulta Individual =-=-=-=-=-=-=");
    campos = [campos];
    this.con.conexion();
    var estructura = `SELECT * from ${tabla} where `;
    for (var i = 0; i < campos.length; i++) {
      let a = datos[campos[i]];
      if (i === campos.length - 1) {
        estructura = estructura + ` ${campos[i]} = '${a}'`;
      } else {
        estructura = estructura + ` ${campos[i]} = '${a}'` + " and ";
      }
    }

    var rs = "";
    try {
      rs = await this.con.sql(estructura);
      rs = JSON.parse(JSON.stringify(rs.rows[0])) || "";
    } catch (error) {
      console.log("[Error Consulta] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }

  async eliminar(tabla, campos, datos) {
    console.log("=-=-=-=-=-=-= [Eliminar clase general] =-=-=-=-=-=-=");
    campos = [campos];
    this.con.conexion();
    var estructura = `delete from ${tabla} where `;
    for (var i = 0; i < campos.length; i++) {
      let a = datos[campos[i]];
      if (i === campos.length - 1) {
        estructura = estructura + ` ${campos[i]} = '${a}'`;
      } else {
        estructura = estructura + ` ${campos[i]} = '${a}'` + " and ";
      }
    }
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

  async insertar(tabla, campos, datos) {
    console.log("=-=-=-=-=-=-= [Insertar clase general] =-=-=-=-=-=-=");
    campos = campos.split(",");
    this.con.conexion();
    var estructura = `insert into ${tabla} (` + campos.toString();
    estructura = estructura + `) values ( `;
    for (var i = 0; i < campos.length; i++) {
      let a = datos[campos[i]];
      if (i === campos.length - 1) {
        estructura = estructura + `'${a}')`;
      } else {
        estructura = estructura + `'${a}', `;
      }
    }

    var rs = "";
    try {
      rs = await this.con.sql(estructura);
    } catch (error) {
      console.log("[Error Insertar] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }

  async actualizar(tabla, campos, datos) {
    console.log("=-=-=-=-=-=-= [actualizar clase general] =-=-=-=-=-=-=");
    campos = campos.split(",");
    this.con.conexion();
    var estructura = `update ${tabla} set `;
    for (var i = 0; i < campos.length; i++) {
      let a = datos[campos[i]];
      if (i === campos.length - 1) {
        estructura = estructura + ` ${campos[i]} = '${datos[campos[i]]}'  `;
      } else {
        estructura = estructura + ` ${campos[i]} = '${datos[campos[i]]}' , `;
      }
    }
    estructura = estructura + ` where ${campos[0]} = '${datos[campos[0]]}'  `;

    var rs = "";
    try {
      rs = await this.con.sql(estructura);
    } catch (error) {
      console.log("[Error Insertar] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }

  async sql(estructura) {
    console.log("=-=-=-=-=-=-= [SQL clase general] =-=-=-=-=-=-=");
    this.con.conexion();
    var rs = "";
    try {
      rs = await this.con.sql(estructura);
    } catch (error) {
      console.log("[Error Insertar] ", error);
      rs = "Error";
    }
    this.con.cerrarConexion();
    return rs;
  }
}
module.exports = ClaseModeloGeneral;
