import React from 'react'
import "./feed.css"
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Share from '../share/Share'
import Post from '../post/Post'

export default function Feed({user}) {

  const {profile_id} = useParams();

  const current_Fname = JSON.parse(localStorage.getItem('first_name'));
  const current_Lname = JSON.parse(localStorage.getItem('last_name'));
  const current_ID = JSON.parse(localStorage.getItem('id'));
  const current_Email = JSON.parse(localStorage.getItem('email'));

  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);
  const [likes , setLikes] = useState([]);

  useEffect(()=>{
    getPosts();
} , [])


  function getPosts(){
    axios.get(`http://localhost:80/platform/react_project/getAllPostsUser.php/${profile_id}`)
    .then(response => {
        setPosts(response.data);
    })
  }
  

  return (
    <>
            <div className='feed'>
              {profile_id == current_ID 
                  ?
                  <div className="feedWrapper">
                    <Share user = {user}/> 
                    {(posts == []) ?  
                  <></>
                  :
                  posts.map((p) =>(
                    <Post key = {p.id} post ={p}/>
                    ))}
                  </div> 
                  :
                  
                  <div className="feedWrapper">
                    {(posts == []) ?  
                  <></>
                  :
                  posts.map((p) =>(
                    <Post key = {p.id} post ={p}/>
                    ))}
                  </div>
                }
            </div>
            </>
  )
}
