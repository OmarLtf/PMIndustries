import { useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";

function Form() {
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [montage, setMontage] = useState("");
  const [data, setData] = useState([]);

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
      if (montage !== null) {
        const finalMontage =
          parseInt(filteredData[0].Montage) + parseInt(montage);
        const encoursBrut = parseInt(filteredData[0].Qt_prepare) - finalMontage;
        const encoursNet =
          parseInt(filteredData[0].Qt_prepare) -
          parseInt(filteredData[0].Zingueur) -
          parseInt(filteredData[0].Bloquage);
        Axios.post("http://localhost:3001/montage/updaterow", {
          montage: finalMontage,
          encoursBrut: encoursBrut,
          encoursNet: encoursNet,
          id: filteredData[0].OF,
        });
      }
    } else window.alert("Choisir un seul ligne !");
  };

  return (
    <div className="containor">
      <form>
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
            <label>Lot</label>
            <input type="text" onChange={(e) => setLot(e.target.value)} />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Montage</label>
            <input
              type="text"
              required
              onChange={(e) => setMontage(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Commentaire</label>
            <input type="text" />
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
