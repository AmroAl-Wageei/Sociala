import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit } from "react-icons/fa";
import { useState , useEffect } from 'react';





import Topbar from "./topbar/Topbar.js";
import Sidebar from "./sidebar/Sidebar.jsx";
import Rightbar from "./rightbar/Rightbar.jsx";
import HomeFeed from './feedHome/HomeFeed';
import Button from "react-bootstrap/Button";



function FirstPageCreated() {




  const current_Fname = JSON.parse(localStorage.getItem('first_name'));
  const current_Lname = JSON.parse(localStorage.getItem('last_name'));
  const current_ID = JSON.parse(localStorage.getItem('id'));
  const current_Email = JSON.parse(localStorage.getItem('email'));

  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);
  const [likes , setLikes] = useState([]);
  const [file, setFile] = useState(null);





    useEffect(()=>{
        getPosts();
        getComments();
        getLikes();



        getUser()
        getUsers()
        getFriendsRequests()
    } , [])



    

    // Posts

    



    function getPosts(){
        axios.get(`http://localhost:80/platform/react_project/posts.php/`)
        .then(response => {
            setPosts(response.data);
            getComments();
            getLikes();
        })
    }

    const handleImagePost = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();

      formData.append("post", inputs);
      formData.append("user_id", current_ID);
      formData.append("file", file);




      



  



      
      try {
        const response = await axios.post(
          "http://localhost:80/platform/react_project/posts.php", formData
        );
        console.log(response.data);
        window.location.assign('/home');
      } catch (error) {
        console.error(error);
      }
    };

    const handlePost = (e) => {
        const value = e.target.value;
        setInputs(value)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const post_id = e.target.id;
        const user_id = e.target.name;
        setInputs({'comment_content': value , 'post_id': post_id , 'user_id' : user_id})
    }

    const editPost = (id) => {
      document.getElementById(`post${id}`).style.display = 'none';
      document.getElementById(`editPostForm${id}`).style.display = 'block';
      document.getElementById(`editPostBTN${id}`).style.display = 'none';
    }

    const handleEditPost = (id) => {
      const post_id = id;
      const value = document.getElementById(`editPostInput${id}`).value;
      setInputs({'post_content': value , 'post_id' : post_id})
    }

    const handleEditPostSubmit  = async (e) => {
      e.preventDefault();
  
      const formEditData = new FormData();

      formEditData.append("post_content", inputs['post_content']);
      formEditData.append("post_id", inputs['post_id']);
      formEditData.append("file", file);

      console.log(formEditData);
  
      try {
        const response = await axios.post(
          "http://localhost:80/platform/react_project/postEdit.php", formEditData
        );
        console.log(response.data);
        window.location.assign('/home');
      } catch (error) {
        console.error(error);
      }
    };

    const deletePost = (id) => {
      axios.delete(`http://localhost:80/platform/react_project/posts.php/${id}`).then(function(response){
        getPosts();
      })
    }








    // Comments




    function getComments(){
      axios.get(`http://localhost:80/platform/react_project/comments.php/`)
      .then(response => {
          setComments(response.data);
      })
  }

    const handleCreateComment = (e) => {
        e.preventDefault();
        axios.post('http://localhost:80/platform/react_project/comments.php/' , inputs).then(document.getElementById(inputs.post_id).value = "").then(
          getPosts()
        )
    }

    const deleteComment = (id) => {
      axios.delete(`http://localhost:80/platform/react_project/comments.php/${id}`).then(function(response){
        getComments();
      })
    }

    const editComment = (id) => {
      document.getElementById(`comment${id}`).style.display = 'none';
      document.getElementById(`editCommentForm${id}`).style.display = 'block';
      document.getElementById(`editCommentBTN${id}`).style.display = 'none';
    }

    const handleEditComment = (id) => {
      const comment_id = id;
      const value = document.getElementById(`editCommentInput${id}`).value;
      setInputs({'comment_content': value , 'comment_id' : comment_id})
    }

    const handleEditCommentSubmit = (e) => {
      e.preventDefault();
      axios.put('http://localhost:80/platform/react_project/comments.php/' , inputs).then(
        getPosts()
      )
    }

    const foucsOnComment = (id) => {
      document.getElementById(id).focus();
    }

    const canclePostEdit = (id) => {
      document.getElementById(`post${id}`).style.display = 'block';
      document.getElementById(`editPostForm${id}`).style.display = 'none';
      document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
      document.getElementById(`imgPost${id}`).style.display = 'block';
    }

    const cancleCommentEdit = (id) => {
      document.getElementById(`comment${id}`).style.display = 'block';
      document.getElementById(`editCommentForm${id}`).style.display = 'none';
      document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';

    }







    // Likes


    const getLikes = () => {
      axios.get(`http://localhost:80/platform/react_project/likes.php/`)
      .then(response => {
          setLikes(response.data);
      })
    }

    const handleLikePost = (id) => {
      const post_id = id;
      const user_id = current_ID;
      setInputs({'user_id': user_id , 'post_id' : post_id})
    }

    const likePost = (e) => {
      e.preventDefault();
      console.log(inputs)
        axios.post('http://localhost:80/platform/react_project/likes.php/' , inputs).then(
          getPosts()
        )
    }
    const removeLikePost = (e) => {
      e.preventDefault();
      console.log(inputs)
        axios.post('http://localhost:80/platform/react_project/likeDelete.php/' , inputs).then(
          getPosts()
        )
    }













    const [users,setUsers] = useState([]);
    const [user,setUser] = useState([]);
    const [friendRequests, setFriendReq] = useState([]);







    const getUsers = () => {

      axios.get(`http://localhost:80/platform/react_project/users.php/${current_ID}`)
      .then((respone)=>{
          setUsers(respone.data)
      })
  }


  function getUser(){
      axios.get(`http://localhost:80/platform/react_project/userProfile.php/${current_ID}`)
      .then(response => {
          setUser(response.data);
      })
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
        window.location.assign(`/home`);
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
        window.location.assign(`/home`);
      });
  };


  
  var i = 1;
  var friendsInArray = [];

















    // Return

  return (
    <div>
        {user.map((user)=>{
        return(
            <>
            <Topbar />
                <div className="profile">
                    <Sidebar />
                        <HomeFeed user = {user} />
                    <div className="profilerightBottom" style={{width: '21vw'}}>




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
                      src={require(`./images/${element.image}`)}
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





                    </div>
                </div>
            </>
        )
})}
</div>
  )
}
export default FirstPageCreated;
