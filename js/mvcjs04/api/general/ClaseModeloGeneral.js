Conexion = require("../db/conexion");
/**
 *Esta clase contiene todos los metodos generales que van a ser usados por los
 * modelos
 * @author Adriana Villamizar, Hernan Guio, Daniel Quintana, Marlen Fernandez
 */

class ClaseModeloGeneral {
  constructor() {
    this.con = new Conexion();
  }

  /**
   * Método que lista la informacion segun la tabla especificada
   * @param tabla Nombre que identifica la tabla a listar
   * @return  Devuelve un HashMap con la respuesta de la base de datos
   */
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

  /**
   * Método que lista la informacion segun la tabla especificada
   *
   * @param tabla Nombre que identifica la tabla a listar
   * @param campos Contiene el identificador por el cual se va a filtrar
   * @param datos Informacion que contiene los registros del formulario a
   * listar
   * @return  Devuelve un HashMap con la respuesta de la base de datos
   */
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

  /**
   * Método que elimina un registro de una tabla especificada
   *
   * @param tabla Nombre de la tabla a la que se le eliminará el registro
   * @param campos campo que identifica al registro que se va a eliminar
   * @param datos HashMap que contiene el boton eliminar y el campo a eliminar
   * @return  Devuelve un HashMap con la respuesta de la base de datos
   */
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

  /**
   * Método que inserta informacion en la base de datos según la tabla
   * especificada
   *
   * @param tabla Nombre de la tabla en la cual se le insertaran datos
   * @param campos Campos que contienen la informacion a agregar
   * @param datos Campos provenientes del formulario
   * @return  Devuelve un HashMap con la respuesta de la base de datos
   */
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

  /**
   * Método que actualiza la informacion en la base de datos según la tabla
   * especificada
   *
   * @param tabla Nombre de la tabla a la cual se le realizarán los cambios
   * @param campos Campos que contienen la informacion a actualiar
   * @param datos Campos provenientes del formulario
   * @return  Devuelve un HashMap con la respuesta de la base de datos
   */
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

  /**
   * Método que realiza una accion en la base de datos
   *
   * @param estructura Estructura SQL que sera ejecutada
   * @return  Devuelve un HashMap con la respuesta de la base de datos
   */
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
