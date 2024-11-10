import "./Donation.css";

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
];

function Donation() {
  return (
    <div className="Donation">
      <div className="container">
        <h3 className="fw-bold title">Donation log</h3>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => {
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donation;
