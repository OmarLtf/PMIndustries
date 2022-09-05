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
  const [Qt_tr, setQtTr] = useState("");
  const [Qt_lib, setQtLib] = useState("");
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
      if (Qt_lib !== null && Qt_tr !== null) {
        var Qt_zinguage = parseInt(Qt_tr) - parseInt(Qt_lib);
        var zinguage_totale = Qt_zinguage + parseInt(filteredData[0].Zingueur);
        var zinguageBrut = parseInt(Qt_tr) + parseInt(filteredData[0].Zingueur);
        var qt_prep =
          parseInt(filteredData[0].Qt_prepare) -
          parseInt(filteredData[0].Qt_Rebut);

        let som_reb =
          parseInt(filteredData[0].Qt_Rebut) +
          parseInt(filteredData[0].Rbut_montage) +
          parseInt(filteredData[0].Rbut_export);

        let encoursNet =
          parseInt(filteredData[0].D_montage) -
          zinguage_totale -
          parseInt(filteredData[0].Bloquage) -
          som_reb;

        let encoursBrut =
          parseInt(filteredData[0].D_montage) -
          parseInt(filteredData[0].Montage) -
          parseInt(filteredData[0].Qt_Rebut);

        if (zinguage_totale <= qt_prep) {
          notify();
          Axios.post("http://localhost:3001/zinguage/updaterow", {
            zinguage: zinguage_totale,
            id: filteredData[0].OF,
            encoursNet: encoursNet,
            encoursBrut: encoursBrut,
            /////traceability///////
            matricule: userData.matricule,
            user: userData.name,
            produit: filteredData[0].Produit,
            lot: filteredData[0].Lot,
            ref: filteredData[0].R_f_rence,
            table: "Zinguage",
            input_transfer: Qt_tr,
            input_libere: Qt_lib,
            comentaire: com,
          });
        } else {
          window.alert("Zinguage superieur à quantité préparé");
        }
      }
    } else window.alert("Choisir un seul ligne !");
  };
  if (props.role === "Consultant") {
    return <Redirect to="/demontage"></Redirect>;
  }
  return (
    <div className="containor">
      <Toaster />
      <h1 className="title bloquage">Table Zinguage</h1>
      <p className="msg">Merci De Remplir Les Champs...😃</p>
      <form className="formInter">
        <div className="formCell">
          <div className="field">
            <label>Lot :</label>
            <input type="text" onChange={(e) => setLot(e.target.value)} />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Ordre de Fabrication :</label>
            <input
              type="text"
              required
              onChange={(e) => setOF(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Qunatité Transféré :</label>
            <input
              type="text"
              required
              onChange={(e) => setQtTr(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Quantité Liberé :</label>
            <input
              type="text"
              required
              onChange={(e) => setQtLib(e.target.value)}
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
      <GetTable data={filter(data)} />
    </div>
  );
}

export default Form;
