import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./allgroups.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CreateGroup from "./createGroup";


export default function Allgroups() {

  const current_ID = JSON.parse(localStorage.getItem('id'));

    const[data,setData]=useState([]);
    const[showUpdateForm,setShowUpdateForm]=useState(false);
    const [pendingMembers,setPendingMembers] = useState([]);
    const [acceptedMembers,setAcceptedMembers] = useState([]);

    useEffect(()=>{
      getGroups();
      getPendingMempers();
      getAcceptedMempers();
            },[])

            // لعرض كل الجروبات في الموقع

    const getGroups =()=>{
        
        axios.get("http://localhost:80/platform/react_project/groups.php")
      
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
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


// ////////////////////
const [text, setText] = useState("");
const [file, setFile] = useState(null);
const [groupDescription, setGroupDescription] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("user_id", current_ID);
    formData.append("file", file);
    formData.append("group_description", groupDescription);

    try {
      const response = await axios.post(
        "http://localhost:80/platform/react_project/groups.php",
        formData
      );
      console.log(response.data);
      setShowUpdateForm(false);
      window.location.assign('/Allgroups');


    } catch (error) {
      console.error(error);
    }
  };

const ShowUpdateForm = () => {
  {showUpdateForm ? setShowUpdateForm(false) : setShowUpdateForm(true)}
}

    return (
      <div>
        <Topbar />
        <div className="groupContainer">
          <Sidebar />

          <div className="Allgroups">

          {showUpdateForm&& <CreateGroup handleSubmit={handleSubmit} setText={setText} setFile={setFile} setGroupDescription={setGroupDescription} text={text} />}
          <div className="Allgroups">

          <div className="groupList">
          <section className="blog">
            <div className="blog-heading">
              <span>My Recent Group</span>
              <h3> All Groups </h3>
          <Button variant="primary" onClick={()=>ShowUpdateForm()}>Add group</Button>

            </div>

            {/* Blog-Container    */}

            <div className="blogContainer">
              {/* Blog-Box1  */}

              {data.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return false; // skip
                    }
                    return true;
                    }).map((ele,index)=>{
                      return (
              <div className="blogBox" key={index} >
                <div className="blogImg">
                  <img src={require(`../components/images/${ele.group_image}`)} alt="Group1" />
                </div>

                <div className="blogText">
                  {/* <span> 20 OCT 2023 / Created At </span> */}
                  <h4 className="blogTitle">{ele.group_name} </h4>
                  <p className="blogDesc">
                  {ele.group_description}  
                  </p>
                  <div className="blogBtn">
                   <Link to={`/groups/${ele.group_id}/show`}>
                        <button type="submit" className="blogBtn1">
                        {" "}
                        Show
                        </button>
                    </Link>
                    {(() => {
                            if (pendingMembers.includes(ele.group_id) || acceptedMembers.includes(ele.group_id) ){
                              if(pendingMembers.includes(ele.group_id)){
                                return (

                                           <Link>
                                                    <button type="submit" className="blogBtn2" onClick={()=>removeRequest(ele.group_id)}>
                                                    {" "}
                                                    Remove Request
                                                    </button>
                                            </Link>

                                    )

                                }
                                if(acceptedMembers.includes(ele.group_id)){
                                  return (
                                        <Link>
                                        <button type="submit" className="blogBtn2" onClick={()=>removeRequest(ele.group_id)}>
                                        {" "}
                                        Delete Group
                                        </button>
                                </Link>
                                        )

                                }
                        
                             
                            }else{
                                return ( 
                                    <Link>
                                        <button type="submit" className="blogBtn3" onClick={()=>AddToGroup(ele.group_id)} >
                                        {" "}
                                        Add
                                        </button>
                                    </Link>
                               
                                )
                            }
              
                      })()}
                  </div>
                </div>
              </div>

)})}
            </div>
          </section>
        </div>

    
      </div>
    </div>
    </div>
     
    </div>
  );
}