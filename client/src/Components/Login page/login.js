import { useContext, useState } from "react";
import Logo from "./PMI-Logo - Copie.png";
import Axios from "axios";
import "./login.css";
import { Redirect, useHistory } from "react-router-dom";
import { GetUser, LoginContext } from "../../Helper/context";

function Login(props) {
  // const { logedIn, setLogedIn } = useContext(LoginContext);
  const { userData, setUserData } = useContext(GetUser);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // setLogedIn(false);

  const login = (e) => {
    e.preventDefault();
    Axios.get(`http://localhost:3001/login/${name}-${password}`).then(
      (response) => {
        if (response.data[0] === "yes") {
          // setLogedIn(true);
          window.localStorage.setItem("loggedIn", true);
          setUserData({
            name: response.data[1].userName,
            matricule: response.data[1].matricule,
          });
          history.push("/interface/utilisateur");
          console.log(response.data);
        } else {
          // setLogedIn(false);
          alert("wrong informations");
        }
      }
    );
  };
  return (
    <div className="body">
      <div className="loginContainer">
        <img className="imgLogin" src={Logo} alt="logo" />
        <form className="formLogin">
          <label className="labelLogin">Nom d'utilisateur</label>
          <input
            className="inputLogin"
            type="test"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="labelLogin">Mot de passe</label>
          <input
            className="inputLogin"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="buttonLogin" onClick={login}>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
// }

export default Login;
