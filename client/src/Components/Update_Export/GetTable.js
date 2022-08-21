import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "../table/Table";
import "./table.css";

function GetTable(props) {
  const column = [
    { heading: "OF", value: "OF" },
    { heading: "Lot", value: "Lot" },
    { heading: "Produit", value: "Produit" },
    { heading: "Référence", value: "R_f_rence" },
    { heading: "Référence Sorea", value: "R_f_rence_Sorea" },
    { heading: "Date de commande", value: "Date_De_Commande" },
    { heading: "Qt Ddée", value: "Qt_Dd_e" },
    { heading: "Démontage", value: "D_montage" },
    { heading: "Qt Préparé", value: "Qt_prepare" },
    { heading: "R.pre", value: "Qt_Rebut" },
    { heading: "Bloquage", value: "Bloquage" },
    { heading: "Zingueur", value: "Zingueur" },
    { heading: "Montage", value: "Montage" },
    { heading: "R.Montage", value: "Rebut_montage" },
    { heading: "Qt Exporté", value: "Qt_Export" },
    { heading: "R.Export", value: "Rbut_export" },
    { heading: "Encours Atelier Brut", value: "Encours_Atelier_Brut" },
    { heading: "Encours Atelier Net", value: "Encours_Atelier_Net" },
    { heading: "Rest à Exporter", value: "Rest_Exporter" },
    { heading: "Taux de Rebut", value: "Taux_De_Rebut" },
  ];
  return <Table data={props.data} column={column} />;
}

export default GetTable;
