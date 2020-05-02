class ClaseControladorGeneral {
  capturar(campos, datos) {
    return { ...datos, ...campos };
  }
}
module.exports = ClaseControladorGeneral;
