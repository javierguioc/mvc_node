// Conexion = require("../db/conexion");
ClaseModeloGeneral = require("../general/ClaseModeloGeneral");
// Clase modelo para rol
class Modelo extends ClaseModeloGeneral {
  //index
  async recuperarRol() {
    let Rol = await this.consulta("rol");
    Rol = JSON.parse(JSON.stringify(Rol.rows)) || "";
    return {
      Rol,
    };
  }

  async borrarRol(datos) {
    let Rol = await this.eliminar("rol", ["rol_id"], datos);
  }

  // pagina02
  async traerRol(datos) {
    console.log(datos["rol_id"]);
    let Roles = await this.consultaIndividual("rol", ["rol_id"], datos);

    Roles = JSON.parse(JSON.stringify(Roles.rows[0])) || "";

    return {
      ...datos,
      Roles,
    };
  }

  async actualizarRol(datos) {
    let Rol = await this.actualizar(
      "rol",
      ["rol_id", "rol_nombre", "rol_descripcion"],
      datos
    );
    return {
      Rol,
    };
  }

  // pagina03
  async insertarNuevoRol(datos) {
    let insertResRol = await this.insertar(
      "rol",
      ["rol_nombre", "rol_descripcion"],
      datos
    );
    return insertResRol;
  }

  // pagina04
  async borrarPermisosRol(datos) {
    let BorrarPermiso = `delete from rolxfuncionalidad where rol_id='${datos["rol_id"]}' and fun_id::integer=${datos["sel_izq"]}
    `;
    let permiso = await this.sql(BorrarPermiso);
  }

  async insertarPermisosRol(datos) {
    let InsertarPermiso = `insert into rolxfuncionalidad values ('${datos["rol_id"]}','${datos["sel_der"]}')
    `;
    let permiso = await this.sql(InsertarPermiso);
  }

  async obtenerPermisosRol(datos) {
    console.log("PermisosRol");
    let dt = datos["rol_id"].trim();
    let ListarRol = `select * from rol as ro where ro.rol_id::integer=${datos["rol_id"]}`;
    let Rol = await this.sql(ListarRol);
    Rol = JSON.parse(JSON.stringify(Rol.rows[0])) || "";

    let ListarRxF = `select * from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${dt}'`;
    console.log(ListarRxF);
    let RolxFun = await this.sql(ListarRxF);
    console.log(RolxFun);
    RolxFun = JSON.parse(JSON.stringify(RolxFun.rows)) || "";

    //   2
    let ListarFun = `select fu.fun_id, fu.fun_nombre from funcionalidad as fu except select fu.fun_id, fu.fun_nombre from rolxfuncionalidad as rf, funcionalidad as fu where fu.fun_id=rf.fun_id and rf.rol_id::integer='${dt}'`;
    console.log(ListarFun);
    let Funciones = await this.sql(ListarFun);
    Funciones = JSON.parse(JSON.stringify(Funciones.rows)) || "";
    console.log(Funciones);

    return {
      ...datos,
      Rol,
      RolxFun,
      Funciones,
    };
  }
}
module.exports = Modelo;
