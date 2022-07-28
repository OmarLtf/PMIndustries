import { useState } from "react";
import Logo from "./PMI-Logo - Copie.png";
import "./login.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const userInformation = { name, password };
    console.log(userInformation);
    setName("");
    setPassword("");
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
