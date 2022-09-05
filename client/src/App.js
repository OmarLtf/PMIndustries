import Login from "./Components/Login page/login";
import Navbar from "./Components/NavBar/navBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginContext, GetUser } from "./Helper/context";
import { useCallback, useContext, useEffect, useState } from "react";
import Logout from "./Components/Logout_Header/logout";
import Bloquage from "./Components/Update_Bloquage/Interface";
import Users from "./Components//Form/Form";
import Demontage from "./Components//Update_demontage/Interface";
import Prep from "./Components//Update_QP_QR/Interface";
import Zinguage from "./Components//Update_Zinguage/Interface";
import Montage from "./Components//Update_Montage/Interface";
import Export from "./Components//Update_Export/Interface";
import Upload from "./Components//Upload_file/upload";
import Traceability from "./Components//Traceability Table/Interface";
import UserLogedIn from "./Helper/context";

function App() {
  const loggedIn = window.localStorage.getItem("loggedIn");
  var retrievedObject = localStorage.getItem("object");
  const userData = JSON.parse(retrievedObject);
  console.log(userData.name);
  console.log(userData.role);
  return (
    <BrowserRouter>
      <Logout state={loggedIn}></Logout>
      <Navbar state={loggedIn}></Navbar>
      <Switch>
        <Route path="/login">
          {loggedIn ? <Demontage></Demontage> : <Login></Login>}
        </Route>
        <Route path="/interface/upload">
          <Upload role={userData.role}></Upload>
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
      </Switch>
    </BrowserRouter>
  );
}

// }

export default App;
