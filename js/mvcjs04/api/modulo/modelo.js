Conexion = require("../db/conexion");
// Clase modelo para modulo
class Modelo extends ClaseModeloGeneral {

   
  //index
    async borrarModulo(datos) {
    let deleteModulo = `DELETE FROM modulo where mod_id::integer=${datos["mod_id"]};`;
    this.con.conexion();
    let Modulo = await this.con.eliminar(deleteModulo);
    this.con.cerrarConexion();
  }
  
  async recuperarModulo() {
	let queryModulo = "SELECT * FROM modulo ";
	this.con.conexion();
	let Modulo = await this.con.sql(queryModulo);
	this.con.cerrarConexion();
	Modulo = JSON.parse(JSON.stringify(Modulo.rows)) || "";
	return {
	  Modulo,
	};
  }
  // pagina02
    async traerModulo(datos) {
    console.log(datos["mod_id"])
    let ModuleToUpdate = `SELECT * FROM modulo where mod_id::integer=${datos["mod_id"]}`;
    // let client = new Client(connectionData);
    this.con.conexion();
    let Module = await this.con.sql(ModuleToUpdate);
    this.con.cerrarConexion();

    Module = JSON.parse(JSON.stringify(Module.rows[0])) || "";

    return {
      ...datos,
      Module,
    };
  }
  
    async actualizarModulo(datos) {
	let updateModule = `UPDATE modulo SET mod_id=${datos["mod_id"]}, mod_nombre='${datos["mod_nombre"]}',mod_descripcion='${datos["mod_descripcion"]}' where mod_id::integer=${datos["mod_id"]}`;
    this.con.conexion();
	let Module = await this.con.sql(updateModule);
    this.con.cerrarConexion();
    return {
      Module,
    };
  }
  // pagina03
  async insertarNuevoModulo(datos) {
    this.con.conexion();
	let insertModule = `insert into modulo(mod_nombre,mod_descripcion) values ('${datos["mod_nombre"]}','${datos["mod_descripcion"]}')`;
    let insertResponse = await this.con.sql(insertModule);
    this.con.cerrarConexion();
  return insertResponse;}
 
}
module.exports = Modelo;
