import { Route, NavLink } from "react-router-dom";
import React from "react";
import Navbar from "./navBar";
import Bloquage from "../Update_Bloquage/Interface";
import Users from "../Form/Form";
import Demontage from "../Update_demontage/Interface";
import Prep from "../Update_QP_QR/Interface";
import Zinguage from "../Update_Zinguage/Interface";
import Montage from "../Update_Montage/Interface";
import Export from "../Update_Export/Interface";
import Upload from "../Upload_file/upload";
import Traceability from "../Traceability Table/Interface";
function navBarTest() {
  return (
    <div>
      <nav className="navBar">
        <ul>
          <li>
            <NavLink className="link" to="/interface/upload">
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink exact className="link" to="/interface/utilisateur">
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
          <li>
            <NavLink className="link" to="/traceability">
              Tableau de tracabilité
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <Navbar></Navbar> */}
      <main>
        <Route path="/interface/upload">
          <Upload></Upload>
        </Route>
        <Route path="/interface/utilisateur">
          <Users></Users>
        </Route>
        <Route path="/demontage">
          <Demontage></Demontage>
        </Route>
        <Route path="/preparation">
          <Prep></Prep>
        </Route>
        <Route path="/bloquage">
          <Bloquage></Bloquage>
        </Route>
        <Route path="/zinguage">
          <Zinguage></Zinguage>
        </Route>
        <Route path="/montage">
          <Montage></Montage>
        </Route>
        <Route path="/export">
          <Export></Export>
        </Route>
        <Route path="/traceability">
          <Traceability></Traceability>
        </Route>
      </main>
    </div>
  );
}

export default navBarTest;
