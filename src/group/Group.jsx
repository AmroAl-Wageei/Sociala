import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feedGroups/Feed";
import Rightbargroup from "../components/rightbargroup/Rightbargroup";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  useParams} from "react-router-dom";
import "./group.css";

export default function Group() {

  const {id} =useParams();
  const current_ID = JSON.parse(localStorage.getItem('id'));





  const [user , setUser] = useState([]);
  const [groups , setGroups] = useState([]);
  const [allGroups , setDataGroups] = useState([]);
  const [usersGroups , setUserGroups] = useState([]);
  const [pendingRequestGroups , setPendingRequestGroups] = useState([]);

  const [myAcceptedGroups , setMyAcceptrdGroups] = useState([]);


  const [pendingMembers,setPendingMembers] = useState([]);
  const [acceptedMembers,setAcceptedMembers] = useState([]);


  useEffect(()=>{
    getUser();
    getDataGroups();
    getUsersGroup();
    getPendingRequest();
    getMyAcceptrdGroups();
    getGroups();
    getPendingMempers();
    getAcceptedMempers();

  } , [])


  function getUser(){
    axios.get(`http://localhost:80/platform/react_project/userProfile.php/${current_ID}`)
    .then(response => {
        setUser(response.data);
    })
}

const getMyAcceptrdGroups = () => {

  axios.get(`http://localhost:80/platform/react_project/getMyGroupAcceptedStatus.php/${current_ID}`)
  .then(response => {
      let myAcceptedGroups = response.data.map((ele)=>{
        return ele.group_id
    })
      setMyAcceptrdGroups(myAcceptedGroups);
  })

}
const getDataGroups = () => {

  axios.get(`http://localhost:80/platform/react_project/getDataGroups.php/${id}`)
  .then(response => {
      setGroups(response.data);
  })
}

const getUsersGroup = () => {

  axios.get(`http://localhost:80/platform/react_project/getUsersGroup.php/${id}`)
  .then(response => {
      setUserGroups(response.data);
  })

}

const getPendingRequest = () => {
  axios.get(`http://localhost:80/platform/react_project/getPendingRequestForGroup.php/${id}`)
  .then((respone)=>{
    
      setPendingRequestGroups(respone.data);
      // setPendingMempers(respone.data)
  })
}

// لحذف عضو من الجروب
const deleteFromGroup = (userId) => {

  let inputs = {user_id:userId , group_id:id};
  axios.put(`http://localhost:80/platform/react_project/deleteRequestForGroup.php`,inputs)
  .then((respone)=>{
      getDataGroups();
      getUsersGroup();
      getPendingRequest();
      
  })

}

// لحذف طلب الانظمام لل الجروب
const deleteRequest = (userId) => {

  let inputs = {user_id:userId , group_id:id};
  axios.put(`http://localhost:80/platform/react_project/deleteRequestForGroup.php`,inputs)
  .then((respone)=>{
      getDataGroups();
      getUsersGroup();
      getPendingRequest();
      
  })

}
//  لقبول طلب الانظمام لل الجروب
const acceptRequest = (userId) => {

  let inputs = {user_id:userId , group_id:id};
  axios.put(`http://localhost:80/platform/react_project/membersGroup.php`,inputs)
  .then((respone)=>{
      getDataGroups();
      getUsersGroup();
      getPendingRequest();
      
  })
}

// /////////////////////////////////
// لعرض كل الجروبات في الموقع

function getGroups(){
  axios.get(`http://localhost:80/platform/react_project/groups.php/`)
  .then(response => {
      setDataGroups(response.data);
      
  })
}


// لاضافة عضو لجروب معين
const AddToGroup = (groupId) => {
  let inputs = {user_id:current_ID , group_id:groupId};
  axios.post(`http://localhost:80/platform/react_project/membersGroup.php/save`,inputs)
  .then((respone)=>{
      getPendingMempers();
      
            // getFriendsRequest();
  })
}
     //للجروبات pending لعرض كل طلبات المستخدم اللي حالتهم 
    const getPendingMempers = () => {

        axios.get(`http://localhost:80/platform/react_project/getPendingMember.php/${current_ID}`)
        .then((respone)=>{
            let pendingMembers = respone.data.map((ele)=>{
                return ele.group_id
            })
            setPendingMembers(pendingMembers);
            // setPendingMempers(respone.data)
        })
    }

         //للجروبات accepted لعرض كل طلبات المستخدم اللي حالتهم 
         const getAcceptedMempers = () => {

          axios.get(`http://localhost:80/platform/react_project/getAcceptedMember.php/${current_ID}`)
          .then((respone)=>{
              let acceptedMembers = respone.data.map((ele)=>{
                  return ele.group_id
              })
              setAcceptedMembers(acceptedMembers);
              // setPendingMempers(respone.data)
          })
      }

  // لحذب طلب الاضافة 
    const removeRequest = (GroupId) => {
      let inputs = {user_id:current_ID , group_id:GroupId};
      axios.put(`http://localhost:80/platform/react_project/getPendingMember.php/edit`,inputs)
      .then((respone)=>{
          getGroups();
          getPendingMempers();
      })

    }

    // delete group

    const  deleteGroup = (id) => {
      axios.delete(`http://localhost:80/react_project/back_end/groups.php/${id}`).then(function(response){
        window.location.assign('/')
      })
    }





// ///////////////////////////////////////
let flag = false;
  return (
    <>
    {groups.map((groups,index)=>{

  return <div key={index}>


{myAcceptedGroups.map((ele)=>{
                    if (ele == id) {
                      flag=true;
                    }
                })}   
                
                   <Topbar />
      <div className="groupContainer">
        <Sidebar />
        <div className="groupRight">
          <div className="groupRightTop">
            <div className="groupCover">
              <img
                className="groupCoverImg"
                src={groups && groups.group_image ?require(`../components/images/${groups.group_image}`) : "assets/ad.png"}

                alt="cvccv"
              />
            
            </div>
            <div className="groupInfo">
            <h4 className="groupInfoName"> {groups.group_name}</h4>
            {(() => {
              if (!(groups.user_id == current_ID)){
                            if (pendingMembers.includes(groups.group_id) || acceptedMembers.includes(groups.group_id) ){
                                if(pendingMembers.includes(groups.group_id)){
                                  return ( 
                                    <Link>
                                        <Button variant="primary" className="groupInfoDesc" onClick={()=>removeRequest(groups.group_id)}>Remove Request</Button>
                                    </Link>
                              )

                                }
                                if(acceptedMembers.includes(groups.group_id)){
                                    return (

                                        <Link to={`/groups/${groups.group_id}/show`}>
                                            <Button variant="danger" className="groupInfoDesc" onClick={()=>removeRequest(groups.group_id)}>Leave Group</Button>
                                        </Link>


                                    
                                    )

                                }
                              
                             
                            }else{
                              return ( 
                  
                                <Link>
                                    <Button className="groupInfoDesc" variant="success" onClick={()=>AddToGroup(groups.group_id)}>Join Group</Button>
                                </Link>
                            
                              )
                          }}
                            
                          
              
            })()}
            {/* <Button className="groupInfoDesc" variant="success">Join Group</Button>   */}
            </div>
          </div>
          <div className="groupRightBottom">


            {/*  */}
          {/* {(() => {
                  if (myAcceptedGroups.includes(id)){
                  
                    
                    <Feed group_id={id} admin_group={groups.user_id}/> 

                    
                  }else{
                    return ( 
                      <div className="feed">
                      <div className="feedWrapper">
                
                      </div> 
                    </div> 
                    )
                }
              
            })()} */}
              

            {/*  */}
          {flag || groups.user_id === current_ID ? 
          <Feed group_id={id} admin_group={groups.user_id} user={user}/> 
          :   
          <div className="feed">
            <div className="feedWrapper">
      
            </div> 
          </div> 
          }
        
            <div className="rightbar">
                <div className="rightbarWrapper">
                {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
                  <h4 className="rightbarTitle">Admin</h4>
                  <ul className="rightbarFriendList">

                            <li className="sidebarFriend">

                                      <img className="sidebarFriendImg" src={groups && groups.image ? require(`../components/images/${groups.image}`) : "https://www.example.com/example.png"} alt="vcc" />

                              
                              <span className="sidebarFriendName">{groups.name}</span>
                            </li>
                        




                  </ul>
              </div>
            { groups.user_id === current_ID ? <div className="rightbarWrapper">
                {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
                  <h4 className="rightbarTitle">Request Members ({pendingRequestGroups.length})</h4>
                  <ul className="rightbarFriendList">

                  { pendingRequestGroups.map((element,index) => {
                          return (
                            <li className="sidebarFriend" key={index}>
                              <img className="sidebarFriendImg" src={require(`../components/images/${element.image}`)} alt="" />
                              <span className="sidebarFriendName">{element.name}</span>
                              <Link>
                                <Button variant="primary" onClick={() => {acceptRequest(element.user_id)}} >accept</Button>
                            </Link>
                            <Link>
                                <Button variant="danger" onClick={() => {deleteRequest(element.user_id)}} >delete</Button>
                            </Link>
                            </li>
                               )  })}




                  </ul>
              </div>
               : "" }
                <div className="rightbarWrapper">
                {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
                  <h4 className="rightbarTitle">Members ({usersGroups.length})</h4>
                  <ul className="rightbarFriendList">

                  { usersGroups.map((element,index) => {
                          return (
                            <li className="sidebarFriend" key={index}>
                              <a href={`/profile/${element.user_id}`}><img className="sidebarFriendImg" src={require(`../components/images/${element.image}`)} alt="" />
                              <span className="sidebarFriendName">{element.first_name} {element.last_name}</span></a>
                              { groups.user_id === current_ID ?
                                    <Link>
                                        <Button variant="danger" onClick={() => {deleteFromGroup(element.user_id)}} >Delete</Button>
                                    </Link>
                                : "" }
                            </li>
                               )  })}


                 

                  </ul>
              </div>
                  { (groups.user_id == current_ID) ?
                <div className="rightbarWrapper">
                {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
                  <h4 className="rightbarTitle">Delete group</h4>
                  <ul className="rightbarFriendList">

                            <Link>
                                <Button variant="danger" onClick={() => {deleteGroup(groups.group_id)}} >Delete group</Button>
                            </Link>



                
                  </ul>
              </div>
                 : null }
           
            </div>
      </div>
      </div>
        </div>
        </div>
        })}
    </>
  );
}