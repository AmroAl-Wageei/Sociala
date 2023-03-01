import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Feed from '../feed/Feed';
import Topbar from "../topbar/Topbar.js";
import Sidebar from "../sidebar/Sidebar.jsx";
import Rightbar from "../rightbar/Rightbar.jsx";
import "./profile.css"
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

function Profile() {

    const {profile_id} = useParams();

    const current_Fname = JSON.parse(localStorage.getItem('first_name'));
    const current_Lname = JSON.parse(localStorage.getItem('last_name'));
    const current_ID = JSON.parse(localStorage.getItem('id'));
    const current_Email = JSON.parse(localStorage.getItem('email'));
  
    const [inputs , setInputs] = useState("")
    const [posts , setPosts] = useState([]);
    const [comments , setComments] = useState([]);
    const [likes , setLikes] = useState([]);
    const [user , setUser] = useState([]);
    const [friend , setFriend] = useState([]);
    const [users,setUsers] = useState([]);



    const [friends,setfriends] = useState([]); // All Friends as id
    const [pendingRequest,setpendingRequest] = useState([]); // All Requests as id
    const [requestFriend,setrequestFriend] = useState([]); // All Accepts as id
    
    
    const [acceptrdFriends,setAcceptedFriends] = useState([]); // All Friends as Obj
    const [pendingFriends,setpendingFriends] = useState([]); // All Pending Requests Obj
    const [requestFriends,setRequestFriends] = useState([]);  // All Accepts as Obj
    const [friendRequests , setFriendReq] = useState([]);


    useEffect(()=>{
        getUser();
        getFriends();
        getUsers();
        getFriendsRequests();
    } , [])


    const getUsers = () => {

        axios.get(`http://localhost:80/platform/react_project/users.php/${profile_id}`)
        .then((respone)=>{
            setUsers(respone.data)
        })
    }


    function getUser(){
        axios.get(`http://localhost:80/platform/react_project/userProfile.php/${profile_id}`)
        .then(response => {
            setUser(response.data);
        })
    }


    function getFriends(){
        axios.get(`http://localhost:80/platform/react_project/getAllFriendsUser.php/${current_ID}`)
        .then(response => {
            setFriend(response.data);
        })
      }


      const getFriendsRequests = () => {
        axios.get(`http://localhost:80/platform/react_project/profileShowFriendRequests.php/${current_ID}`)
        .then(response => {
            setFriendReq(response.data);
        })
    }






      // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
    const getFriendsPending = () => {

        axios.get(`http://localhost:80/platform/react_project/acceptFriend.php/${current_ID}`)
        .then((respone)=>{
            let pendingRequest = respone.data.map((ele)=>{
                return ele.friend_id
            })
            setpendingRequest(pendingRequest);
            setpendingFriends(respone.data)
            // window.location.assign(`/profile/${profile_id}`)
        })
    }
    //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم

    
    const getFriendsAccepted = () => {

        axios.get(`http://localhost:80/platform/react_project/friends.php/${current_ID}`)
        .then((respone)=>{
            let friends = respone.data.map((ele)=>{
                return ele.friend_id
            })
            setfriends(friends);
            setAcceptedFriends(respone.data)
            // window.location.assign(`/profile/${profile_id}`)
        })
    }
    // عرض طلبات الصداقة الخاصة بالمستخدم واللي لسا ما وافق عليهم

    const getFriendsRequest = () => {

        axios.get(`http://localhost:80/platform/react_project/friendRequests.php/${current_ID}`)
        .then((respone)=>{
            let requestFriend = respone.data.map((ele)=>{
                return ele.user_id
            })
            setrequestFriend(requestFriend);
            setRequestFriends(respone.data)
            // window.location.assign(`/profile/${profile_id}`)
        })
    }
    



    //  pending وحالته بتكون friends  اضافة صديق جديد في جدول ال 
    const AddFriends = (friendId) => {
        let inputs = {user_id:current_ID , friend_id:friendId};
        axios.post(`http://localhost:80/platform/react_project/friends.php/save`,inputs)
        .then((respone)=>{
            getUsers();
            getFriendsPending();
            getFriendsRequest();
            window.location.assign(`/profile/${profile_id}`)
        })


        
    }

    // status الموافقة على طلب الصداقة وتغيير ال 
    const AcceptFriend = (friendId) => {
        let inputs = {user_id:current_ID , friend_id:friendId};
        axios.put(`http://localhost:80/platform/react_project/friends.php/edit`,inputs)
        .then((respone)=>{
            getFriendsPending();
            getFriendsAccepted();
            getFriendsRequest();
            window.location.assign(`/profile/${profile_id}`)
        })


        
    }
    
    // الغاء ارسال طلب الصداقة
    const removeRequest = (friendId) => {
        let inputs = {user_id:current_ID , friend_id:friendId};
        axios.put(`http://localhost:80/platform/react_project/removeRequest.php/edit`,inputs)
        .then((respone)=>{
            getFriendsPending();
            getFriendsAccepted();
            window.location.assign(`/profile/${profile_id}`)
        })


        
    }

    // حذف الصداقة
    const removeFriend = (friendId) => {
        let inputs = {user_id:current_ID , friend_id:friendId};
        axios.put(`http://localhost:80/platform/react_project/removeFriends.php`,inputs)
        .then((respone)=>{
            getFriendsPending();
            getFriendsAccepted();
            window.location.assign(`/profile/${profile_id}`)   
        })
  
    }



    const deleteRequest = (userId) => {

        // let inputs = {user_id:userId , group_id:id};
        axios.put(`http://localhost:80/platform/react_project/deleteRequestForGroup.php`,inputs)
        .then((respone)=>{

        })
      
      }
      //  لقبول طلب الانظمام لل الجروب
      const acceptRequest = (userId) => {
      
        // let inputs = {user_id:userId , group_id:id};
        axios.put(`http://localhost:80/platform/react_project/membersGroup.php`,inputs)
        .then((respone)=>{
        })
      }


    // console.log(users , 'users')
    // console.log(acceptrdFriends , 'friends')
    // console.log(pendingFriends , 'pending requests')
    // console.log(requestFriends , 'request friends')

    // console.log(friend)

    // console.log(user , 'current user')
    // console.log(users , 'all users')
    // console.log(friend , 'friends') // Accepted and Pending Requests (friend_id = 1 = current_user)
    // console.log(pendingFriends , 'pending requests') // user_id = current
    // console.log(requestFriends , 'requests come to ') // user_id = current
    
    var i = 1;
    var friendsInArray = [];

  return (
    <div>
        {user.map((user)=>{
        return(
            <>
            <Topbar />
                <div className="profile">
                    <Sidebar />

                    
            {friend.map((OneFriend)=>{
                friendsInArray.push(OneFriend['friend_id'])
                friendsInArray.push(OneFriend['user_id'])
                // console.log(OneFriend['friend_id'] , 'friend id')
                // console.log(OneFriend['user_id'] , 'user_id id')
                // console.log(OneFriend['status'] , 'status id')
                // console.log(current_ID , 'current_ID')
                // console.log(profile_id , 'profile_id')
                
                if(i===1){  

                    
                    if(OneFriend['friend_id'] == current_ID &&  OneFriend['user_id'] == profile_id || OneFriend['friend_id'] == profile_id && OneFriend['user_id'] == current_ID || profile_id == current_ID)
                    {
                        return (
                            <div>
                        
                            <p style={{display : 'none'}}>{i++}</p>             
                { (profile_id == current_ID) 
                ?
                <div className="profileRight">
                    <div className="profilerightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src="https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg" alt="" />
                            <img className='profileUserImg' src={require(`../images/${user.image}`)} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                            <span className='profileInfoDesc'>Welcome to my Profile</span>
                        </div>
                    </div>
                    <div className="profilerightBottom">
                        <Feed user = {user} />
                        <Rightbar profile/>
                    </div>
                </div>
                :
                ((OneFriend['friend_id'] == profile_id && OneFriend['user_id'] == current_ID && OneFriend['status'] == 'accepted') || (OneFriend['user_id'] == profile_id && OneFriend['friend_id'] == current_ID && OneFriend['status'] == 'accepted'))
                ?
                <div> 
                    <div className="profileRight">
                        <div className="profilerightTop">
                            <div className="profileCover">
                                <img className='profileCoverImg' src="https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg" alt="" />
                                <img className='profileUserImg' src={require(`../images/${user.image}`)} alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                                <Button variant="danger" onClick={()=>removeFriend(profile_id)}>remove friend</Button>
                            </div>
                        </div>
                        <div className="profilerightBottom">
                            <Feed user = {user} />
                            <Rightbar profile/>
                        </div>
                    </div>
                
                </div> 
                : 
                (OneFriend['friend_id'] == profile_id  && OneFriend['user_id']== current_ID && OneFriend['status'] == 'pending')
                ?
                <div>
                    <div className="profileRight">
                        <div className="profilerightTop">
                            <div className="profileCover">
                                <img className='profileCoverImg' src="https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg" alt="" />
                                <img className='profileUserImg' src={require(`../images/${user.image}`)} alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                                <Button variant="danger" onClick={()=>removeRequest(profile_id)}>remove my request</Button>
                            </div>
                        </div>

                    </div>
                </div> 
                :
                (OneFriend['user_id'] == profile_id && OneFriend['friend_id'] == current_ID && OneFriend['status'] == 'pending') 
                ?
                <div>
                    <div className="profileRight">
                        <div className="profilerightTop">
                            <div className="profileCover">
                                <img className='profileCoverImg' src="https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg" alt="" />
                                <img className='profileUserImg' src={require(`../images/${user.image}`)} alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                                <Button variant="primary" onClick={()=>AcceptFriend(profile_id)} >accept</Button>
                                <Button variant="danger" onClick={()=>removeRequest(profile_id)}>remove request</Button>
                            </div>
                        </div>
                    </div>
                </div> 
                :
                <div>
                    <div className="profileRight">
                            <div className="profilerightTop">
                                <div className="profileCover">
                                    <img className='profileCoverImg' src="https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg" alt="" />
                                    <img className='profileUserImg' src={require(`../images/${user.image}`)} alt="" />
                                </div>
                                <div className="profileInfo">
                                    <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                                    <Button variant="primary" onClick={()=>AddFriends(profile_id)} className="buttonAdd">Add Friend</Button>
                                </div>
                            </div>
                            <div className="profilerightBottom">
                                <Feed user = {user} />
                                <Rightbar profile/>
                            </div>
                        </div>
                </div>
                }     
                </div>
                        )
                    }
                }

            })}

                    {(!friendsInArray.includes(Number(profile_id))) ?  
                            <div>
                            <div className="profileRight">
                                <div className="profilerightTop">
                                    <div className="profileCover">
                                        <img className='profileCoverImg' src="https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg" alt="" />
                                        <img className='profileUserImg' src={require(`../images/${user.image}`)} alt="" />
                                    </div>
                                    <div className="profileInfo">
                                        <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                                        <Button variant="primary" onClick={()=>AddFriends(profile_id)}>Add Friend</Button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            :
                            null
                            }

                
            
            
               </div>
            </>
            )
        
        })}
    </div>
  )
}

export default Profile
