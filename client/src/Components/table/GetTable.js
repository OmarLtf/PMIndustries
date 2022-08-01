import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "./Table";

function GetTable() {
  const [data, setData] = useState([]);

  const getUsers = () => {
    Axios.get("http://localhost:3001/data").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const column = [
    { heading: "Name", value: "userName" },
    { heading: "Matricule", value: "matricule" },
    { heading: "Role", value: "role" },
    { heading: "Password", value: "password" },
  ];
  return <Table data={data} column={column} />;
}

export default GetTable;
