import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { LoginContext } from "../../Helper/context";
import "./logout.css";
import Logo from "./PMI-Logo - Copie.png";

function Logout(props) {
  // const { logedIn, setLogedIn } = useContext(LoginContext);
  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/login");
    window.location.reload(false);
    // setLogedIn(false);
  };
  if (!props.state) {
    return <Redirect to="/login"></Redirect>;
  }
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
