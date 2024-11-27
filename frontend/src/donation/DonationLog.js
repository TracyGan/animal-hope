import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import "../sign-in/signin.css";
import moment from "moment";

const columns = [
  {
    name: "ID",
    selector: (row) => row.ID,
  },
  {
    name: "Name",
    selector: (row) => row.Name,
  },
  {
    name: "Email Address",
    selector: (row) => row.Email,
  },
  {
    name: "Date",
    selector: (row) => row.Date,
  },
  {
    name: "Amount",
    selector: (row) => row.Amount,
  },
];

function DonationLog() {
  const [donationData, showDonationLog] = useState([]);
  const [selectedOption, setSelectedOption] = useState("1");
  const [order, setOrder] = useState("DESC");

  const handleChange = (e) => {
    const newVal = e.target.value;
    setSelectedOption(e.target.value);
    switch (newVal) {
      case "1":
        setOrder("DESC");
        break;

      case "2":
        setOrder("DESC");
        break;

      case "3":
        setOrder("ASC");
        break;

      default:
        setOrder("DESC");
        break;
    }
  };

  const fetchDonationLog = async (selectedOption, order) => {
    if (selectedOption == "1") {
      selectedOption = "DonationDate";
    } else {
      selectedOption = "Amount";
    }

    const params = new URLSearchParams({
      selection: selectedOption,
      order: order || "",
    });

    const response = await fetch(
      `/backend/fetch-donationtable?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    responseData.data.forEach((element) => {
      element[1] = moment(element[1]).utc().format("DD/MM/YYYY");
    });
    const formatedResponse = responseData.data.map((item) => ({
      ID: item[0],
      Name: item[5],
      Email: item[6],
      Amount: item[2],
      Date: item[1],
    }));
    showDonationLog(formatedResponse);
  };

  useEffect(() => {
    fetchDonationLog(selectedOption, order);
  }, [selectedOption, setOrder]);

  return (
    <div className="DonationLog">
      <div className="container-fluid ms-4">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-9">
            <h1
              className="heading fw-bold mt-5"
              style={{ color: "black", textAlign: "left" }}
            >
              Donation log
            </h1>
            <p className="" style={{ color: "black", textAlign: "left" }}>
              Average donations per week:
            </p>

            <div className="col-4 ms-auto mb-1">
              <select
                className="form-select"
                id="filterSelect"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="1">Most Recent</option>
                <option value="2">Largest Donation</option>
                <option value="3">Smallest Donation</option>
              </select>
            </div>
            <DataTable
              columns={columns}
              data={donationData}
              pagination
            ></DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationLog;
