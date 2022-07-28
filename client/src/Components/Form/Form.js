import { useState } from "react";
import "./Form.css";

function Form() {
  const [matricule, setMatricule] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    const user = { matricule, name, role, password };
    console.log(user);
    clearFields();
  };

  const clearFields = () => {
    setMatricule("");
    setRole("");
    setPassword("");
    setName("");
  };
  return (
    <form>
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
            <option>Type A</option>
            <option>Type B</option>
            <option>Type C</option>
            <option>Type D</option>
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
  );
}

export default Form;
