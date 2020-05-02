//Conexion = require("../db/conexion");
ClaseModeloGeneral = require("../general/ClaseModeloGeneral");
// Clase modelo para modulo
class Modelo extends ClaseModeloGeneral {
  //index
  async borrarModulo(datos) {
    let Modulo = await this.eliminar("modulo", "mod_id", datos);
  }

  async recuperarModulo() {
    let Modulo = await this.consulta("modulo");
    return {
      Modulo,
    };
  }
  // pagina02
  async traerModulo(datos) {
    console.log(datos["mod_id"]);
    let Module = await this.consultaIndividual("modulo", "mod_id", datos);

    return {
      ...datos,
      Module,
    };
  }

  async actualizarModulo(datos) {
    let Module = await this.actualizar(
      "modulo",
      "mod_id,mod_nombre,mod_descripcion",
      datos
    );
    return {
      Module,
    };
  }
  // pagina03
  async insertarNuevoModulo(datos) {
    let insertResponse = await this.insertar(
      "modulo",
      "mod_nombre,mod_descripcion",
      datos
    );
    return insertResponse;
  }
}
module.exports = Modelo;
