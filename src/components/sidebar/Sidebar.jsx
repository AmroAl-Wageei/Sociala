// import "./sidebar.css";
// import { MdRssFeed,MdHelpOutline } from 'react-icons/md';
// import {BsFillChatFill,BsPlayCircle,BsFillBookmarkFill} from 'react-icons/bs';
// import { BiGroup,BiCalendarEvent } from 'react-icons/bi';
// import { IoMdSchool } from 'react-icons/io';
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="sidebarWrapper">
//         <ul className="sidebarList">
//           <li className="sidebarListItem">
//           <img src="./AmroSalah.png" alt=""  className="imageSide"/>
//            <span className="sidebarListItemText">Amro Salah</span>
//           </li>
//           <li className="sidebarListItem">
//             <MdRssFeed className="sidebarIcon" />
//             <span className="sidebarListItemText">Feed</span>
//           </li>
//           <li className="sidebarListItem">
//             <BsFillChatFill className="sidebarIcon" />
//             <span className="sidebarListItemText">Chats</span>
//           </li>
//           <li className="sidebarListItem">
//             <BsPlayCircle className="sidebarIcon" />
//             <span className="sidebarListItemText">Videos</span>
//           </li>
//           <li className="sidebarListItem">
//             <BiGroup className="sidebarIcon" />
//             <span className="sidebarListItemText">Groups</span>
//           </li>
//           <li className="sidebarListItem">
//             <BsFillBookmarkFill className="sidebarIcon" />
//             <span className="sidebarListItemText">Bookmarks</span>
//           </li>
//           <li className="sidebarListItem">
//             <MdHelpOutline className="sidebarIcon" />
//             <span className="sidebarListItemText">Questions</span>
//           </li>
//           <li className="sidebarListItem">
//             <BiCalendarEvent className="sidebarIcon" />
//             <span className="sidebarListItemText">Events</span>
//           </li>
//           <li className="sidebarListItem">
//             <IoMdSchool className="sidebarIcon" />
//             <span className="sidebarListItemText">Courses</span>
//           </li>
//         </ul>
//         <button className="sidebarButton">Show More</button>
//         <hr className="sidebarHr" />
//         <h3> All Friends </h3>
//         <br />
//         <ul className="sidebarFriendList">
//           {Users.map((u) => (
//             <CloseFriend key={u.id} user={u} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }










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
       
        <hr className="sidebarHr" />
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

<hr className="sidebarHr" />

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