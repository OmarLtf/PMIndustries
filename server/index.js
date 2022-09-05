const express = require("express");
const app = express();
const mysql = require("mysql");
const nodemon = require("nodemon");
const cors = require("cors");
const date = new Date();
const dateString = date.toLocaleString();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

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

////////////////Get Table////////////////////
app.get("/data", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (request, result) => {
    res.send(result);
  });
});

////////////////Get tracability table////////////////////
app.get("/tracData", (req, res) => {
  const sql = "SELECT * FROM traceability2";
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
        res.send(["yes", result[0]]);
      } else {
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
  const sql = "SELECT * FROM suivi_production_dape";
  db.query(sql, (request, result) => {
    res.send(result);
  });
});

////////////////////preparation//////////////////////////
app.post("/updaterow", (req, res) => {
  const CR = req.body.newCR;
  const CP = req.body.newCP;
  const OF = req.body.id;
  const net = req.body.encoursNet;
  const brut = req.body.encoursBrut;
  ///// traceability //////////
  const matricule = req.body.matricule;
  const user = req.body.user;
  const produit = req.body.produit;
  const lot = req.body.lot;
  const ref = req.body.ref;
  const table = req.body.table;
  const com = req.body.comentaire;
  const input_prep = req.body.input_prep;
  const input_rebut = req.body.input_rebut;
  console.log(CP);

  const sqlInsert =
    " UPDATE suivi_production_dape SET Encours_Atelier_Brut = ?, Encours_Atelier_Net = ?, Qt_Rebut = ?, Qt_prepare = ? WHERE suivi_production_dape.OF = ? ;";

  db.query(sqlInsert, [brut, net, CR, CP, OF.toString()], (err, result) => {
    console.log("success update update!");
  });

  const sqlTracking =
    "INSERT INTO traceability2 (Matricule, User, Produit, Lot, traceability2.Of, Reference, traceability2.Table, Type, Commentaire, Qte_Saisi, Date_doperation) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Préparé",
      com,
      input_prep,
      dateString,
    ],
    (err, result) => {
      console.log("success update export");
    }
  );

  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Rebuté",
      com,
      input_rebut,
      dateString,
    ],
    (err, result) => {
      console.log("success update export");
    }
  );
});

/////////////////////Zinguage///////////////////////////
app.post("/zinguage/updaterow", (req, res) => {
  const zinguage = req.body.zinguage;
  const OF = req.body.id;
  const net = req.body.encoursNet;
  const brut = req.body.encoursBrut;
  ///// traceability //////////
  const matricule = req.body.matricule;
  const user = req.body.user;
  const produit = req.body.produit;
  const lot = req.body.lot;
  const ref = req.body.ref;
  const table = req.body.table;
  const inp_transfer = req.body.input_transfer;
  const inp_libere = req.body.input_libere;
  const com = req.body.comentaire;
  console.log(zinguage);

  const sqlInsert =
    " UPDATE suivi_production_dape SET Encours_Atelier_Brut = ?, Encours_Atelier_Net = ?, Zingueur = ? WHERE suivi_production_dape.OF = ? ;";

  db.query(sqlInsert, [brut, net, zinguage, OF.toString()], (err, result) => {
    console.log("success update update!");
  });
  const sqlTracking =
    "INSERT INTO traceability2 (Matricule, User, Produit, Lot, traceability2.Of, Reference, traceability2.Table, Type, Commentaire, Qte_Saisi, Date_doperation) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Transféré",
      com,
      inp_transfer,
      dateString,
    ],
    (err, result) => {
      console.log("success update transfer");
    }
  );

  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Libéré",
      com,
      inp_libere,
      dateString,
    ],
    (err, result) => {
      console.log("success update liberer bla bla");
    }
  );
});

/////////////////////Bloquage///////////////////////////
app.post("/bloquage/updaterow", (req, res) => {
  const bloquage = req.body.zinguage;
  const OF = req.body.id;
  const net = req.body.encoursNet;
  const brut = req.body.encoursBrut;
  ///// traceability //////////
  const matricule = req.body.matricule;
  const user = req.body.user;
  const produit = req.body.produit;
  const lot = req.body.lot;
  const ref = req.body.ref;
  const table = req.body.table;
  const inp_transfer = req.body.input_transfer;
  const inp_libere = req.body.input_libere;
  const com = req.body.comentaire;
  console.log("bloaquage bloquage");
  console.log(bloquage);

  const sqlInsert =
    " UPDATE suivi_production_dape SET Encours_Atelier_Brut = ?, Encours_Atelier_Net = ?, Bloquage = ? WHERE suivi_production_dape.OF = ? ;";
  const sqlTracking =
    "INSERT INTO traceability2 (Matricule, User, Produit, Lot, traceability2.Of, Reference, traceability2.Table, Type, Commentaire, Qte_Saisi, Date_doperation) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [brut, net, bloquage.toString(), OF.toString()],
    (err, result) => {
      console.log("success update update!");
    }
  );

  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Transféré",
      com,
      inp_transfer,
      dateString,
    ],
    (err, result) => {
      console.log("success update transfer");
    }
  );

  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Libéré",
      com,
      inp_libere,
      dateString,
    ],
    (err, result) => {
      console.log("success update liberer");
    }
  );
});

/////////////////////Montage///////////////////////////
app.post("/montage/updaterow", (req, res) => {
  const montage = req.body.montage;
  const encoursBrut = req.body.encoursBrut;
  const encoursNet = req.body.encoursNet;
  const OF = req.body.id;
  ///// traceability //////////
  const matricule = req.body.matricule;
  const user = req.body.user;
  const produit = req.body.produit;
  const lot = req.body.lot;
  const ref = req.body.ref;
  const table = req.body.table;
  const com = req.body.comentaire;
  const input_montage = req.body.input_montage;
  const input_rebut = req.body.input_rebut;
  const sqlInsert =
    " UPDATE suivi_production_dape SET Montage = ?, Encours_Atelier_Net = ?, Rbut_montage = ?, Encours_Atelier_Brut = ? WHERE suivi_production_dape.OF = ? ;";

  db.query(
    sqlInsert,
    [montage, encoursNet, input_rebut, encoursBrut, OF.toString()],
    (err, result) => {
      console.log("success update update!");
      console.log(montage);
      console.log(encoursBrut);
      console.log(encoursNet);
    }
  );

  const sqlTracking =
    "INSERT INTO traceability2 (Matricule, User, Produit, Lot, traceability2.Of, Reference, traceability2.Table, Type, Commentaire, Qte_Saisi, Date_doperation) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Monté",
      com,
      input_montage,
      dateString,
    ],
    (err, result) => {
      console.log("success update montage trac");
    }
  );

  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Rebuté",
      com,
      input_rebut,
      dateString,
    ],
    (err, result) => {
      console.log("success update montage trac");
    }
  );
});

/////////////////////demantage///////////////////////////
app.post("/demantage/updaterow", (req, res) => {
  const demantage = req.body.demantage;
  const OF = req.body.id;
  ///// traceability //////////
  const matricule = req.body.matricule;
  const user = req.body.user;
  const produit = req.body.produit;
  const lot = req.body.lot;
  const ref = req.body.ref;
  const table = req.body.table;
  const com = req.body.comentaire;
  const input = req.body.input;
  const sqlInsert =
    " UPDATE suivi_production_dape SET D_montage= ? WHERE suivi_production_dape.OF = ? ;";

  db.query(sqlInsert, [demantage, OF.toString()], (err, result) => {
    console.log("success update update!");
  });

  const sqlTracking =
    "INSERT INTO traceability2 (Matricule, User, Produit, Lot, traceability2.Of, Reference, traceability2.Table, Type, Commentaire, Qte_Saisi, Date_doperation) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Démanté",
      com,
      input,
      dateString,
    ],
    (err, result) => {
      console.log("success update transfer");
    }
  );
});

/////////////////////Export///////////////////////////
app.post("/Export/updaterow", (req, res) => {
  const exporte = req.body.exporte;
  const rebut = req.body.rebut;
  const OF = req.body.id;
  const net = req.body.encoursNet;
  const brut = req.body.encoursBrut;
  ///// traceability //////////
  const matricule = req.body.matricule;
  const user = req.body.user;
  const produit = req.body.produit;
  const lot = req.body.lot;
  const ref = req.body.ref;
  const table = req.body.table;
  const com = req.body.comentaire;
  const input = req.body.input;
  const sqlInsert =
    " UPDATE suivi_production_dape SET Encours_Atelier_Brut = ?, Qt_Export= ? , Rbut_export = ?, Encours_Atelier_Net = ? WHERE suivi_production_dape.OF = ? ;";

  db.query(
    sqlInsert,
    [brut, exporte, rebut, net, OF.toString()],
    (err, result) => {
      console.log("success update update!");
    }
  );

  const sqlTracking =
    "INSERT INTO traceability2 (Matricule, User, Produit, Lot, traceability2.Of, Reference, traceability2.Table, Type, Commentaire, Qte_Saisi, Date_doperation) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Exporté",
      com,
      input,
      dateString,
    ],
    (err, result) => {
      console.log("success update export");
    }
  );

  db.query(
    sqlTracking,
    [
      matricule,
      user,
      produit,
      lot,
      OF.toString(),
      ref,
      table,
      "Rebuté",
      com,
      rebut,
      dateString,
    ],
    (err, result) => {
      console.log("success update export");
    }
  );
});

//////////////////////Delete Table /////////////////////:
app.delete("/deleteTable", (req, res) => {
  const Delete =
    "DELETE FROM suivi_production_dape WHERE suivi_production_dape.OF IS NOT NULL;";
  db.query(Delete, (err, result) => {
    console.log("deleted succussfully !");
  });
});

/////////////////// Insert Excel data into mysql table /////////////////////////
app.post("/excelUpload", (req, res) => {
  const sqlTracking =
    "INSERT INTO suivi_production_dape (suivi_production_dape.OF, Lot, Produit, R_f_rence, R_f_rence_Sorea, Date_De_Commande, Qt_Dd_e, D_montage, Qt_prepare, Qt_Rebut, Zingueur, Montage, Rbut_montage, Bloquage,  Qt_Export, Rbut_export , Encours_Atelier_Brut, Encours_Atelier_Net, Observation_Prod) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

  const excelData = req.body.excelData;
  console.log("data uploaded ! ");

  excelData.map((item, index) => {
    db.query(
      sqlTracking,
      [
        item["OF"],
        item["Lot"],
        item["Produit"],
        item["Référence"],
        item["Référence Sorea"],
        item["Date De Commande"],
        item["Qté Ddée"],
        item["Démontage"],
        item["Préparation"],
        item["R.Prép"],
        item["Zingueur"],
        item["Montage"],
        item["R.Mont"],
        item["Bloquage"],
        item["Qté Exporté"],
        item["R.Export"],
        item["E.Brut"],
        item["E.Net"],
        item["Observation Prod"],
      ],
      (err, result) => {
        console.log(index);
      }
    );
  });
});

app.listen(3001, () => {
  console.log("running on 3001!");
});
