import "./Food.css";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";

const columns = [
  {
    name: "Name",
    selector: (row) => row.Name,
  },
  {
    name: "Brand",
    selector: (row) => row.Brand,
  },
  {
    name: "Price",
    selector: (row) => row.Price,
  },
  {
    name: "Amount in Stock",
    selector: (row) => row.AmountInStock,
  },
  {
    name: "Other remarks",
    cell: (row) => {
      const threshold = 10;
      if (row.AmountInStock == 0) {
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

      if (row.AmountInStock < threshold) {
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

function Food() {
  const [foodData, showFoodLog] = useState([]);

  useEffect(() => {
    console.log("in use effect");
    const fetchFoodLog = async () => {
      try {
        const response = await fetch("/backend/fetch-foodtable", {
          method: "GET",
        });

        const responseData = await response.json();
        console.log("response data: ", responseData.data);

        const formatedResponse = responseData.data.map((item) => ({
          Name: item[1],
          Brand: item[0],
          Price: item[3],
          AmountInStock: item[2],
        }));
        showFoodLog(formatedResponse);
      } catch (e) {
        console.error(e);
      }
    };

    fetchFoodLog();
  }, []);

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
            <DataTable columns={columns} data={foodData} pagination></DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
