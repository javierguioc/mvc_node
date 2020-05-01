Conexion = require("../db/conexion");
// Clase modelo para funcionalidades
class Modelo extends ClaseModeloGeneral {

   
  //Index
    async borrarFuncionalidad(datos) {
    let deleteFuncionalidad = `DELETE FROM funcionalidad where fun_id::integer=${datos["fun_id"]};`;
    this.con.conexion();
    let Funcionalidad = await this.con.sql(deleteFuncionalidad);
    this.con.cerrarConexion();
  }  
  
    async recuperarFuncionalidad(datos) {
	let queryFuncionalidad = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${datos["mod_id"]}`;
	this.con.conexion();
	let Funcionalidad = await this.con.sql(queryFuncionalidad);
	this.con.cerrarConexion();
	Funcionalidad = JSON.parse(JSON.stringify(Funcionalidad.rows)) || "";
	return {
    ...datos,
	  Funcionalidad,
	};
  }
  
  // pagina02
      async traerFuncionalidad(datos) {
    console.log(datos["mod_id"]);
    let functionalityToUpdate = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${datos["mod_id"]} and fun.fun_id::integer=${datos["fun_id"]}
    `;
    this.con.conexion();
    let functionality = await this.con.sql(functionalityToUpdate);
    this.con.cerrarConexion();

    functionality = JSON.parse(JSON.stringify(functionality.rows[0])) || "";

    return {
      ...datos,
      functionality,
    };
  }
  
  async actualizarFuncionalidad(datos) {
	let updatefunctionality = ` UPDATE funcionalidad SET fun_id=${datos["fun_id"]}, fun_nombre='${datos["fun_nombre"]}', fun_ruta='${datos["fun_ruta"]}',fun_descripcion='${datos["fun_descripcion"]}',mod_id=${datos["mod_id"]} where fun_id::integer=${datos["fun_id"]}`;
    this.con.conexion();
	let functionalityUpdate = await this.con.sql(updatefunctionality);
    this.con.cerrarConexion();
    return {
      ...datos,
      functionalityUpdate,
    };
  }
  
  // pagina03
 
 async insertarNuevaFuncionalidad(datos) {
    this.con.conexion();
	let insertFuncionalidad = `insert into funcionalidad(fun_nombre,fun_ruta,fun_descripcion,mod_id) values ('${datos["fun_nombre"]}','${datos["fun_ruta"]}','${datos["fun_descripcion"]}',${datos["mod_id"]});`;
    let insertResponse = await this.con.sql(insertFuncionalidad);
    this.con.cerrarConexion();
  return {
    ...datos,
    insertResponse,
  
  };

}


}
module.exports = Modelo;
