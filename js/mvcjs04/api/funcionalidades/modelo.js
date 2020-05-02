//Conexion = require("../db/conexion");
ClaseModeloGeneral = require("../general/ClaseModeloGeneral");
class Modelo extends ClaseModeloGeneral {
    //Index
    async borrarFuncionalidad(datos) {
        let Funcionalidad = await this.eliminar("funcionalidad", "fun_id", datos);
    }

    async recuperarFuncionalidad(datos) {
        let queryFuncionalidad = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${datos["mod_id"]}`;
        let Funcionalidad = await this.sql(queryFuncionalidad);
        Funcionalidad = JSON.parse(JSON.stringify(Funcionalidad.rows)) || "";
        return {
            ...datos,
            Funcionalidad,
        };
    }

    // pagina02
    async traerFuncionalidad(datos) {
        console.log(datos["mod_id"]);
        let functionalityToUpdate = `SELECT * FROM funcionalidad as fun, modulo as mod where mod.mod_id=fun.mod_id  and fun.mod_id::integer=${datos["mod_id"]} and fun.fun_id::integer=${datos["fun_id"]}
    `;
        let functionality = await this.sql(functionalityToUpdate);
        functionality = JSON.parse(JSON.stringify(functionality.rows[0])) || "";

        return {
            ...datos,
            functionality,
        };
    }

    async actualizarFuncionalidad(datos) {
        let functionalityUpdate = await this.actualizar(
            "funcionalidad", "fun_id,fun_nombre,fun_ruta,fun_descripcion",
            datos
        );
        return {
            ...datos,
            functionalityUpdate,
        };
    }

    // pagina03
    async insertarNuevaFuncionalidad(datos) {
        let insertResponse = await this.insertar(
            "funcionalidad", "fun_nombre,fun_ruta,fun_descripcion,mod_id",
            datos);
        return {
            ...datos,
            insertResponse,

        };
    }


}
module.exports = Modelo;