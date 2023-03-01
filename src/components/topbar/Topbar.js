import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import { RiLoginCircleFill } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";

import "./Topbar.css";

const Topbar = () => {
  const { profile_id } = useParams();
  const [user, setUser] = useState([]);
  const current_ID = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(
        `http://localhost:80/platform/react_project/userProfile.php/${current_ID}`
      )
      .then((response) => {
        setUser(response.data);
      });


  }

  return (
    <div>
      <header>
        <div className="header-left">
          <div className="logo">
            <a href="/home">
              <img src={require("../images/BMW_logo_(gray).png")} alt="" />{" "}
            </a>
          </div>

          <div className="searchContainer">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search facebook"
              className="searchInput"
            />
          </div>
        </div>

        <div className="header-middle">
          <nav>
            <div className="icon-nav">
              <a href="/home" >
                <svg
                
                  viewBox="0 0 28 28"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq x5e5rjt"
                  fill="currentColor"
                  height="28"
                  width="28"
                >
                  <path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
                </svg>
              </a>
            </div>




            <div className="icon-nav">
            <a href="https://www.youtube.com/" target="_blank" title="Visit YouTube">
              <svg
                viewBox="0 0 28 28"
                className="x1lliihq x1k90msu x2h7rmj x1qfuztq x5e5rjt"
                fill="currentColor"
                height="28"
                width="28"
              >
                <path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.164 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.164 11.654C17.612 11.924 17.612 12.575 17.164 12.846M21.75 2.75 6.25 2.75C4.182 2.75 2.5 4.432 2.5 6.5L2.5 18C2.5 20.068 4.182 21.75 6.25 21.75L21.75 21.75C23.818 21.75 25.5 20.068 25.5 18L25.5 6.5C25.5 4.432 23.818 2.75 21.75 2.75"></path>
              </svg>
            </a>
          </div>




            <div className="icon-nav">
              <a href="/Allgroups" title="All Group">
                <svg
                  viewBox="0 0 28 28"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6"
                  fill="currentColor"
                  height="28"
                  width="28"
                >
                  <path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"></path>
                </svg>
              </a>
            </div>
            <div className="icon-nav">
              <a href="/Allusers" title="All Users">
                <FaUserAlt className="iconn" />
              </a>
            </div>
          </nav>
        </div>
        <div className="header-right">
          <div className="iconRight">
            <svg
              fill="currentColor"
              viewBox="0 0 44 44"
              width="1em"
              height="1em"
              className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 x1qx5ct2 xw4jnvo"
            >
              <circle cx="7" cy="7" r="6"></circle>
              <circle cx="22" cy="7" r="6"></circle>
              <circle cx="37" cy="7" r="6"></circle>
              <circle cx="7" cy="22" r="6"></circle>
              <circle cx="22" cy="22" r="6"></circle>
              <circle cx="37" cy="22" r="6"></circle>
              <circle cx="7" cy="37" r="6"></circle>
              <circle cx="22" cy="37" r="6"></circle>
              <circle cx="37" cy="37" r="6"></circle>
            </svg>
          </div>
          <div className="iconRight active">
            <BsMessenger />{" "}
          </div>
          <a href="/logout">
            <div className="iconRight">
              <RiLoginCircleFill  className="iconLogout"/>{" "}
            </div>
          </a>
          <a href={`/profile/${current_ID}`}>
            <div className="profile-img">
              {user.map((Oneuser) => {
                return (
                  <img src={require(`../images/${Oneuser.image}`)} alt="" />
                );
              })}
            </div>
          </a>
        </div>
      </header>
    </div>
  );
};

export default Topbar;

// <button className="toggle" onClick={() => setClick(!click)}>
// {click ? (
//   <i className="fa fa-times"></i>
// ) : (
//   <i className=" fa fa-bars"></i>
// )}
// </button>
