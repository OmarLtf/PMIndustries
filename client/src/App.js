import Form from "./Components/Form/Form";
import Navbar from "./Components/NavBar/nav";
import "./index.css";
import GetTable from "./Components/table/GetTable";

function App() {
  return (
    <div>
      <div className="addUser">
        <Navbar />
        <div></div>
        <Form />
      </div>
      <GetTable />
    </div>
  );
}

export default App;
