import "./signin.css";
import React, { useState, useEffect } from "react";
import sanitization from "../sanitization";

async function validateSignIn(event, setError) {
  event.preventDefault();

  const username = document.getElementById("inputUsername").value;
  const password = document.getElementById("inputPassword").value;

  sanitization(username);
  sanitization(password);
  console.log(username);

  const response = await fetch("/backend/validate-signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const responseData = await response.json();
  if (responseData.success) {
    setError(false);
    console.log("Successfully entered");
  } else {
    console.log("Failed");
    setError(true);
  }
}

export default function SignIn() {
  const [error, setError] = useState(false);

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
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <form>
                    <div className="form-group">
                      <label htmlFor="inputUsername">Username</label>
                      <input
                        type="username"
                        className="form-control"
                        id="inputUsername"
                      ></input>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="inputPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                      ></input>
                      {error && (
                        <p className="error-msg mt-1">
                          The password you entered is incorrect.{" "}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-lg custom-btn btn-block mt-4"
                onClick={(event) => validateSignIn(event, setError)}
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
