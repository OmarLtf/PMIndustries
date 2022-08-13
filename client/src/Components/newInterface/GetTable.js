import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "../table/Table";
import "./table.css";

function GetTable(props) {
  const [data, setData] = useState([]);

  const getUsers = () => {
    Axios.get("http://localhost:3001/data/new_inter").then((res) => {
      setData(res.data);
      console.log(res);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(props.input);

  const filter = (rows) => {
    return rows.filter(
      (rows) =>
        rows.OF.toString().toLowerCase().indexOf(props.input.OF) === 0 &&
        rows.Lot.toString().toLowerCase().indexOf(props.input.Lot) === 0
    );
  };

  const column = [
    { heading: "OF", value: "OF" },
    { heading: "Lot", value: "Lot" },
    { heading: "Produit", value: "Produit" },
    { heading: "Référence", value: "R_f_rence" },
    { heading: "Référence Sorea", value: "R_f_rence_Sorea" },
    { heading: "Date de commande", value: "Date_De_Commande" },
    { heading: "Qt Ddée", value: "Qt_Dd_e" },
    { heading: "Démontage", value: "D_montage" },
    { heading: "Montage", value: "Montage" },
    { heading: "Qt Rebut", value: "Qt_Rebut" },
    { heading: "Bloquage", value: "Bloquage" },
    { heading: "Zingueur", value: "Zingueur" },
    { heading: "Qt Exporté", value: "Qt_Export" },
    { heading: "Encours Atelier Brut", value: "Encours_Atelier_Brut" },
    { heading: "Encours Atelier Net", value: "Encours_Atelier_Net" },
    { heading: "Rest à Exporter", value: "Rest_Exporter" },
    { heading: "Taux de Rebut", value: "Taux_De_Rebut" },
  ];
  return <Table data={filter(data)} column={column} />;
}

export default GetTable;