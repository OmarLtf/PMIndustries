import "./table.css";
import Axios from "axios";
import { useState } from "react";

const Delete = (id) => {
  if (window.confirm("are us sure")) {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((res) => {
      console.log("hello ");
    });
  }
};

const Table = ({ data, column }) => {
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead className="thead">
          <tr>
            {column.map((item, index) => (
              <TableHeadItem item={item} />
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow item={item} column={column} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeadItem = ({ item }) => <th key={item}>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      return <td>{item[`${columnItem.value}`]}</td>;
    })}
    <td>
      <button
        className="delete"
        onClick={() => {
          Delete(item.id);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      <button className="update">
        <i className="fa-solid fa-unlock"></i>
      </button>
    </td>
  </tr>
);

export default Table;
