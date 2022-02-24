import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import './App.css'
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const emailFormatter = (data, row) => {
    return <span>Email = {data}</span>;
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: [1, 3],
    clickToEdit: true,
  };
  const columns = [
    {
      dataField: "email",
      text: "Email",
      sort: true,
      formatter: emailFormatter,
      filter: textFilter({placeholder: "Введите Почту"}),
    },
    {
      dataField: "postId",
      text: "ID",
      filter: textFilter({placeholder: "Введите ID"}),

      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter numeric value",
          };
        }
        return true;
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
      filter: textFilter({placeholder: "Введите имя"}),
    }, 
  ];
  return (
    <div className="App">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        cellEdit={ cellEditFactory({ mode: 'click' }) }
        selectRow={selectRow}
        filter={filterFactory()}
      />
    </div>
  );
}

export default App;
