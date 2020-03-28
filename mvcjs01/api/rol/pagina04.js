import { createConnection } from "mysql";
import { Router } from "express";
const router = Router();

router.get("/", function_get);

let connection;

connection = createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "12345",
  database: "efi"
});

connection.connect(err => {
  if (err) {
    console.error("[DB error]:", err);
  } else {
    console.log("BD conectada");
  }
});

async function function_get(req, res, next) {
    console.log(req.query);
    let rol_id = req.query.rol_id;
    let sql = `select * from rol as ro where ro.rol_id='${rol_id}' `;
    let constul = await new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
          if (err) return reject(err);
          // console.log("Query", data);
          resolve(data);
        });
      });
    constul = JSON.parse(JSON.stringify(constul[0])) || "";
    console.log(constul);
}

module.exports = router;