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

  const fetchFoodLog = async () => {
    try {
      const response = await fetch("/backend/fetch-foodtable", {
        method: "GET",
      });

      const responseData = await response.json();
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

  useEffect(() => {
    fetchFoodLog();
  }, []);

  const [selectedOption, setSelectedOption] = useState(undefined);
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [inputPrice, changePrice] = useState(foodData[0]?.Price || 0);
  const [inputStock, changeStock] = useState(foodData[0]?.AmountInStock || 0);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);

    const selectedFood = foodData.find((food) => food.Name === e.target.value);
    if (selectedFood) {
      changePrice(selectedFood.Price);
      changeStock(selectedFood.AmountInStock);
      setName(selectedFood.Name);
      setBrand(selectedFood.Brand);
    }
  };

  const handlePrice = (e) => {
    changePrice(e.target.value);
  };

  const handleStock = (e) => {
    changeStock(e.target.value);
  };

  const updateFood = async (event) => {
    event.preventDefault();

    const price = document.getElementById("inputPrice").value;
    const amount = document.getElementById("inputStock").value;
    console.log("update price: ", inputPrice);
    console.log("update amount: ", inputStock);

    const response = await fetch("/update-foodtable", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Price: parseFloat(price),
        AmountInStock: parseInt(amount),
        Name: name,
        Brand: brand,
      }),
    });

    const responseData = await response.json();
    const messageElement = document.getElementById("success");

    if (responseData.success) {
      fetchFoodLog();
      console.log("Success!");
    } else {
      console.log("error updating table");
    }
  };

  return (
    <div className="Food">
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-9">
            <h1
              className="heading fw-bold mt-5 mb-3"
              style={{ color: "black", textAlign: "left" }}
            >
              Food Log
            </h1>
            <div className="text-start">
              <button
                type="button"
                className="btn btn-lg custom-btn btn-block mt-3 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Update
              </button>
              <i
                id="success"
                className="bi bi-check-circle ms-3"
                style={{ color: "black", fontSize: "16px" }}
              >
                {" "}
                Successfully updated!
              </i>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="mt-2" style={{ color: "black" }}>
                        Select the name & brand to update
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <select
                        className="form-select mb-3"
                        value={selectedOption}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Select Brand - Name
                        </option>
                        {foodData.map((option, index) => (
                          <option key={index} value={option.Name}>
                            {option.Brand} - {option.Name}
                          </option>
                        ))}
                      </select>
                      <span>
                        <p
                          className=" ms-1"
                          style={{
                            color: "black",
                            fontSize: "16px",
                            display: "flex",
                          }}
                        >
                          Price:{" "}
                          <input
                            id="inputPrice"
                            type="number"
                            step="any"
                            className="form-control ms-3"
                            value={inputPrice}
                            onChange={handlePrice}
                            min="0"
                          ></input>
                        </p>
                      </span>
                      <span>
                        <p
                          className=" ms-1"
                          style={{
                            color: "black",
                            fontSize: "16px",
                            display: "flex",
                          }}
                        >
                          Amount in Stock:{" "}
                          <input
                            id="inputStock"
                            type="integer"
                            step="any"
                            className="form-control ms-3"
                            value={inputStock}
                            onChange={handleStock}
                            min="0"
                          ></input>
                        </p>
                      </span>
                      <button
                        type="button"
                        className="btn btn-lg custom-btn btn-block mt-4"
                        data-bs-dismiss="modal"
                        onClick={(event) => updateFood(event)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DataTable columns={columns} data={foodData} pagination></DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
