import { useState } from "react";
import Logo from "./PMI-Logo - Copie.png";
import Axios from "axios";
import "./login.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    Axios.post("http://localhost:3001/login", {
      userName: name,
      password: password,
    }).then((response) => {
      console.log("hello");
    });
  };

  return (
    <div>
      <img src={Logo} alt="logo" />
      <form onSubmit={login}>
        <label>Nom d'utilisateur</label>
        <input
          type="test"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Connexion</button>
      </form>
    </div>
  );
}

export default Login;
