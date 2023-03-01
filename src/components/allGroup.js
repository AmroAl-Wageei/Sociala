// كلا الجروبات الي بالموقع عدا الي هو انشئهم


import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";



export default function AllGroup() {

  const current_ID = JSON.parse(localStorage.getItem('id'));

  const [groups , setGroups] = useState([]);
  const [pendingMembers,setPendingMembers] = useState([]);
  const [acceptedMembers,setAcceptedMembers] = useState([]);


  useEffect(()=>{
    getGroups();
    getPendingMempers();
    getAcceptedMempers();
    
} , [])


// لعرض كل الجروبات في الموقع

function getGroups(){
  axios.get(`http://localhost:80/platform/react_project/groups.php/`)
  .then(response => {
      console.log(response.data)
      setGroups(response.data);
      
  })
}


// لاضافة عضو لجروب معين
const AddToGroup = (groupId) => {
  let inputs = {user_id:current_ID , group_id:groupId};
  axios.post(`http://localhost:80/platform/react_project/membersGroup.php/save`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getGroups();
      getPendingMempers();
      
            // getFriendsRequest();
  })
}
     //للجروبات pending لعرض كل طلبات المستخدم اللي حالتهم 
    const getPendingMempers = () => {

        axios.get(`http://localhost:80/platform/react_project/getPendingMember.php/${current_ID}`)
        .then((respone)=>{
            console.log(respone.data);
            let pendingMembers = respone.data.map((ele)=>{
                return ele.group_id
            })
            console.log(pendingMembers);
            setPendingMembers(pendingMembers);
            // setPendingMempers(respone.data)
        })
    }

         //للجروبات accepted لعرض كل طلبات المستخدم اللي حالتهم 
         const getAcceptedMempers = () => {

          axios.get(`http://localhost:80/platform/react_project/getAcceptedMember.php/${current_ID}`)
          .then((respone)=>{
              console.log(respone.data);
              let acceptedMembers = respone.data.map((ele)=>{
                  return ele.group_id
              })
              console.log(acceptedMembers);
              setAcceptedMembers(acceptedMembers);
              // setPendingMempers(respone.data)
          })
      }

  // لحذب طلب الاضافة 
    const removeRequest = (GroupId) => {
      let inputs = {user_id:current_ID , group_id:GroupId};
      axios.put(`http://localhost:80/platform/react_project/getPendingMember.php/edit`,inputs)
      .then((respone)=>{
          console.log(respone.data);
          getGroups();
          getPendingMempers();
      })

    }


    let i = 1;
  return (
    <>

        <div className="container m-5">
    <Table striped className="m-auto" style={{textAlign:"center"}}>
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Admin</th>
            <th scope="col">Name of Group</th>
            <th scope="col">Image</th>
            <th scope="col">Add to group</th>
          </tr>
        </thead>
        <tbody>
                { groups.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return false; // skip
                    }
                    return true;
                    }).map((element,index) => {
                    return <tr key={index}>
                        
                        {console.log(element.id)}
                        <td  style={{paddingLeft : "10px" }}>{i++}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.first_name}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.group_name}</td>
                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src={require(`./images/${element.group_image}`)} /></td>
                        {(() => {
                            if (pendingMembers.includes(element.group_id) || acceptedMembers.includes(element.group_id) ){
                                if(pendingMembers.includes(element.group_id)){
                                  return ( 
                                    <td>
                                    <Link>
                                        <Button className='btn-danger' variant="primary" onClick={()=>removeRequest(element.group_id)}>remove request</Button>
                                    </Link>
                                    </td>
                              )

                                }
                                if(acceptedMembers.includes(element.group_id)){
                                    return (
                                        <td>

                                        <Link to={`/groups/${element.group_id}/show`}>
                                            <Button variant="primary">show group</Button>
                                        </Link>


                                    
                                        </td>
                                    )

                                }
                              
                             
                            }else{
                              return ( 
                                <td>
                  
                                <Link>
                                    <Button variant="primary" onClick={()=>AddToGroup(element.group_id)}>Add</Button>
                                </Link>
                            
                            </td>
                              )
                          }
              
            })()}
              
                       
                    </tr>
                })}
        </tbody>
      </Table>
      </div>

        </>
  )
}
