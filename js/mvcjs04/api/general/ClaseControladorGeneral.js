class ClaseControladorGeneral {
  capturar(campos, datos) {
    console.log("*+--*--*+--*+-*+-+*-+*--+-*--+*-+-*-+-*-+-*+--*+--*+---+*-+-*-+-*-+-*-+-*-+*-+*-+-Llego:", { campos, datos }, "Retorna", {
      ...datos,
      ...campos,
    });
    return { ...datos, ...campos };
  }
}
module.exports = ClaseControladorGeneral;
