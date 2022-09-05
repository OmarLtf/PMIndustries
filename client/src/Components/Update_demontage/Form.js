import { useContext, useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";
import { GetUser } from "../../Helper/context";
import { Redirect } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Form(props) {
  const notify = () => toast.success("Opération Validée");

  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [cd, setCd] = useState("");
  const [data, setData] = useState([]);
  const [com, setCom] = useState("");

  var retrievedObject = localStorage.getItem("object");
  const userData = JSON.parse(retrievedObject);

  const getUsers = () => {
    Axios.get("http://localhost:3001/data/new_inter").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const filter = (rows) => {
    return rows.filter(
      (rows) =>
        rows.OF.toString().toLowerCase().indexOf(OF) === 0 &&
        rows.Lot.toString().toLowerCase().indexOf(lot) === 0
    );
  };

  const updateRow = () => {
    const filteredData = filter(data);
    if (filteredData.length === 1) {
      console.log(cd);
      if (cd) {
        let Qt_demantage = 0;
        if (filteredData[0].D_montage) {
          Qt_demantage = parseInt(cd) + parseInt(filteredData[0].D_montage);
        } else {
          Qt_demantage = parseInt(cd);
        }
        notify();
        Axios.post("http://localhost:3001/demantage/updaterow", {
          demantage: Qt_demantage,
          id: filteredData[0].OF,
          /////traceability///////
          matricule: userData.matricule,
          user: userData.name,
          produit: filteredData[0].Produit,
          lot: filteredData[0].Lot,
          ref: filteredData[0].R_f_rence,
          table: "Demantage",
          input: cd,
          comentaire: com,
        });
      } else {
        window.alert("champ vide");
      }
    } else window.alert("Choisir un seul ligne !");
  };
  // if (!props.state) {
  //   return <Redirect path="/login"></Redirect>;
  // }
  return (
    <div className="containor">
      <Toaster />
      <h1 className="title bloquage">Table Démontage</h1>
      <p className="msg">Merci De Remplir Les Champs...😃 </p>

      <form className="formInter">
        <div className="formCell">
          <div className="field">
            <label>Lot :</label>
            <input type="text" onChange={(e) => setLot(e.target.value)} />
          </div>
          <div className="field">
            <label>Ordre de Fabrication :</label>
            <input
              type="text"
              required
              onChange={(e) => setOF(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Qunatité démontée :</label>
            <input
              type="text"
              required
              onChange={(e) => setCd(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Commentaire :</label>
            <input type="text" onChange={(e) => setCom(e.target.value)} />
          </div>
        </div>

        <button className="buttonUpdate" onClick={updateRow}>
          Update
        </button>
      </form>
      {/* <GetTable data={filter(data)} /> */}
      <GetTable data={filter(data)} />
    </div>
  );
}

export default Form;
