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
      { heading: "E.Brut", value: "Encours_Atelier_Brut" },
      { heading: "E.Net", value: "Encours_Atelier_Net" },
      { heading: "Date de commande", value: "Date_De_Commande" },
      { heading: "Qt Ddée", value: "Qt_Dd_e" },
      { heading: "Démontage", value: "D_montage" },
      { heading: "Qt Préparé", value: "Qt_prepare" },
      { heading: "R.pre", value: "Qt_Rebut" },
      { heading: "Zingueur", value: "Zingueur" },
      { heading: "Bloquage", value: "Bloquage" },
      { heading: "Montage", value: "Montage" },
      { heading: "R.Montage", value: "Rbut_montage" },
      { heading: "Qt Exporté", value: "Qt_Export" },
      { heading: "R.Export", value: "Rbut_export" },
      { heading: "Observation Prod", value: "Observation_Prod" },
      { heading: "Taux de Rebut", value: "Taux_de_Rebut" },
    ];
  return <Table data={props.data} column={column} />;
}

export default GetTable;
