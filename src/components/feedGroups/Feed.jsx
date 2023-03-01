import Post from "../postGroup/Post";
import Share from "../shareGroup/Share";
import "./feed.css";
import { useState , useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function Feed(props) {


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
  axios.get(`http://localhost:80/platform/react_project/postsGroup.php/${props.group_id}`)
  .then(response => {
      setPosts(response.data);
  })
}

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share group_id={props.group_id} user={props.user}/>
                    {(posts == []) ?  
                  <></>
                  :
                  posts.map((p) =>(
                    <Post group_id={props.group_id} admin_group={props.admin_group} key = {p.id} post ={p}/>
                    ))}
            </div>
    </div>
  );
}