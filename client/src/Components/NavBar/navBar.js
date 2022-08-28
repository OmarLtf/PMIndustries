import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

const navBar = () => {
  return (
    <div>
      <nav className="navBar">
        <ul>
          <li>
            <NavLink className="link" to="/utilisateur">
              Utilisateur
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/demontage">
              Demontage
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/preparation">
              Preparation
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/bloquage">
              Bloquage
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/zinguage">
              Zinguage
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/montage">
              Montage
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/export">
              Export
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default navBar;
