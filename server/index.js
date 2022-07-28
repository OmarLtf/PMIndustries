const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "sqluser",
  password: "password",
  database: "pmi_db",
});

app.get("/database", (req, res) => {
  const sqlInsert = "SELECT * FROM new_table";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on 3001!");
});
