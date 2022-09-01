import Login from "./Components/Login page/login";
import Interface from "./Components/NavBar/nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginContext, GetUser } from "./Helper/context";
import { useState } from "react";
import Logout from "./Components/Logout_Header/logout";

function App() {
  const [logedIn, setLogedIn] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ logedIn, setLogedIn }}>
        <GetUser.Provider value={{ userData, setUserData }}>
          <Logout></Logout>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/interface">
              <Interface state={logedIn}></Interface>
            </Route>
          </Switch>
        </GetUser.Provider>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
