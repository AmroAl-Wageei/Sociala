import React from "react";
import axios from "axios";
import { useState, useEffect, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Register() {
  const navigate = useNavigate();

  const [input, setInputs] = useState([]);

  function sendData(e) {
    e.preventDefault();
    axios
      .post("http://localhost:80/platform/react_project/register.php/", input)
      .then(function (response) {console.log(response)
        if (response.data == "\r\n\r\nYour Email is Already Exist") {
          document.getElementById("email-repeat").style.display = "block";
        } else {
        console.log(response.data)
          localStorage.setItem("first_name",JSON.stringify(response.data.first_name));
          localStorage.setItem("last_name",JSON.stringify(response.data.last_name));
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("email", JSON.stringify(response.data.email));
          window.location.assign("/home")
        }
      })
      
  }

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "first_name") {
      if (/\d/.test(value)) {
        document.getElementById("username-warining").style.display = "block";
        document.getElementById("username-accept").style.display = "none";
      } else if (value.match(format) || value.length <= 0) {
        document.getElementById("username-warining").style.display = "block";
        document.getElementById("username-accept").style.display = "none";
      } else {
        document.getElementById("username-accept").style.display = "block";
        document.getElementById("username-warining").style.display = "none";
        setInputs({ ...input, [name]: value });
      }
    }

    if (name == "last_name") {
      if (/\d/.test(value)) {
        document.getElementById("last-warining").style.display = "block";
        document.getElementById("last-accept").style.display = "none";
      } else if (value.match(format) || value.length <= 0) {
        document.getElementById("last-warining").style.display = "block";
        document.getElementById("last-accept").style.display = "none";
      } else {
        document.getElementById("last-accept").style.display = "block";
        document.getElementById("last-warining").style.display = "none";
        setInputs({ ...input, [name]: value });
      }
    }
  };

  const handleEmail = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.match(/\w+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/)) {
      document.getElementById("warning").style.display = "none";
      setInputs({ ...input, [name]: value });
    } else {
      document.getElementById("warning").style.display = "block";
    }
  };
  const handlePass = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length >= 8 && value.match(passw) && value.match(format)) {
      document.getElementById("password-warining").style.display = "none";
      document.getElementById("password-accept").style.display = "block";
    } else {
      document.getElementById("password-warining").style.display = "block";
      document.getElementById("password-accept").style.display = "none";
    }
  };
  const handleConfirmPass = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value == document.getElementById("password").value) {
      document.getElementById("repassword-warining").style.display = "none";
      document.getElementById("repassword-accept").style.display = "block";
      if (value == document.getElementById("password").value) {
        setInputs({ ...input, [name]: value });
      }
    } else {
      document.getElementById("repassword-warining").style.display = "block";
      document.getElementById("repassword-accept").style.display = "none";
    }
  };

  return (
    <div>
      <div>
        <section className="background-radial-gradient overflow-hidden">
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                <img
                  src={require("./images/logo.png")}
                  alt=""
                  style={{ marginLeft: "-5rem", marginTop: "-19rem" }}
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
                {/* <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
                            
                            <p className="mb-4 opacity-70" style={{color: 'hsl(218, 81%, 85%)'}}>
                            The only place where you can view local pre-owned vehicles alongside our trusted car reviews & ratings.
                            </p> */}
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
                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form onSubmit={sendData}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              onChange={handleChange}
                              name="first_name"
                              className="form-control"
                            />
                          </div>
                          <div
                            id="username-warining"
                            style={{
                              display: "none",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            Please don't use numbers or Char. And don't let it
                            empty.
                          </div>
                          <div
                            id="username-accept"
                            style={{
                              display: "none",
                              color: "green",
                              fontSize: "15px",
                            }}
                          >
                            Username is okay.
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example2"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              onChange={handleChange}
                              name="last_name"
                              className="form-control"
                            />
                            <div
                              id="last-warining"
                              style={{
                                display: "none",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              Please don't use numbers or Char. And don't let it
                              empty.
                            </div>
                            <div
                              id="last-accept"
                              style={{
                                display: "none",
                                color: "green",
                                fontSize: "15px",
                              }}
                            >
                              Username is okay.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          onChange={handleEmail}
                          name="email"
                          className="form-control"
                        />
                        <p
                          id="warning"
                          style={{ color: "red", display: "none" }}
                        >
                          Invalid Email
                        </p>
                        <div
                          id="email-repeat"
                          style={{ color: "red", display: "none" }}
                        >
                          Your email is repeated.Please use another one.
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          onBlur={handlePass}
                          className="form-control"
                        />
                        <div
                          id="password-warining"
                          style={{
                            display: "none",
                            color: "red",
                            fontSize: "15px",
                          }}
                        >
                          Please use capital and small letters, numbers and
                          special Char in your password.
                        </div>
                        <div
                          id="password-accept"
                          style={{
                            display: "none",
                            color: "green",
                            fontSize: "15px",
                          }}
                        >
                          Password is okay.
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          onBlur={handleConfirmPass}
                          name="password"
                          className="form-control"
                        />
                        <div
                          id="repassword-warining"
                          style={{
                            display: "none",
                            color: "red",
                            fontSize: "15px",
                          }}
                        >
                          Your password does not match.
                        </div>
                        <div
                          id="repassword-accept"
                          style={{
                            display: "none",
                            color: "green",
                            fontSize: "15px",
                          }}
                        >
                          Password Matched.
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4 form-control"
                      >
                        Sign up
                      </button>
                      <div>
                        <div style={{ fontSize: "12px" }}>
                          Already have an account.{" "}
                          <Link to="/">Login!</Link>
                        </div>
                      </div>
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

export default Register;
