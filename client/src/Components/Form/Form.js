import { useState } from "react";
import "./Form.css";
import Axios from "axios";
import Table from "./GetTable";
function Form() {
  const [matricule, setMatricule] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const addUser = (e) => {
    Axios.post("http://localhost:3001/adduser", {
      userName: name,
      matricule: matricule,
      role: role,
      password: password,
    }).then((response) => {
      console.log(response);
    });
    // clearFields();
  };

  const clearFields = () => {
    setMatricule("");
    setRole("");
    setPassword("");
    setName("");
  };
  return (
    <div className="interfaceContainer">
      <form className="formInter">
        <div className="formCell">
          <div>
            <label>Matricule</label>
            <input
              type="text"
              required
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
            />
          </div>
          <div>
            <label>Nom Complet</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="formCell">
          <div>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Choisir une role</option>
              <option>Administrateur</option>
              <option>Chef production</option>
              <option>Chef ilot</option>
              <option>Consultant</option>
            </select>
          </div>
          <div>
            <label>Mot de pass</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="buttonEnvoyer" onClick={addUser}>
            Envoyer
          </button>
          <button className="buttonAnnuler" onClick={clearFields}>
            Annuler
          </button>
        </div>
      </form>
      <Table></Table>
    </div>
  );
}

export default Form;
