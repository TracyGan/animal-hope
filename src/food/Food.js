import "./Food.css";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Brand",
    selector: (row) => row.brand,
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },
  {
    name: "Amount in Stock",
    selector: (row) => row.amount,
  },
  {
    name: "Other remarks",
    cell: (row) => {
      const threshold = 10;
      if (row.amount == 0) {
        return (
          <div>
            <i
              className="bi bi-exclamation-diamond-fill me-2"
              style={{ color: "red" }}
            >
              &nbsp; Ran out
            </i>
          </div>
        );
      }

      if (row.amount < threshold) {
        return (
          <div>
            <i
              className="bi bi-exclamation-diamond-fill me-2"
              style={{ color: "red" }}
            >
              &nbsp; Running out
            </i>
          </div>
        );
      }
    },
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    brand: "john.doe@example.com",
    price: 30,
    amount: 300,
  },
  {
    id: 2,
    name: "Jane Smith",
    brand: "john.doe@example.com",
    price: 30,
    amount: 2,
  },
  {
    id: 3,
    name: "Robert Brown",
    brand: "john.doe@example.com",
    price: 30,
    amount: 50,
  },
  {
    id: 4,
    name: "Emily White",
    brand: "john.doe@example.com",
    price: 30,
    amount: 100,
  },
  {
    id: 5,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 30,
    amount: 150,
  },
  {
    id: 6,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 30,
    amount: 150,
  },
  {
    id: 7,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 30,
    amount: 1,
  },
  {
    id: 8,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 30,
    amount: 0,
  },
  {
    id: 9,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 30,
    amount: 5,
  },
  {
    id: 10,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 30,
    amount: 150,
  },
  {
    id: 11,
    name: "Michael Green",
    brand: "john.doe@example.com",
    price: 20,
    amount: 150,
  },
];

function Food() {
  return (
    <div className="Food">
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-9">
            <h1
              className="heading fw-bold mt-5"
              style={{ color: "black", textAlign: "left" }}
            >
              Food Log
            </h1>
            <DataTable columns={columns} data={data} pagination></DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
