import { useContext, useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";
import { GetUser } from "../../Helper/context";
import { Redirect } from "react-router-dom";

function Form(props) {
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [rebut, setRebut] = useState("");
  const [exporte, setExport] = useState("");
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
      let Qt_exporte = parseInt(exporte) + parseInt(filteredData[0].Qt_Export);

      let qt_rebut = parseInt(rebut) + parseInt(filteredData[0].Rbut_export);

      let qt_montage =
        parseInt(filteredData[0].Montage) -
        parseInt(filteredData[0].Rbut_montage);

      let qt_bloquage = parseInt(filteredData[0].Bloquage);
      let test = qt_montage - qt_bloquage;

      let som_reb =
        parseInt(filteredData[0].Qt_Rebut) +
        parseInt(filteredData[0].Rebut_montage) +
        parseInt(filteredData[0].Rebut_export);

      let encoursNet =
        parseInt(filteredData[0].D_montage) -
        parseInt(filteredData[0].Zingueur) -
        parseInt(filteredData[0].Bloquage) -
        som_reb;

      if (Qt_exporte <= test && test !== 0) {
        Axios.post("http://localhost:3001/Export/updaterow", {
          exporte: Qt_exporte,
          rebut: qt_rebut,
          id: filteredData[0].OF,
          encoursNet: encoursNet,
          /////traceability///////
          matricule: userData.matricule,
          user: userData.name,
          produit: filteredData[0].Produit,
          lot: filteredData[0].Lot,
          ref: filteredData[0].R_f_rence,
          table: "Export",
          input: exporte,
          comentaire: com,
        });
      } else {
        window.alert("Valeurs Invalides !");
      }
    } else window.alert("Choisir une seule ligne !");
  };
  return (
    <div className="containor">
      <form className="formInter">
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
            <label>Qunatité Exporté</label>
            <input
              type="text"
              required
              onChange={(e) => setExport(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Quantité Rebuté</label>
            <input
              type="text"
              required
              onChange={(e) => setRebut(e.target.value)}
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
      </form>
      <GetTable data={filter(data)} />
    </div>
  );
}

export default Form;
