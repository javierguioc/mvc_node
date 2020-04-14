postgres = require("../db/conexion");
// Clase modelo para funcionalidades
class Modelo {

  constructor() {
    this.con = new postgres();
  }
  //Index
    async borrarFuncionalidad(datos) {
    let deleteFuncionalidad = `DELETE FROM funcionalidad where fun_id::integer=${datos["fun_id"]};`;
    this.con.conexion();
    let Funcionalidad = await this.con.query(deleteFuncionalidad);
    this.con.cerrarConexion();
  }  
  
    async recuperarFuncionalidad(datos) {
	console.log(datos["mod_id"]);
	let queryFuncionalidad = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${datos["mod_id"]}`;
	this.con.conexion();
	let Funcionalidad = await this.con.query(queryFuncionalidad);
	this.con.cerrarConexion();
	Funcionalidad = JSON.parse(JSON.stringify(Funcionalidad.rows)) || "";
	return {
	  Funcionalidad,
	};
  }
  
  // pagina02
      async traerFuncionalidad(datos) {
    console.log(datos["mod_id"]);
    let functionalityToUpdate = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${datos["mod_id"]} and fun.fun_id::integer=${datos["fun_id"]}
    `;
    this.con.conexion();
    let functionality = await this.con.query(functionalityToUpdate);
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
	let functionalityUpdate = await this.con.query(updatefunctionality);
    this.con.cerrarConexion();
    return {
      functionalityUpdate,
    };
  }
  
  // pagina03
 
 async insertarNuevaFuncionalidad(datos) {
    this.con.conexion();
	let insertFuncionalidad = `insert into funcionalidad values ('${datos["fun_id"]}','${datos["fun_nombre"]}','${datos["fun_ruta"]}','${datos["fun_descripcion"]}',${datos["mod_id"]});`;
    let insertResponse = await this.con.query(insertFuncionalidad);
    this.con.cerrarConexion();
  return insertResponse;}
}
module.exports = Modelo;
