// صفحة الجروب الرئيسية الي رح ينعرض فيها اليوزر و البوستات


import React from 'react';
import { useState , useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";




function Group() {

    const {id} =useParams();
    const current_ID = JSON.parse(localStorage.getItem('id'));


    const [groups , setGroups] = useState([]);
    const [usersGroups , setUserGroups] = useState([]);
    const [pendingRequestGroups , setPendingRequestGroups] = useState([]);


    
  useEffect(()=>{
    getDataGroups();
    getUsersGroup();
    getPendingRequest();
   
    
} , [])

const getDataGroups = () => {

    axios.get(`http://localhost:80/platform/react_project/getDataGroups.php/${id}`)
    .then(response => {
        setGroups(response.data[0]);
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

let i = 1;

  return (
    <div>

<h1> group name : {groups.group_name}</h1>
<h3>admin group : {groups.first_name}</h3>

<hr></hr>

<div className="container m-5">
    <h1> users group</h1>
    <Table striped className="m-auto" style={{textAlign:"center"}}>
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            { groups.user_id === current_ID ? <th scope="col">Delete</th> : "" }
          </tr>
        </thead>
        <tbody>
                { usersGroups.map((element,index) => {
                    console.log(element)
                    return <tr key={index}>
                        
                        <td  style={{paddingLeft : "10px" }}>{i++}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.first_name}</td>

                        {(element.image != 'a') ? 

                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src={require(`./images/${element.image}`)} /></td>

                        : 
                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' /></td>
                        }

                        { groups.user_id === current_ID ? <td>
                            <Link>
                                <Button variant="danger" onClick={() => {deleteFromGroup(element.user_id)}} >Delete</Button>
                            </Link>
                        </td> : "" }
                    </tr>
                })}
        </tbody>
      </Table>
      </div>
{ groups.user_id === current_ID ? <div className="container m-5">
    <h1> request group</h1>
    <Table striped className="m-auto" style={{textAlign:"center"}}>
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">accept</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
                { pendingRequestGroups.map((element,index) => {
                    return <tr key={index}>
                        
                        <td  style={{paddingLeft : "10px" }}>{i++}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.name}</td>
                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src={require(`./images/${element.image}`)} /></td>
                        
                        <td>
                            <Link>
                                <Button variant="primary" onClick={() => {acceptRequest(element.user_id)}} >accept</Button>
                            </Link>
                        </td>
                        <td>
                            <Link>
                                <Button variant="danger" onClick={() => {deleteRequest(element.user_id)}} >delete</Button>
                            </Link>
                        </td>
                    </tr>
                })}
        </tbody>
      </Table>
      </div> : "" }

    </div>
  );
}

export default Group
