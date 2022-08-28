import "./table.css";

const Table = ({ data, column }) => {
  return (
    <div className="table-wrapper">
      <table className="fl-table">
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
  );
};

const TableHeadItem = ({ item }) => <th key={item}>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
