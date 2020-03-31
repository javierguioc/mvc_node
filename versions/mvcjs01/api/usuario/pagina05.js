const { Client } = require("pg");
const express = require("express");
const router = express.Router();

// Parametros para la conexion con la base de datos
const connectionData = {
  user: "efi",
  host: "localhost",
  database: "efi",
  password: "efi",
  port: 5432
};

const client = new Client(connectionData);
client.connect();

router.post("/", postFunction);

async function postFunction(req, res, next) {
    if (req.body.btnAction != "Enviar Nuevo") {
        var answer = prompt("Identificacion"); 
        res.redirect("/usuario/pagina05.js?btnAction=crear&per_id="+answer);
    }
    if ($boton == "crear") {
        let per_id=req.body.per_id;
        // Checks if $answer is empty/spaces
        if (!empty(per_id)) {
            let id = per_id;
            let sql = `SELECT * FROM persona where per_id='{req.body.per_id}`;
            let constul = await new Promise((resolve, reject) => {
                connection.query(sql, (err, data) => {
                  if (err) return reject(err);
                  // console.log("Query", data);
                  resolve(data);
                });
              });

              constul = JSON.parse(JSON.stringify(constul[0])) || "";
              console.log(constul);

            if ($consult.per_id != null) {
                //echo $ids;
                header("location: pagina03.js?per_id=$consult.per_id");
                exit;
            } else {
                echo ("<script> alert('No introdujo ID Valido');window.location='pagina04.js?per_id={$per_id}';</script>");
            }
        } else {
            echo ("<script> window.location='index.js';</script>");
        }
        exit;
    }
}
module.exports = router;
