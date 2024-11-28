import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import moment from "moment";
import sanitization from "../sanitization";

const columns = [
  {
    name: "ID",
    selector: (row) => row.ID,
  },
  {
    name: "Animal ID",
    selector: (row) => row.Animal_ID,
  },
  {
    name: "Username",
    selector: (row) => row.PaidStaff_Username,
  },
  {
    name: "Food Name",
    selector: (row) => row.Food_Name,
  },
  {
    name: "Food Brand",
    selector: (row) => row.Food_Brand,
  },
  {
    name: "Date and Time Fed",
    selector: (row) => row.DateTime,
  },
];

function Feed() {
  const [feedData, showFeedData] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(undefined);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [inputChange, setInputChange] = useState(undefined);
  const [featureInput, setFeatureInput] = useState([]);
  const [inputChangeOthers, setInputChangeOthers] = useState(null);

  const handleFeed = (e) => {
    setSelectedFeed(e.target.value);
  };

  const handleChange = (e) => {
    const change = e.target.value;
    setSelectedOption(change);

    for (let i = 0; i < feedData.length; i++) {
      if (feedData[i]["ID"] == parseInt(selectedFeed)) {
        if (change == "DateTime") {
          setInputChange(feedData[i][change]);
        } else {
          setInputChangeOthers(feedData[i][change]);
        }
      }
    }
    fetchFeatures(change);
  };

  const handleInput = (e) => {
    setInputChange(e.target.value);
  };

  const handleInputOthers = (e) => {
    setInputChangeOthers(e.target.value);
  };

  const clearData = () => {
    setSelectedFeed(undefined);
    setSelectedOption(undefined);
    setInputChange(undefined);
  };

  const fetchFeatures = async (val, table) => {
    const params = new URLSearchParams({
      selection: val,
      table: table,
    });
    if (val != "DateTime") {
      const response = await fetch(
        `/backend/fetch-featuresFeed?${params.toString()}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      setFeatureInput(responseData.data);
    }
  };

  const updateChanges = async (e) => {
    e.preventDefault();
    let formattedValue = inputChange;
    sanitization(formattedValue);
    const response = await fetch("/backend/update-feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedFeed,
        feature: selectedOption,
        value: formattedValue || inputChangeOthers,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchFeedLog();
      alert("Successfully updated Feed table!");
      console.log("Success!");
    } else {
      alert("error updating Feed table");
    }
    clearData();
  };

  const fetchFeedLog = async () => {
    try {
      const response = await fetch("/backend/fetch-feedtable", {
        method: "GET",
      });

      const responseData = await response.json();
      responseData.data.forEach((element) => {
        element[5] = moment(element[5]).format("YYYY/MM/DD HH:mm:ss");
      });
      const formatedResponse = responseData.data.map((item) => ({
        ID: item[0],
        Animal_ID: item[1],
        PaidStaff_Username: item[2],
        Food_Brand: item[3],
        Food_Name: item[4],
        DateTime: item[5],
      }));

      showFeedData(formatedResponse);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFeedLog();
    switch (selectedOption) {
      case "Animal_ID":
        fetchFeatures("ID", "Animal");
        break;
      case "PaidStaff_Username":
        fetchFeatures("Username", "PaidStaff");
        break;
      case "Food_Name":
        fetchFeatures("Name", "Food");
        break;
      case "Food_Brand":
        fetchFeatures("Brand", "Food");
        break;
      case "DateTime":
        fetchFeatures(selectedOption, "");
        break;
    }
  }, [selectedOption]);

  return (
    <div className="Feed">
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <h1
              className="heading fw-bold mt-5 mb-3"
              style={{ color: "black", textAlign: "left" }}
            >
              Feed Log
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
            </div>
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
                      Updating
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
                      value={selectedFeed}
                      defaultValue=""
                      onChange={handleFeed}
                    >
                      <option value="" disabled>
                        Select Feed ID to update
                      </option>
                      {feedData.map((option, index) => (
                        <option key={index} value={option.ID}>
                          {option.ID}
                        </option>
                      ))}
                    </select>
                    {selectedFeed && (
                      <select
                        className="form-select mb-3"
                        value={selectedOption}
                        defaultValue=""
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select feature to update
                        </option>
                        <option value="Animal_ID">Animal ID</option>
                        <option value="PaidStaff_Username">Username</option>
                        <option value="Food_Name">Food Name</option>
                        <option value="Food_Brand">Food Brand</option>
                        <option value="DateTime">Date and Time Fed</option>
                      </select>
                    )}
                    {selectedOption == "DateTime" && (
                      <input
                        id="inputPrice"
                        className="form-control "
                        value={inputChange}
                        onChange={handleInput}
                      ></input>
                    )}

                    {selectedOption && selectedOption != "DateTime" ? (
                      featureInput.length > 0 ? (
                        <select
                          className="form-select mb-3"
                          value={inputChangeOthers}
                          onChange={handleInputOthers}
                        >
                          {featureInput.map((option, index) => {
                            return (
                              <option key={index} value={option[0]}>
                                {option[0]}
                              </option>
                            );
                          })}
                          <option></option>
                        </select>
                      ) : (
                        <h5 style={{ color: "black" }}>
                          {" "}
                          Loading options ...{" "}
                        </h5>
                      )
                    ) : null}
                    {selectedOption && (
                      <button
                        type="button"
                        className="btn btn-lg custom-btn btn-block mt-4"
                        data-bs-dismiss="modal"
                        onClick={(event) => updateChanges(event)}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DataTable columns={columns} data={feedData} pagination></DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
