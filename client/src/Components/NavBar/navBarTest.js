import { Route } from "react-router-dom";
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
      <Navbar></Navbar>
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
