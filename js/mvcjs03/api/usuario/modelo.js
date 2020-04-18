Conexion = require("../db/conexion");
//Clase modelo para usuario
class Modelo {
  constructor() {
    this.con = new Conexion();
  }

  //Pagina01

  async recuperarUsuarios(datos) {
    // let queryUsuario =
    //   "SELECT * FROM usuario as usu, persona as per where usu.per_id=per.per_id ";
    let queryUsuario =
      `SELECT * 
      FROM usuario as usu, persona as per 
      where usu.per_id=per.per_id and (usu.usu_login LIKE '%${datos["usu_buscar"]}%' or per.per_id LIKE '%${datos["usu_buscar"]}%' or per.per_nombre LIKE '%${datos["usu_buscar"]}%' or per.per_apellido LIKE '%${datos["usu_buscar"]}%');`;
    // let client = new Client(connectionData);
    this.con.conexion();
    let Usuario = await this.con.sql(queryUsuario);
    this.con.cerrarConexion();
    Usuario = JSON.parse(JSON.stringify(Usuario.rows)) || "";
    return {
      Usuario,
    };
  }

  async traerUsuario(datos) {
    let updateQuery = `SELECT * FROM usuario as us where us.per_id::integer=${datos["per_id"]}`;
    // let client = new Client(connectionData);
    this.con.conexion();
    let User = await this.con.sql(updateQuery);
    this.con.cerrarConexion();

    User = JSON.parse(JSON.stringify(User.rows[0])) || "";

    return {
      ...datos,
      User,
    };
  }

  //Pagina02

  async borrarUsuario(datos) {
    let deleteQuery = `DELETE FROM usuario where per_id::integer=${datos["per_id"]}`;

    this.con.conexion();
    let Usuario = await this.con.eliminar(deleteQuery);
    this.con.cerrarConexion();
  }

  async actualizarUsuario(datos) {
    let UpdateUser = `UPDATE usuario SET usu_login='${datos["usu_login"]}', usu_clave='${datos["usu_clave"]}' where per_id::integer='${datos["per_id"]}' `;
    this.con.conexion();
    let Usuario = await this.con.sql(UpdateUser);
    this.con.cerrarConexion();
    return {
      Usuario,
    };
  }

  //Pagina 03

  async existePersona(datos) {
    this.con.conexion();
    // Buscar a la persona para ver si existe
    let selectConsulta = `select from persona where per_id='${datos["per_id"]}'`;
    console.log("[Usuario03] Se hará la consulta ", selectConsulta);
    // Ejecutar la consulta de búsqueda de persona
    let selectRespuesta = await this.con.sql(selectConsulta);
    this.con.cerrarConexion();
    return selectRespuesta;
  }

  async insertarNuevoUsuaio(datos) {
    this.con.conexion();

    // Armar la consulta de inserción de usuario
    let insertConsulta = `insert into usuario values ('${datos["usu_login"]}','${datos["usu_clave"]}','${datos["per_id"]}')`;
    console.log("[Usuario03] Se hará la consulta ", insertConsulta);

    let insertRespuesta = await this.con.sql(insertConsulta);

    this.con.cerrarConexion();

    return insertRespuesta;
  }

  // pagina04
  async insertarNuevaPersona(datos) {
    this.con.conexion();

    // Armar la consulta de inserción de persona
    let insertConsulta = `insert into persona values ('${datos["per_id"]}','${datos["per_nombre"]}','${datos["per_apellido"]}','${datos["per_fecha_nacimiento"]}','${datos["per_direccion"]}','${datos["per_correo"]}')`;
    let insertRespuesta = await this.con.sql(insertConsulta);

    this.con.cerrarConexion();

    return insertRespuesta;
  }

  //pagina05
  async obtenerUsuLogin(datos) {
    let searchUser = `select * from persona as pe, usuario as us where us.per_id=pe.per_id and pe.per_id::integer=${datos["per_id"]}`;

    this.con.conexion();
    let user = await this.con.sql(searchUser);
    this.con.cerrarConexion();
    user = JSON.parse(JSON.stringify(user.rows[0])) || "";

    return {
      ...user,
    };
  }

  async obtenerPermisos(datos) {
    let searchUser = `select * from persona as pe, usuario as us where us.per_id=pe.per_id and pe.per_id::integer=${datos["per_id"]}`;

    this.con.conexion();
    let user = await this.con.sql(searchUser);
    // console.log("Usuario: ", user);
    user = JSON.parse(JSON.stringify(user.rows[0])) || "";

    let sql1 = `select * from usuarioxrol as ur, rol as ro, usuario as us where ro.rol_id=ur.rol_id and ur.usu_login=us.usu_login and us.per_id::integer=${datos["per_id"]}`;
    console.log("consulta:", sql1);

    let res1 = await this.con.sql(sql1);

    res1 = JSON.parse(JSON.stringify(res1.rows)) || "";

    //   2
    let sql2 = ` select ro.rol_id,ro.rol_nombre from rol as ro  except  select ro.rol_id,ro.rol_nombre 
  from usuarioxrol as ur, rol as ro, usuario as us  
  where ro.rol_id=ur.rol_id and us.usu_login=ur.usu_login and us.per_id::integer=${datos["per_id"]}
  `;

    let res2 = await this.con.sql(sql2);

    res2 = JSON.parse(JSON.stringify(res2.rows)) || "";
    console.log(res2);

    this.con.cerrarConexion();

    // console.log(user, res1, res2);
    return {
      user,
      res1,
      res2,
    };
  }

  async borrarPermisos(datos) {
    let BorrarPermiso = ` delete from usuarioxrol where usu_login='${datos["LoginUsuario"]}' and rol_id::integer=${datos["sel_izq"]}
    `;

    this.con.conexion();
    let permiso = await this.con.eliminar(BorrarPermiso);
    this.con.cerrarConexion();
  }

  async insertarPermisos(datos) {
    let InsertarPermiso = `  insert into usuarioxrol values ('${datos["sel_der"]}','${datos["LoginUsuario"]}')
      `;

    this.con.conexion();
    let permiso = await this.con.sql(InsertarPermiso);
    this.con.cerrarConexion();
  }
}
module.exports = Modelo;
