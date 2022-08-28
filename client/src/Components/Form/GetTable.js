import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "./users_table";

function GetTable(props) {
  const [data, setData] = useState([]);

  const getUsers = () => {
    Axios.get("http://localhost:3001/data").then((res) => {
      setData(res.data);
      console.log(res);
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
