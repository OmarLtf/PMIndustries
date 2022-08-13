import { useState } from "react";
import "./Form.css";
import Axios from "axios";
import GetTable from "./GetTable";

function Form() {
  const [lot, setLot] = useState("");
  const [OF, setOF] = useState("");
  const [CR, setCR] = useState("");
  const [CP, setCP] = useState("");
  const data = {
    OF: OF,
    Lot: lot,
  };
  return (
    <div className="containor">
      <form>
        <div className="formCell">
          <div className="field">
            <label>Lot</label>
            <input
              type="text"
              required
              onChange={(e) => setLot(e.target.value)}
            />
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
            <input type="text" required />
          </div>
        </div>
      </form>
      <GetTable input={data} />
    </div>
  );
}

export default Form;
