Conexion = require("../db/conexion");
// Clase modelo para rol
class Modelo {

  constructor() {
    this.con = new Conexion();
  }
  
  //index 
  async borrarRol(datos) {
    let deleteRol = `DELETE FROM rol where rol_id::integer=${datos["rol_id"]}`;
    this.con.conexion();
    let Rol = await this.con.eliminar(deleteRol);
    this.con.cerrarConexion();
  }

  async recuperarRol() {
    let queryRoles = "SELECT * FROM rol ";
    this.con.conexion();
    let Rol = await this.con.sql(queryRoles);
    this.con.cerrarConexion();
    Rol = JSON.parse(JSON.stringify(Rol.rows)) || "";
    return {
      Rol,
    };
  }

  // pagina02
  async traerRol(datos) {
    console.log(datos["rol_id"])
    let RolesToUpdate = `SELECT * FROM rol where rol_id::integer=${datos["rol_id"]}`;
    // let client = new Client(connectionData);
    this.con.conexion();
    let Roles = await this.con.sql(RolesToUpdate);
    this.con.cerrarConexion();

    Roles = JSON.parse(JSON.stringify(Roles.rows[0])) || "";

    return {
      ...datos,
      Roles,
    };
  }

  async actualizarRol(datos) {
    let UpdateRol = `UPDATE rol SET rol_id=${datos["rol_id"]}, rol_nombre='${datos["rol_nombre"]}',rol_descripcion='${datos["rol_descripcion"]}' where rol_id::integer=${datos["rol_id"]}`;
    this.con.conexion();
    let Rol = await this.con.sql(UpdateRol);
    this.con.cerrarConexion();
    return {
      Rol,
    };
  }

  // pagina03
  async insertarNuevoRol(datos) {
    this.con.conexion();
    let insertRol = `insert into rol(rol_nombre,rol_descripcion) values ('${datos["rol_nombre"]}','${datos["rol_descripcion"]}')`;
    let insertResRol = await this.con.sql(insertRol);
    this.con.cerrarConexion();
    return insertResRol;
  }
  // pagina04
  async borrarPermisosRol(datos) {
    let BorrarPermiso = `delete from rolxfuncionalidad where rol_id='${datos["RolId"]}' and fun_id::integer=${datos["sel_izq"]}
    `;

    this.con.conexion();
    let permiso = await this.con.eliminar(BorrarPermiso);
    this.con.cerrarConexion();
  }  

  async insertarPermisosRol(datos) {
    let InsertarPermiso = `insert into rolxfuncionalidad values ('${datos["RolId"]}','${datos["sel_der"]}')
    `;

    this.con.conexion();
    let permiso = await this.con.sql(InsertarPermiso);
    this.con.cerrarConexion();
  }
  
  async obtenerPermisosRol(datos) {
    console.log('PermisosRol')
    let dt=datos["rol_id"].trim()
    let ListarRol = `select * from rol as ro where ro.rol_id::integer=${datos["rol_id"]}`;
    this.con.conexion();
    let Rol = await this.con.sql(ListarRol);
    Rol = JSON.parse(JSON.stringify(Rol.rows[0])) || "";


    let ListarRxF = `select * from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${dt}'`;
    console.log(ListarRxF);
    let RolxFun = await this.con.sql(ListarRxF);
    console.log(RolxFun);
    RolxFun = JSON.parse(JSON.stringify(RolxFun.rows)) || "";

    //   2
    let ListarFun = `select fu.fun_id, fu.fun_nombre from funcionalidad as fu except select fu.fun_id, fu.fun_nombre from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${dt}'`;
    console.log(ListarFun);
    let Funciones = await this.con.sql(ListarFun);
    Funciones = JSON.parse(JSON.stringify(Funciones.rows)) || "";
    console.log(Funciones);

    this.con.cerrarConexion();

    // console.log(user, res1, res2);
    return {
      Rol,
      RolxFun,
      Funciones,
    };
  }
 
}
module.exports = Modelo;
