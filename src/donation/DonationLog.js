import "./Donation.css";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    maxWidth: "2px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Email Address",
    selector: (row) => row.email,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
    maxWidth: "2px",
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "2024-10-09",
    amount: 300,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2024-10-12",
    amount: 20,
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    date: " 2024-11-10",
    amount: 50,
  },
  {
    id: 4,
    name: "Emily White",
    email: "emily.white@example.com",
    date: " 2024-11-11",
    amount: 100,
  },
  {
    id: 5,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
  {
    id: 6,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
  {
    id: 7,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
  {
    id: 8,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
  {
    id: 9,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
  {
    id: 10,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
  {
    id: 11,
    name: "Michael Green",
    email: "michael.green@example.com",
    date: " 2024-01-20",
    amount: 150,
  },
];

function DonationLog() {
  return (
    <div className="DonationLog">
      <div className="container-fluid ms-4">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-9">
            <h1 className="heading fw-bold mt-5">Donation log</h1>
            <DataTable columns={columns} data={data} pagination></DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationLog;