import "./signin.css";
import React, { useState } from "react";

function SignIn() {
  return (
    <div className="SignIn">
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <h1 className="mt-5 mb-5 fw-bold title"> AnimalHope</h1>
            <div className="card">
              <div className="row">
                <div className="col">
                  <h2 className="fw-bold">Sign In</h2>
                  <span id="dbStatus"></span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputUsername">Username</label>
                      <input
                        type="username"
                        className="form-control"
                        id="exampleInputUsername"
                      ></input>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      ></input>
                      <p className="error-msg mt-1">
                        The password you entered is incorrect.{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-lg custom-btn btn-block mt-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
  const statusElem = document.getElementById("dbStatus");

  const response = await fetch("/check-db-connection", {
    method: "GET",
  });

  // Display the statusElem's text in the placeholder.
  statusElem.style.display = "inline";

  response
    .text()
    .then((text) => {
      statusElem.textContent = text;
    })
    .catch((error) => {
      statusElem.textContent = "connection timed out"; // Adjust error handling if required.
    });
}

window.onload = function () {
  checkDbConnection();
};

export default SignIn;