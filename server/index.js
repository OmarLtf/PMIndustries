const express = require("express");
const app = express();
const mysql = require("mysql");
const nodemon = require("nodemon");

const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "sqluser",
  password: "password",
  database: "pmi_db",
});

app.post("/adduser", (req, res) => {
  const userName = req.body.userName;
  const role = req.body.role;
  const matricule = req.body.matricule;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO users (userName, role, matricule, password) VALUES (?, ?, ?, ?);";

  db.query(sqlInsert, [userName, role, matricule, password], (err, result) => {
    console.log("success!");
  });
});

app.get("/data", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (request, result) => {
    res.send(result);
  });
});

//////////////////////Login/////////////////////////////////////

app.get("/login/:username-:password", (req, res) => {
  // const name = req.body.userName;
  // const password = req.body.password;
  const name = req.params.username;
  const password = req.params.password;
  db.query(
    "SELECT * FROM users WHERE userName = ? AND password = ?",
    [name, password],
    (request, result) => {
      console.log(result);
      if (result.length > 0) {
        console.log("success login!");
        res.send("yes");
      } else {
        console.log("failur login!");
        res.send("no");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    console.log("success Deleting!", req.params.id);
  });
});

///////////////// New interface //////////////////////

app.get("/data/new_inter", (req, res) => {
  const sql = "SELECT * FROM suivi_production_dape_3";
  db.query(sql, (request, result) => {
    res.send(result);
  });
});

////////////////////update row//////////////////////////
app.post("/updaterow", (req, res) => {
  const CR = req.body.newCR;
  const CP = req.body.newCP;
  const OF = req.body.id;

  const sqlInsert =
    " UPDATE suivi_production_dape_3 SET Qt_Rebut = ?, Qt_prepare = ? WHERE suivi_production_dape_3.OF = ? ;";

  db.query(sqlInsert, [CR, CP, OF.toString()], (err, result) => {
    console.log("success update update!");
  });
});

/////////////////////Zinguage///////////////////////////
app.post("/zinguage/updaterow", (req, res) => {
  const zinguage = req.body.zinguage;
  const OF = req.body.id;
  const sqlInsert =
    " UPDATE suivi_production_dape_3 SET Zingueur = ? WHERE suivi_production_dape_3.OF = ? ;";

  db.query(sqlInsert, [zinguage, OF.toString()], (err, result) => {
    console.log("success update update!");
  });
});

/////////////////////Bloquage///////////////////////////
app.post("/bloquage/updaterow", (req, res) => {
  const zinguage = req.body.zinguage;
  const OF = req.body.id;
  const sqlInsert =
    " UPDATE suivi_production_dape_3 SET Bloquage = ? WHERE suivi_production_dape_3.OF = ? ;";

  db.query(sqlInsert, [zinguage, OF.toString()], (err, result) => {
    console.log("success update update!");
  });
});

/////////////////////Montage///////////////////////////
app.post("/montage/updaterow", (req, res) => {
  const montage = req.body.montage;
  const encoursBrut = req.body.encoursBrut;
  const encoursNet = req.body.encoursNet;
  const OF = req.body.id;
  const sqlInsert =
    " UPDATE suivi_production_dape_3 SET Montage = ?, Encours_Atelier_Net = ?, Encours_Atelier_Brut = ? WHERE suivi_production_dape_3.OF = ? ;";

  db.query(
    sqlInsert,
    [montage, encoursBrut, encoursNet, OF.toString()],
    (err, result) => {
      console.log("success update update!");
      console.log(montage);
      console.log(encoursBrut);
      console.log(encoursNet);
    }
  );
});

/////////////////////demantage///////////////////////////
app.post("/demantage/updaterow", (req, res) => {
  const demantage = req.body.demantage;
  const OF = req.body.id;
  const sqlInsert =
    " UPDATE suivi_production_dape_3 SET D_montage= ? WHERE suivi_production_dape_3.OF = ? ;";

  db.query(sqlInsert, [demantage, OF.toString()], (err, result) => {
    console.log("success update update!");
  });
});

/////////////////////Export///////////////////////////
app.post("/Export/updaterow", (req, res) => {
  const exporte = req.body.exporte;
  const rebut = req.body.rebut;
  const OF = req.body.id;
  const sqlInsert =
    " UPDATE suivi_production_dape_3 SET Qt_Export= ? , Rbut_export = ? WHERE suivi_production_dape_3.OF = ? ;";

  db.query(sqlInsert, [exporte, rebut, OF.toString()], (err, result) => {
    console.log("success update update!");
  });
});

app.listen(3001, () => {
  console.log("running on 3001!");
});
