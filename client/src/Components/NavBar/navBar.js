import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { GetUser } from "../../Helper/context";
import "./nav.css";
import Logo from "./PMI-Logo - Copie.png";

const NavBar = (props) => {
  var retrievedObject = localStorage.getItem("object");
  const userData = JSON.parse(retrievedObject);

  if (!props.state) {
    return <Redirect to="/login"></Redirect>;
  }
  if (userData.role === "Administrateur") {
    return (
      <div>
        <nav className="navBar">
          <img className="imgNav" src={Logo} alt="logo" />
          <ul>
            <NavLink className="link" to="/interface/upload">
              <li>Upload</li>
            </NavLink>

            <NavLink exact className="link" to="/interface/utilisateur">
              <li>Table des Utilisateurs</li>
            </NavLink>

            <NavLink className="link" to="/demontage">
              <li>Table Démontage</li>
            </NavLink>

            <NavLink className="link" to="/preparation">
              <li>Table Préparation</li>
            </NavLink>

            <NavLink className="link" to="/zinguage">
              <li>Table Zinguage</li>
            </NavLink>

            <NavLink className="link" to="/montage">
              <li>Table Montage</li>
            </NavLink>

            <NavLink className="link" to="/bloquage">
              <li>Table Bloquage</li>
            </NavLink>

            <NavLink className="link" to="/export">
              <li>Table Export</li>
            </NavLink>

            <NavLink className="link" to="/traceability">
              <li>Table de Tracabilité</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  } else if (
    userData.role === "Chef production" ||
    userData.role === "Chef ilot"
  ) {
    return (
      <div>
        <nav className="navBar">
          <img className="imgNav" src={Logo} alt="logo" />
          <ul>
            <NavLink className="link" to="/interface/upload">
              <li>Upload</li>
            </NavLink>

            <NavLink className="link" to="/demontage">
              <li>Table Démontage</li>
            </NavLink>

            <NavLink className="link" to="/preparation">
              <li>Table Préparation</li>
            </NavLink>

            <NavLink className="link" to="/zinguage">
              <li>Table Zinguage</li>
            </NavLink>

            <NavLink className="link" to="/montage">
              <li>Table Montage</li>
            </NavLink>

            <NavLink className="link" to="/bloquage">
              <li>Table Bloquage</li>
            </NavLink>

            <NavLink className="link" to="/export">
              <li>Table Export</li>
            </NavLink>

            <NavLink className="link" to="/traceability">
              <li>Table de Tracabilité</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  } else if (userData.role === "Consultant") {
    return (
      <div>
        <nav className="navBar">
          <img className="imgNav" src={Logo} alt="logo" />
          <ul>
            <NavLink activeClassName="active" className="link" to="/demontage">
              <li>Table Démontage</li>
            </NavLink>

            <NavLink
              activeClassName="active"
              className="link"
              to="/preparation"
            >
              <li>Table Préparation</li>
            </NavLink>

            <NavLink activeClassName="active" className="link" to="/montage">
              <li>Table Montage</li>
            </NavLink>

            <NavLink activeClassName="active" className="link" to="/export">
              <li>Table Export</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};

export default NavBar;
