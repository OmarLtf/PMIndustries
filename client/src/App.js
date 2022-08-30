import Interface from "./Components/NavBar/nav";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/interface">
        <Interface></Interface>
      </Route>
    </BrowserRouter>
  );
}

export default App;
