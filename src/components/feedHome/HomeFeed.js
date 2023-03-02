import React from 'react'
import "./HomeFeed.css"
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Share from '../share/Share'
import HomePost from '../postHome/HomePost'

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


async function getPosts(){
    await axios.get(`http://localhost:80/platform/react_project/specificPosts.php/${current_ID}`)
    .then(response => {
      console.log(response.data)
        setPosts(response.data);
    }).then(async function getLikes(){
      await axios.get(`http://localhost:80/platform/react_project/likes.php/`)
      .then(response => {
          setLikes(response.data);
      })
    }).then(async function getComments(){
      await axios.get(`http://localhost:80/platform/react_project/comments.php/`)
      .then(response => {
          setComments(response.data);
      })
    })
}
  

  return (
    <>
            <div className='feed'>
                  <div className="feedWrapper">
                    <Share user = {user}/> 

                    {posts.map((p) =>(
                        <HomePost key = {p.id} post ={p}/>
                        ))}
                    </div>
            </div>
            </>
  )
}
