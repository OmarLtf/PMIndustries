const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const nodemon = require("nodemon");

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

app.post("/login", (req, res) => {
  const name = req.body.userName;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE userName = ? AND password = ?",
    [name, password],
    (request, result) => {
      console.log(result);
      if (result.length > 0) {
        console.log("success login!");
      } else {
        console.log("failur login!");
        res.send({ message: "wrong login information! " });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on 3001!");
});
