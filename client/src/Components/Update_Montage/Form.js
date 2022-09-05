import { useContext, useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";
import { GetUser } from "../../Helper/context";

function Form() {
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [montage, setMontage] = useState("");
  const [data, setData] = useState([]);
  const [rebut, setRebut] = useState("");
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
      if (montage !== null && rebut !== null) {
        let qt_prep = parseInt(filteredData[0].Qt_prepare);
        let reb_prep = parseInt(filteredData[0].Qt_Rebut);
        let zing = parseInt(filteredData[0].Zingueur);
        let test = qt_prep - reb_prep - zing;
        let qt_mont = parseInt(montage) + parseInt(filteredData[0].Montage);
        console.log("quantité montage");

        if (qt_mont <= test && test !== 0) {
          let som_reb =
            parseInt(filteredData[0].Qt_Rebut) +
            parseInt(filteredData[0].Rebut_montage) +
            parseInt(filteredData[0].Rebut_export);

          let finalMontage =
            parseInt(filteredData[0].Montage) +
            parseInt(montage) -
            parseInt(rebut);

          let encoursBrut = parseInt(filteredData[0].D_montage) - finalMontage;

          let encoursNet =
            parseInt(filteredData[0].D_montage) -
            parseInt(filteredData[0].Zingueur) -
            parseInt(filteredData[0].Bloquage) -
            som_reb;

          Axios.post("http://localhost:3001/montage/updaterow", {
            montage: qt_mont,
            encoursBrut: encoursBrut,
            encoursNet: encoursNet,
            id: filteredData[0].OF,
            /////traceability///////
            matricule: userData.matricule,
            user: userData.name,
            produit: filteredData[0].Produit,
            lot: filteredData[0].Lot,
            ref: filteredData[0].R_f_rence,
            table: "Montage",
            input_rebut: rebut,
            input_montage: montage,
            comentaire: com,
          });
        } else {
          window.alert("valeurs invalides !");
        }
      }
    } else window.alert("Choisir un seul ligne !");
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
            <label>Quantité monté</label>
            <input
              type="text"
              required
              onChange={(e) => setMontage(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Champ Rebut</label>
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
