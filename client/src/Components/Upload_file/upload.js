import React, { useState } from "react";
import "./upload.css";
import * as XLSX from "xlsx";
import GetTable from "./GetTable";
import Axios from "axios";
function Upload() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File

  // const handleFile = (e) => {
  //   let selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     let reader = new FileReader();
  //     reader.readAsArrayBuffer(selectedFile);
  //     reader.onload = (e) => {
  //       setExcelFileError(null);
  //       setExcelFile(e.target.result);
  //     };
  //   } else {
  //     console.log("plz select your file");
  //   }
  // };

  // // submit function
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("exel file");
  //   console.log(excelFile);
  //   if (excelFile !== null) {
  //     const workbook = XLSX.read(excelFile, { type: "buffer" });
  //     const worksheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[worksheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet);
  //     setExcelData(data);
  //     if (excelData) {

  //     console.log("exel data")
  //     console.log(excelData)
  //   } else {
  //     setExcelData(null);
  //   }
  // };

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
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log(excelData);
    Axios.delete("http://localhost:3001/deleteTable");

    Axios.post("http://localhost:3001/excelUpload", {
      excelData: excelData,
    });
  };

  return (
    <div className="interfaceContainer">
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
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: 5 + "px" }}>
              {excelFileError}
            </div>
          )}
          <button className="buttonUpload">Submit</button>
        </form>
        {/* {excelData ? <GetTable data={excelData} /> : <h1>No data</h1>} */}
      </div>
    </div>
  );
}

export default Upload;
