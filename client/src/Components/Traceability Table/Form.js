import "./Form.css";
import {
  useDownloadExcel,
  DownloadTableExcel,
} from "react-export-table-to-excel";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";

function Form() {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  const getUsers = () => {
    Axios.get("http://localhost:3001/tracData").then((res) => {
      setData(res.data);
      console.log(res);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const column = [
    { heading: "ID", value: "id" },
    { heading: "Matricule", value: "Matricule" },
    { heading: "User", value: "User" },
    { heading: "Produit", value: "Produit" },
    { heading: "Lot", value: "Lot" },
    { heading: "Of", value: "Of" },
    { heading: "Reference", value: "Reference" },
    { heading: "Table", value: "Table" },
    { heading: "Type", value: "Type" },
    { heading: "Commentaire", value: "Commentaire" },
    { heading: "Qte_Saisi", value: "Qte_Saisi" },
    { heading: "Date d'opération", value: "Date_doperation" },
  ];

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Tableau de tracabilité",
    sheet: "Tableau de tracabilité",
  });

  return (
    <div className="containor">
      <button onClick={onDownload} className="exportButton">
        {" "}
        Exporter fichier excel
      </button>

      <div className="table-wrapper">
        <table className="fl-table" ref={tableRef}>
          <thead className="thead">
            <tr>
              {column.map((item, index) => (
                <TableHeadItem item={item} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow item={item} column={column} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableHeadItem = ({ item }) => <th key={item}>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);
export default Form;
