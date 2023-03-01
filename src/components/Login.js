import React from "react";
import axios from "axios";
import { useState, useEffect, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const [input, setInputs] = useState([]);

  function sendData(e) {
    e.preventDefault();
    axios
      .post("http://localhost:80/platform/react_project/login.php/", input)
      .then(function (response) {
        if (response.data == "\r\n\r\ninvalid login") {
          document.getElementById("login-email-warining").style.display =
            "block";
          // document.getElementById('login-password-warining').style.display = 'block';
        } else {
          console.log(response.data);
          localStorage.setItem(
            "first_name",
            JSON.stringify(response.data.first_name)
          );
          localStorage.setItem(
            "last_name",
            JSON.stringify(response.data.last_name)
          );
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("email", JSON.stringify(response.data.email));
          window.location.assign("/home");
        }
      });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <div>
        <section
          className="background-radial-gradient overflow-hidden"
          style={{ height: "47.5rem" }}
        >
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                <img
                  src={require("./images/logo.png")}
                  alt=""
                  style={{ marginLeft: "-5rem", marginTop: "-11rem" }}
                />
                <h1
                  className="my-9 display-5 fw-bold ls-tight"
                  style={{
                    color: "hsl(218, 81%, 95%)",
                    marginLeft: "9rem",
                    marginTop: "-21rem",
                  }}
                >
                  Sociala <br />
                </h1>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                />
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                />
                <div className="card bg-glass" style={{ marginTop: "10rem" }}>
                  <div className="card-body px-4 py-5 px-md-5">
                    <span
                      id="login-email-warining"
                      style={{
                        display: "none",
                        color: "red",
                        fontSize: "15px",
                        textAlign: "center",
                      }}
                    >
                      Invalid login. Please try again.
                    </span>
                    <form onSubmit={sendData}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div style={{ color: "red", display: "none" }} id="error">
                        Invalid Login
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4 form-control"
                      >
                        Login
                      </button>
                      <span style={{ fontSize: "12px" }}>
                        Don't have an account{" "}
                        <Link to="/register">Sign up</Link>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
