/**
 * Esta clase se encarga de controlar todos los datos provenientes de los index y formularios
 * @author Adriana Villamizar, Hernan Guio, Daniel Quintana, Marlen Fernandez
 */

/**
 * @param campos   Recibe un HashMap con los datos provenientes del cuerpo de la request generados en los formularios
 */
class ClaseControladorGeneral {
  constructor(campos) {
    this.campos = campos;
  }

  /**
   * Método que se encarga de capturar los parámetros y ponerlos en un HashMap
   * @param {Object} datos   Recibe un HashMap en donde se almacenaran los datos de la request
   * @return {Object} Devuelve un HashMap con los valores del cuerpo de la request
   */
  capturar(datos) {
    return { ...datos, ...this.campos };
  }
}

module.exports = ClaseControladorGeneral;
