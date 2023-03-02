import React from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Rightbar({ profile }) {
  const { profile_id } = useParams();

  const current_Fname = JSON.parse(localStorage.getItem("first_name"));
  const current_Lname = JSON.parse(localStorage.getItem("last_name"));
  const current_ID = JSON.parse(localStorage.getItem("id"));
  const current_Email = JSON.parse(localStorage.getItem("email"));

  const [inputs, setInputs] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [friendRequests, setFriendReq] = useState([]);

  useEffect(() => {
    getUsers();
    getUser();
    getFriendsRequests();
  }, []);

  function getUsers() {
    axios
      .get(
        `http://localhost:80/platform/react_project/getAllFriendsUser.php/${profile_id}`
      )
      .then((response) => {
        setUsers(response.data);
      });
  }

  function getUser() {
    axios
      .get(
        `http://localhost:80/platform/react_project/userProfile.php/${profile_id}`
      )
      .then((response) => {
        setUser(response.data);
      });
  }

  const getFriendsRequests = () => {
    axios
      .get(
        `http://localhost:80/platform/react_project/profileShowFriendRequests.php/${current_ID}`
      )
      .then((response) => {
        console.log(response.data);
        setFriendReq(response.data);
      });
  };

  const deleteRequest = (userId) => {
    let inputs = { user_id: current_ID, friend_id: userId };
    axios
      .post(
        `http://localhost:80/platform/react_project/profileShowFriendRequests.php/`,
        inputs
      )
      .then((response) => {
        // console.log('delete')
        window.location.assign(`/profile/${profile_id}`);
      });
  };

  const acceptRequest = (userId) => {
    let inputs = { user_id: current_ID, friend_id: userId };
    axios
      .put(
        `http://localhost:80/platform/react_project/friends.php/edit`,
        inputs
      )
      .then((respone) => {
        window.location.assign(`/profile/${profile_id}`);
      });
  };

  var i = 1;

  const ProfileRightbar = () => {
    return (
      <div>
        <div style={{display : "flex" , justifyContent : 'space-between'}}>
          <div> 
              <h3 className="rightbarTitle">   
                User information{" "}
              </h3>
          </div>
          <div> 
              {profile_id == current_ID
              ?
              <a href={`/profile/${profile_id}/edit`}>
                <button style={{width : '100px' , marginRight : '20px' , marginBottom : '5px'}} className="EditProfilee">Edit</button>
              </a>
              : null}
          </div> 
          </div>
        <div className="rightbarInfo">
          {user.map((user) => {
            return (
              <div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Email:</span>
                  <span className="rightbarInfoValue">{user.email}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City:</span>
                  <span className="rightbarInfoValue">Aqaba</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Phone:</span>
                  <span className="rightbarInfoValue">{user.phone}</span>
                </div>
              </div>
            );
          })}
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h3 className="rightbarTitle">User friends</h3>
        <div
          className="rightbarFollowings"
          style={{ display: "grid", gridTemplateColumns: "repeat(3 , 1fr)" }}
        >
          {users.map((friend) => {
            if (
              i < 6 &&
              friend["status"] === "accepted" &&
              friend["user_id"] != profile_id
            ) {
              return (
                <a href={`/profile/${friend.user_id}`}>
                  <div className="rightbarFollowing">
                    <img
                      src={require(`../images/${friend.image}`)}
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingname">
                      {friend.first_name}
                    </span>
                  </div>
                </a>
              );
            }
          })}
        </div>
        {profile_id == current_ID ? (
          <div className="rightbarWrapper">
            <h4 className="rightbarTitle">
              Friend Requests ({friendRequests.length})
            </h4>
            <ul className="rightbarFriendList">
              {friendRequests.map((element, index) => {
                return (
                  <li className="sidebarFriend" key={index}>
                    <img
                      className="sidebarFriendImg"
                      src={require(`../images/${element.image}`)}
                      alt=""
                    />
                    <span className="sidebarFriendName">
                      {element.first_name} {element.last_name}
                    </span>
                    <Link>
                      <Button
                        onClick={() => {
                          acceptRequest(element.user_id);
                        }}
                        className="BtnFriendRequestAccept"
                      >
                        Accept
                      </Button>
                    </Link>
                    <Link>
                      <Button
                        onClick={() => {
                          deleteRequest(element.user_id);
                        }}
                        className="BtnFriendRequestDelete"
                      >
                        Delete
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          className="rightbarFollowings"
          style={{ display: "grid", gridTemplateColumns: "repeat(3 , 1fr)" }}
        ></div>
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{<ProfileRightbar />}</div>
    </div>
  );
}
