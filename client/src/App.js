import Login from "./Components/Login page/login";
import Interface from "./Components/NavBar/nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/interface">
          <Interface></Interface>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
