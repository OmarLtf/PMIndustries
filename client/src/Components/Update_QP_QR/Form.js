import { useContext, useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";
import { GetUser } from "../../Helper/context";
import toast, { Toaster } from "react-hot-toast";

function Form() {
  const notify = () => toast.success("Opération Validée");
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [CR, setCR] = useState("");
  const [CP, setCP] = useState("");
  const [data, setData] = useState([]);
  const [com, setCom] = useState("");

  var retrievedObject = localStorage.getItem("object");
  const userData = JSON.parse(retrievedObject);

  const updateData = {
    CR: CR,
    CP: CP,
  };

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
    let qt_prep;
    let reb;
    if (filteredData.length === 1) {
      if (CR !== null && CP !== null) {
        if (parseInt(CP) > parseInt(filteredData[0].D_montage)) {
          window.alert("quantité préparé Supérieur à quantité démonté !");
        } else {
          if (filteredData[0].Qt_prepare && filteredData[0].Qt_Rebut) {
            qt_prep = parseInt(CP) + parseInt(filteredData[0].Qt_prepare);
            reb = parseInt(CR) + parseInt(filteredData[0].Qt_Rebut);
          } else {
            qt_prep = parseInt(CP);
            reb = parseInt(CR);
          }
          console.log(qt_prep);

          let Taux_reb =
            ((reb +
              parseInt(filteredData[0].Rbut_montage) +
              parseInt(filteredData[0].Rbut_export)) /
              parseInt(filteredData[0].D_montage)) *
            100;

          let som_reb =
            reb +
            parseInt(filteredData[0].Rbut_montage) +
            parseInt(filteredData[0].Rbut_export);

          let encoursNet =
            parseInt(filteredData[0].D_montage) -
            parseInt(filteredData[0].Zingueur) -
            parseInt(filteredData[0].Bloquage) -
            som_reb;

          let encoursBrut =
            parseInt(filteredData[0].D_montage) -
            parseInt(filteredData[0].Montage) -
            reb;
          Axios.post("http://localhost:3001/updaterow", {
            newCR: reb,
            newCP: qt_prep,
            id: filteredData[0].OF,
            encoursNet: encoursNet,
            encoursBrut: encoursBrut,
            Taux_reb: Taux_reb,
            /////traceability///////
            matricule: userData.matricule,
            user: userData.name,
            produit: filteredData[0].Produit,
            lot: filteredData[0].Lot,
            ref: filteredData[0].R_f_rence,
            table: "Préparation",
            input_prep: CP,
            input_rebut: CR,
            comentaire: com,
          });
          notify();
        }
      }
    } else window.alert("Choisir un seul ligne !");
  };

  return (
    <div className="containor">
      <Toaster />
      <h1 className="title bloquage">Table Préparation</h1>
      <p className="msg">Merci De Remplir Les Champs...😃 </p>
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
            <label>Quantité préparé :</label>
            <input
              type="text"
              required
              onChange={(e) => setCP(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Champ Rebut :</label>
            <input
              type="text"
              required
              onChange={(e) => setCR(e.target.value)}
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
      <GetTable update={updateData} data={filter(data)} />
    </div>
  );
}

export default Form;
