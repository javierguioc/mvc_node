/**
 *Esta clase contiene todos los metodos generales que van a ser usados por los
 * modelos
 * @author Adriana Villamizar, Hernan Guio, Daniel Quintana, Marlen Fernandez
 */
class ClaseVistaGeneral {
  /**
   * Metodo que genera un input segun parametros establecidos
   * @param {string} tipo Especifica de que tipo sera el input
   * @param {string} nombre nombre que tendrala caja de texto
   * @param {string} valor nombre que tendrala caja de texto
   * @param {string} place Nombre para reemplazar
   * @return {string}devulve un String que contienen la instruccion completa html
   */
  cajaTexto(tipo, nombre, valor, place) {
    return `<input type="${tipo}" name="${nombre}" value="${valor}" placeholder="${place}" /><br>`;
  }

  /**
   * Metodo que genera un input oculto
   * @param  {string} nombre nombre que tendrala caja de texto
   * @param  {string} valor nombre que tendrala caja de texto
   * @return {string} devulve un String que contienen la instruccion completa html
   *
   */
  hidden(nombre, valor) {
    return `<input type="hidden"  name="${nombre}" value="${valor}" />`;
  }

  /**
   * Metodo que geneta un boton
   * @param {string} nombre nombre que tendrala caja de texto
   * @return {string}  devulve un String que contienen la instruccion completa html
   */
  boton(nombre) {
    return `<input name="btnAction" type="submit" value="${nombre}"/>`;
  }

  /**
   * Metodo que geneta un boton para regresarse
   * @return {string}  devulve un String que contienen la instruccion completa html
   */
  botonr() {
    return `<button onclick="window.location.href = '/'"><==</button>`;
  }

  /**
   * Metodo que geneta un boton que redirecciona a una pagina especifica
   * @param {string} value valor que tendra la caja de texto
   * @param {string} formaction Indicara a que pagina se hara la redireccion
   * @return {string} devulve un String que contienen la instruccion completa html
   */
  botonred(value, formaction) {
    return `<input type="submit" value="${value}" name="btnAction" formaction="${formaction}"/>`;
  }
  /**
   * Metodo que geneta un boton para regresarse
   * @return {string} devulve un String que contienen la instruccion completa html
   */
  botonreset() {
    return `<INPUT type="reset" value="Borrar">`;
  }

  /**
   * Metodo que genera una lista
   * @param {string} name nombre que tendra la lista inicialmente
   * @param {string} value valor del id en la base de datos que son asignados a los elementos de la lista
   * @param {string} campo contiene el nombre que se mostrara
   * @param {Object} lista contiene todos los elementos de las listas
   * @param {string} size determina la cantidad de elementos que se mostraran
   * @return {string} devulve un String que contienen la instruccion completa html de la tabla completa
   */
  select(name, lista, size, value, campo) {
    let str = "";
    str = str + `<select name ="${name}" size="${size}" >`;
    lista.forEach((element) => {
      str =
        str + ` <option value=${element[value]}> ${element[campo]}</option> `;
    });
    str = str + "</select> </br>";
    return str;
  }

  /**
   * Metodo que genera una lista desordenada
   * @param {string} valor valor del id en la base de datos que son asignados a los elementos de la lista
   * @param {Object} lista contiene todos los elementos de las listas
   * @return {string} devulve un String que contienen la instruccion completa html de la tabla completa
   */
  listar(lista, valor) {
    let str = " <ul>";
    let v = `${valor}`;
    lista.forEach((element) => {
      str = str + `<li> ${element[v]}</li> `;
    });
    str = str + "</ul> </br>";
    return str;
  }

  /**
   * Metodo que geneta una tabla con radioButton
   * @param {string} name nombre del identificador del id en la base de datos
   * @param {string} value valor del id en la base de datos que son asignados a los radioButton
   * @param {Object} campos etiquetas de las columnas
   * @param {Object} lista etiquetas de las columnas
   * @return {string} devulve un String que contienen la instruccion completa html de la tabla completa
   */

  radio(name, value, campos, lista) {
    let str = `<tr> <td> </td>`;
    campos.forEach((element) => {
      str = str + `<td>${element}</td> `;
    });
    str = str + " </tr>";
    let v = `${value}`;
    lista.forEach((element) => {
      str =
        str +
        ` <tr> <td><input type="radio" name="${name}" value="${element[v]} "></td>`;
      campos.forEach((element2) => {
        str = str + `<td>${element[element2]}</td> `;
      });
      str = str + " </tr>";
    });
    str = str + " </tr>";
    return str;
  }

  /**
   * Metodo que geneta una tabla que es sirve para cualquie utilidad que requiera inputs
   * @param {Object} datosh Contiene los nombres de las columnas
   * @param {Object} datost Contiene informacion del valor, nombre, tipo de los inputs
   * @return {string} devulve un String que contienen la instruccion completa html de la tabla completa
   */
  tabla(datosh, datost) {
    let str = `<TR> <TD>  <TABLE>`;
    datosh.forEach((element) => {
      str =
        str +
        `<TR> <TD align="right"></TD><TD align="left"><INPUT type="hidden" value="${element[0]}" name="${element[1]}" size="25"></TD> </TR> `;
    });
    datost.forEach((element) => {
      str =
        str +
        `<TR>  <TD align="right">${element[2]}</TD><TD align="left"><INPUT type="${element[3]}" value="${element[0]}" name="${element[1]}" size="25"></TD> </TR> `;
    });
    str = str + `  </TABLE> </TD> </TR>`;
    return str;
  }

  /**
   * Metodo que geneta una tabla que es sirve para cualquie utilidad que requiera inputs
   * @param {Object} datos Contiene toda la informacion para generar un formulario
   * @return {string} devulve un String que contienen la instruccion completa html de la tabla completa
   */
  formulario(datos) {
    let datos1 = datos.split(",");
    let datos3 = [];
    datos1.forEach((element) => {
      datos3.push(element.split(":"));
    });
    let str = `<TABLE>`;
    datos3.forEach((element) => {
      str =
        str +
        `<TR>  <TD align="right">${element[2]}</TD><TD align="left"><INPUT type="${element[3]}" value="${element[0]}" name="${element[1]}" size="25"></TD> </TR> `;
    });
    str = str + `  </TABLE>`;
    return str;
  }
}

module.exports = ClaseVistaGeneral;
