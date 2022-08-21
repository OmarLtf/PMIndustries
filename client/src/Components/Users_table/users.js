import Form from "../Form/Form";
import Table from "../table/GetTable";
import "./users.css";

function User_table() {
  return (
    <div className="addUser">
      <Form className="formUsers"></Form>
      <Table className="tableUsers"></Table>
    </div>
  );
}

export default User_table;
