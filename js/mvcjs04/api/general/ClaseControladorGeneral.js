class ClaseControladorGeneral {
  constructor(campos) {
    this.campos = campos;
  }

  capturar(datos) {
    console.log("*-*-*-*-*- Quedan capturados los siguietes datos: ", {
      ...datos,
      ...this.campos,
    });
    return { ...datos, ...this.campos };
  }
}
module.exports = ClaseControladorGeneral;
