import "./signin.css";
import React, { useState, useEffect } from "react";

function SignIn() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
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
                  <span className="">{data} </span>
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

export default SignIn;
