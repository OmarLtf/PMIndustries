import React, { useEffect, useState } from "react";
import "./upload.css";
import * as XLSX from "xlsx";
import Axios from "axios";
import { Redirect } from "react-router-dom";
function Upload(props) {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  const [excelData, setExcelData] = useState(null);
  const handleFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
        setExcelData(json);
        console.log(json.length);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.delete("http://localhost:3001/deleteTable");

    Axios.post("http://localhost:3001/excelUpload", {
      excelData: excelData,
    });

    var delayInMilliseconds = 300; //1 second

    setTimeout(function () {
      window.alert("Tableau importé avec succées");
    }, delayInMilliseconds);
    console.log(excelData);
  };

  if (props.role === "Consultant") {
    return <Redirect to="/demontage"></Redirect>;
  }
  return (
    <div className="interfaceContainer">
      <h1 className="title bloquage">Upload Page</h1>
      <div className="form">
        <form className="formInter" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5 className="title">Upload Excel file</h5>
          </label>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          <button className="buttonUpload">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
