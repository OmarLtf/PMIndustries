import { useEffect, useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";

function Form() {
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [Qt_tr, setQtTr] = useState("");
  const [Qt_lib, setQtLib] = useState("");
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
      if (Qt_lib !== null && Qt_tr !== null) {
        var Qt_zinguage =
          parseInt(Qt_tr) -
          parseInt(Qt_lib) +
          parseInt(filteredData[0].Bloquage);
        Axios.post("http://localhost:3001/bloquage/updaterow", {
          zinguage: Qt_zinguage,
          id: filteredData[0].OF,
        });
      }
    } else window.alert("Choisir un seul ligne !");
  };

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
              <input type="text" />
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
