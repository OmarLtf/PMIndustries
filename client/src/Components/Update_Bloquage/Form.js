import { useContext, useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";
import { GetUser } from "../../Helper/context";
import { Redirect } from "react-router-dom";

function Form(props) {
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
        var zinguage_totale = Qt_zinguage + parseInt(filteredData[0].Bloquage);
        var qt_mont =
          parseInt(filteredData[0].Montage) -
          parseInt(filteredData[0].Rbut_montage);

        let som_reb =
          parseInt(filteredData[0].Qt_Rebut) +
          parseInt(filteredData[0].Rebut_montage) +
          parseInt(filteredData[0].Rebut_export);

        let encoursNet =
          parseInt(filteredData[0].D_montage) -
          parseInt(filteredData[0].Zingueur) -
          parseInt(filteredData[0].Bloquage) -
          som_reb;

        if (zinguage_totale <= qt_mont) {
          Axios.post("http://localhost:3001/bloquage/updaterow", {
            zinguage: Qt_zinguage,
            id: filteredData[0].OF,
            encoursNet: encoursNet,
            /////traceability///////
            matricule: userData.matricule,
            user: userData.name,
            produit: filteredData[0].Produit,
            lot: filteredData[0].Lot,
            ref: filteredData[0].R_f_rence,
            table: "Bloquage",
            input_transfer: Qt_tr,
            input_libere: Qt_lib,
            comentaire: com,
          });
        } else {
          window.alert("Bloquage supérieur a quantité préparé !");
        }
      }
    } else window.alert("Choisir un seul ligne !");
  };
  // if (!props.state) {
  //   return <Redirect path="/login"></Redirect>;
  // }
  return (
    <div className="containor">
      <form className="formInter">
        <div>
          <div className="formCell">
            <div className="field">
              <label>Lot</label>
              <input type="text" onChange={(e) => setLot(e.target.value)} />
            </div>
          </div>
          <div className="formCell">
            <div className="field">
              <label>Ordre de Fabrication</label>
              <input
                type="text"
                required
                onChange={(e) => setOF(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Qunatité Transféré</label>
              <input
                type="text"
                required
                onChange={(e) => setQtTr(e.target.value)}
              />
            </div>
          </div>
          <div className="formCell">
            <div className="field">
              <label>Quantité Liberé</label>
              <input
                type="text"
                required
                onChange={(e) => setQtLib(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Commentaire</label>
              <input type="text" onChange={(e) => setCom(e.target.value)} />
            </div>
          </div>
          <button className="buttonUpdate" onClick={updateRow}>
            Update
          </button>
        </div>
      </form>
      <GetTable data={filter(data)} />
    </div>
  );
}

export default Form;
