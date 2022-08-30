import { useState } from "react";
import Logo from "./PMI-Logo - Copie.png";
import Axios from "axios";
import "./login.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nav, setNav] = useState(false);

  const login = (e) => {
    Axios.get(
      `http://localhost:3001/login/${name}-${password}`
      //  {
      //   userName: name,
      //   password: password,
      // }
    ).then((response) => {
      console.log(response);
      if (response.data === "yes") {
        setNav(true);
      } else {
        setNav(false);
      }
    });
  };
  // if (nav) {
  //   return <Navigate to="/utilisateur"></Navigate>;
  // } else {
  return (
    <div>
      <img src={Logo} alt="logo" />
      <form>
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
        <button onClick={login}>Connexion</button>
      </form>
    </div>
  );
}
// }

export default Login;
