import { useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";

function Form() {
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [CR, setCR] = useState("");
  const [CP, setCP] = useState("");
  const [data, setData] = useState([]);

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

    if (filteredData.length === 1) {
      if (CR !== null && CP !== null) {
        if (parseInt(CR) + parseInt(CP) > parseInt(filteredData[0].D_montage )) {
          window.alert("Somme Supérieur à quantité démonté !");
        } else {
          Axios.post("http://localhost:3001/updaterow", {
            newCR: CR,
            newCP: CP,
            id: filteredData[0].OF,
          });
        }
      }
    } else window.alert("Choisir un seul ligne !");
  };

  return (
    <div className="containor">
      <form>
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
            <label>Quantité préparé</label>
            <input
              type="text"
              required
              onChange={(e) => setCP(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div className="field">
            <label>Champ Rebut</label>
            <input
              type="text"
              required
              onChange={(e) => setCR(e.target.value)}
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
      <GetTable update={updateData} data={filter(data)} />
    </div>
  );
}

export default Form; 