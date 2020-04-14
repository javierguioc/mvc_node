postgres = require("../db/conexion");
// Clase modelo para login
class Modelo {
  constructor() {
    this.con = new postgres();
  }
// pagina02
  async validar(datos) {
    let searchUser = `SELECT * FROM usuario WHERE usu_login='${datos["usu_login"]}' and usu_clave='${datos["usu_clave"]}' `;
    // Verifica que el usuario tenga un rol asignado
    let role = ` select count(*) as cant from usuario as u , usuarioxrol as ur where u.usu_login = ur.usu_login and u.usu_login='${datos["usu_login"]}' `;
    let querySearchUser = "";
    let queryRole = "";
    let rol_id = "";
    this.con.conexion();
    try {
      //Consulta la base de datos

      querySearchUser = await this.con.query(searchUser);
      queryRole = await this.con.query(role);
      // Verifica si hay respuesta que represente la existencia de un usuario en la base de datos
      if (querySearchUser.rows[0]) {
        //Da formato json a la respuesta de la base de datos
        querySearchUser =
          JSON.parse(JSON.stringify(querySearchUser.rows[0])) || "";
        queryRole = JSON.parse(JSON.stringify(queryRole.rows[0])) || "";
      } else {
        querySearchUser.usu_login = "";
        querySearchUser.usu_clave = "";
      }

      let cant = queryRole.cant;
      // Obtiene al usuario con su rol respectivo
      let userRole = `select * from usuario as u , usuarioxrol as ur,rol as r where u.usu_login = ur.usu_login and u.usu_login='${datos["usu_login"]}' and r.rol_id=ur.rol_id`;
      let queryUserRole = "";

      queryUserRole = await this.con.query(userRole);
      if (queryUserRole.rows[0]) {
        queryUserRole = JSON.parse(JSON.stringify(queryUserRole.rows[0])) || "";
        rol_id = queryUserRole.rol_id;
      }

      // Termina la sesion de la base de datos
      this.con.cerrarConexion();
    } catch (error) {
      console.log("[Error Pagina02] ", error);
    }
    return {
      ...datos,
      r_usu_login: querySearchUser.usu_login,
      r_usu_clave: querySearchUser.usu_clave,
      queryRole,
      rol_id,
    };
  }

  // pagina03
  async funcionalidades(datos) {
    // Trae información del usuario, su rol, modalidades a las que puede acceder
    let sql = `select * from 
    usuario as usu,  
    rol as ro,  
    usuarioxrol as usr,  
    modulo as mo,  
    funcionalidad as fun,  
    rolxfuncionalidad as rf  
    where usu.usu_login=usr.usu_login  
    and ro.rol_id=usr.rol_id  
    and fun.mod_id=mo.mod_id  
    and rf.rol_id=ro.rol_id  
    and rf.fun_id=fun.fun_id  
    and usu.usu_login='${datos["usu_login"]}'  
    and ro.rol_id='${datos["rol_id"]}' ;`;

    let result = "";

    //Trae las funcion
    let FuncionesUsuario = `select f.fun_nombre from usuarioxrol as uxr, rolxfuncionalidad as rxf, funcionalidad as f where uxr.rol_id=rxf.rol_id and rxf.fun_id=f.fun_id and uxr.usu_login='${datos["usu_login"]}'`;
    console.log(FuncionesUsuario);
    let FunxUsu = "";

    try {
      this.con.conexion();

      result = await this.con.query(sql);
      result = JSON.parse(JSON.stringify(result.rows[0])) || "";

      FunxUsu = await this.con.query(FuncionesUsuario);
      FunxUsu = JSON.parse(JSON.stringify(FunxUsu.rows)) || "";
      console.log(FunxUsu);

      this.con.cerrarConexion();
    } catch (err) {
      console.log("[Error Pagina04] ", err);
    }

    return {
      ...datos,
      result,
      FunxUsu,
    };
  }
}
module.exports = Modelo;
