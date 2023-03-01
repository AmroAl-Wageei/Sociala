
import "./sidebar.css";

import { MdRssFeed,MdHelpOutline } from 'react-icons/md';
import {BsFillChatFill,BsPlayCircle,BsFillBookmarkFill,BsFillPersonFill} from 'react-icons/bs';
import { BiGroup,BiCalendarEvent } from 'react-icons/bi';
import { Link,NavLink } from "react-router-dom";
// import { BiGroup,BiCalendarEvent, BiFontSize } from 'react-icons/bi';
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import { IoMdSchool } from 'react-icons/io';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

  const current_ID = JSON.parse(localStorage.getItem('id'));
  const [groups , setGroups] = useState([]);

  const [myAcceptrdGroups , setMyAcceptrdGroups] = useState([]);


  useEffect(()=>{
    getGroups();
    getMyAcceptrdGroups();
} , [])

function getGroups(){
  axios.get(`http://localhost:80/platform/react_project/groups.php/`)
  .then(response => {
      setGroups(response.data);
  })
}

const getMyAcceptrdGroups = () => {

  axios.get(`http://localhost:80/platform/react_project/getMyGroupAcceptedStatus.php/${current_ID}`)
  .then(response => {
      setMyAcceptrdGroups(response.data);
  })

}
const handleLogOut = () => {
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('id');
  window.localStorage.removeItem('name');
  window.localStorage.removeItem('image');
  window.location.pathname = "/";
 
}

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <MdRssFeed className="sidebarIcon" />
            <NavLink to="/home" className="sidebarListItemText">Home</NavLink>
          </li>
          <li className="sidebarListItem">
          <BsFillPersonFill className="sidebarIcon" />
            <NavLink to={`/profile/${current_ID}`} className="sidebarListItemText">Profile</NavLink>
          </li>
          <li className="sidebarListItem">
            <BiGroup className="sidebarIcon" />
            <NavLink to="/Allgroups" className="sidebarListItemText">All Groups</NavLink>
          </li>
          <li className="sidebarListItem">
            <BiGroup className="sidebarIcon" />
            <NavLink to="/Allusers" className="sidebarListItemText">All Users</NavLink>
          </li>
          <li className="sidebarListItem">
            <BiGroup className="sidebarIcon" />
            <NavLink to="/logout" className="sidebarListItemText" onClick={handleLogOut}>Logout</NavLink>
          </li>   

          {/* <li className="sidebarListItem">
            <BsFillPersonFill className="sidebarIcon" />
            <span className="sidebarListItemText">Freinds</span>
          </li> */}

        </ul>
       
        <hr className="sidebarHr" style={{width : '150px'}} />
        <ul className="sidebarFriendList" >
          <h5 >My Groups</h5>
          { groups.filter(function(ele) {
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return (
                    <li className="sidebarFriend" key={index}>
                      <img className="sidebarFriendImg" src={require(`../images/${element.group_image}`)} alt="" />
                      <a href={`/groups/${element.group_id}/show`}>
                          <span className="sidebarFriendName">{element.group_name}</span>
                      </a>
                    </li>
           )})}

<hr className="sidebarHr" style={{width : '150px'}}  />

        <h5 >Groups</h5>

          { myAcceptrdGroups.filter(function(ele) {
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return (
                    <li className="sidebarFriend" key={index}>
                      <img className="sidebarFriendImg" src={require(`../images/${element.group_image}`)} alt="" />
                      <a href={`/groups/${element.group_id}/show`}>
                          <span className="sidebarFriendName">{element.group_name}</span>
                      </a>
                    </li>
           )})}
        </ul>
      </div>
    </div>
  );
}