class ClaseVistaGeneral {

    cajaTexto(tipo, nombre, valor, place) {
        return `<input type="${tipo}" name="${nombre}" value="${valor}" placeholder="${place}" /><br>`
    }

    hidden(nombre, valor) {
        return `<input type="hidden"  name="${nombre}" value="${valor}" />`;
    }

    boton(nombre) {
        return `<input name="btnAction" type="submit" value="${nombre}"/>`
    }

    botonr() {
        return `<button onclick="window.location.href = '/'"><==</button>`
    }
    botonred(value, formaction) {
        return `<input type="submit" value="${value}" name="btnAction" formaction="${formaction}"/>`
    }

    botonreset() {
        return `<INPUT type="reset" value="Borrar">`
    }

    select(name, lista, size, value, campo) {
        let str = ""
        str = str + `<select name ="${name}" size="${size}" >`
        lista.forEach((element) => {
            str = str + ` <option value=${element[value]}> ${element[campo]}</option> `
        });
        str = str + "</select> </br>"
        return str
    }

    listar(lista, valor) {
        let str = " <ul>"
        let v = `${valor}`
        lista.forEach((element) => {
            str = str + `<li> ${element[v]}</li> `
        });
        str = str + "</ul> </br>"
        return str
    }
    radio(name, value, campos, lista) {

        let str = `<tr> <td> </td>`
        campos.forEach((element) => {
            str = str + `<td>${element}</td> `
        });
        str = str + " </tr>"
        let v = `${value}`
        lista.forEach((element) => {
            str = str + ` <tr> <td><input type="radio" name="${name}" value="${element[v]} "></td>`
            campos.forEach((element2) => {
                str = str + `<td>${element[element2]}</td> `
            });
            str = str + " </tr>"
        });
        str = str + " </tr>"
        return str
    }

    tabla(datosh, datost) {

        let str = `<TR> <TD>  <TABLE>`;
        datosh.forEach((element) => {
            str = str + `<TR> <TD align="right"></TD><TD align="left"><INPUT type="hidden" value="${element[0]}" name="${element[1]}" size="25"></TD> </TR> `
        });
        datost.forEach((element) => {
            str = str + `<TR>  <TD align="right">${element[2]}</TD><TD align="left"><INPUT type="${element[3]}" value="${element[0]}" name="${element[1]}" size="25"></TD> </TR> `
        });
        str = str + `  </TABLE> </TD> </TR>`
        return str
    }
    formulario(datos) {
        let datos1 = datos.split(',');
        let datos3 = [];
        datos1.forEach((element) => {
            datos3.push(element.split(':'))
        });
        let str = `<TABLE>`;
        datos3.forEach((element) => {
            str = str + `<TR>  <TD align="right">${element[2]}</TD><TD align="left"><INPUT type="${element[3]}" value="${element[0]}" name="${element[1]}" size="25"></TD> </TR> `
        });
        str = str + `  </TABLE>`
        return str
    }


}
module.exports = ClaseVistaGeneral;