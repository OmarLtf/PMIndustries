import React from "react";
import { useHistory } from "react-router-dom";
import "./logout.css";
import Logo from "./PMI-Logo - Copie.png";

function Logout() {
  const history = useHistory();

  const logOut = () => {
    history.push("/login");
  };
  return (
    <div className="header">
      <img className="logoLogout" src={Logo} alt="logo" />
      <button className="logOutButton" onClick={logOut}>
        Deconnecter
      </button>
    </div>
  );
}

export default Logout;
