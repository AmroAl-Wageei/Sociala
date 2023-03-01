import "./post.css";
import { MdOutlineMoreVert } from 'react-icons/md';
import axios from 'axios';
import { useState , useEffect } from 'react'
import { useNavigate , useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";


export default function Post( props ) {


  const {profile_id} = useParams();
  const current_ID = JSON.parse(localStorage.getItem('id'));
  const group_id = props.group_id;
  const admin_group = props.admin_group;
  const current_Email = localStorage.getItem('email');

  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);
  const [likes , setLikes] = useState([]);
  const [user , setUser] = useState([]);

  const [file, setFile] = useState(null);

 
  useEffect(()=>{
    getPosts();
    getComments();
    getLikes();
    getUser();
  } , [])
 // Posts


 function getUser(){
  axios.get(`http://localhost:80/platform/react_project/userProfile.php/${current_ID}`)
  .then(response => {
      setUser(response.data);
  })
}

async function getPosts(){
  await axios.get(`http://localhost:80/platform/react_project/postsGroup.php/${group_id}`)
  .then(response => {
      setPosts(response.data);
  }).then(async function getLikes(){
    await axios.get(`http://localhost:80/platform/react_project/likes.php/`)
    .then(response => {
        setLikes(response.data);
    }).then(async function getComments(){
      await axios.get(`http://localhost:80/platform/react_project/comments.php/`)
      .then(response => {
          setComments(response.data);
      })})
  })
}

const handleImagePost = async (e) => {
e.preventDefault();

const formData = new FormData();

formData.append("post", inputs);
formData.append("user_id", current_ID);
formData.append("file", file);
formData.append("group_id", group_id);

try {
  const response = await axios.post(
    "http://localhost:80/platform/react_project/postsGroup.php", formData
  );
  getPosts();

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


try {
  const response = await axios.post(
    "http://localhost:80/platform/react_project/postEdit.php", formEditData
  );
  getPosts();
  window.location.reload(true)
} catch (error) {
  console.error(error);
}
};

const deletePost = async (id) => {
      await axios.delete(`http://localhost:80/platform/react_project/postsGroup.php/${id}`).then(function(response){
      getPosts();
  window.location.reload(true)
})
}


const canclePostEdit = (id) => {
  document.getElementById(`post${id}`).style.display = 'block';
  document.getElementById(`editPostForm${id}`).style.display = 'none';
  document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
  document.getElementById(`imgPost${id}`).style.display = 'block';
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
  const updatePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    document.getElementById(`imgPost${id}`).style.display = "block";
    getPosts();
  };

  const cancleCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = 'block';
    document.getElementById(`editCommentForm${id}`).style.display = 'none';
    document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';
  }
  const updateCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
    document.getElementById(`editCommentBTN${id}`).style.display =
      "inline-block";
      getComments();
      getPosts();
  };



  const getLikes = async () => {
    await axios.get(`http://localhost:80/platform/react_project/likes.php/`)
    .then(response => {
        setLikes(response.data);
    })
  }

  const handleLikePost = async (id) => {
    const post_id = id;
    const user_id = current_ID;
    setInputs({'user_id': user_id , 'post_id' : post_id})
  }

  const likePost = (e) => {
    e.preventDefault();
      axios.post('http://localhost:80/platform/react_project/likes.php/' , inputs).then(
        getPosts()
        )
  }
  const removeLikePost = async (e) => {
    e.preventDefault();
      await axios.post('http://localhost:80/platform/react_project/likeDelete.php/' , inputs).then(
        getPosts()
      )
  }


  function changeColor(id){
    document.getElementById(id).style.color = 'red';
  }
  function returnColor(id){
    document.getElementById(id).style.color = 'blue';
  }
  function showMoreComments(id){
    document.getElementById(`littleCommentsOnPost${id}`).style.display = 'none';
    document.getElementById(`allCommentsOnPost${id}`).style.display = 'block';
  }
  function showLittleComments(id){
    document.getElementById(`littleCommentsOnPost${id}`).style.display = 'block';
    document.getElementById(`allCommentsOnPost${id}`).style.display = 'none';
  }




  
  var flagLike = false;
  var like_count = 0;
  var comment_count = 0;
  var comment_count_show = 0;

  return (

    <>
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft flex">
              <div>
                <img className='postProfileImg'
                 src={require(`../images/${props.post.image}`)} 
                alt="" />
                <span className="postUsername">
                      {props.post.first_name} {props.post.last_name}
                  </span>
                <span className="postDate">{props.post.created_at}</span>
              </div>
              <div>
              {(props.post.user_id === current_ID) || (admin_group===current_ID) ?
                    <div>
                      <button onClick={() => {deletePost(props.post.post_id)}} style={{backgroundColor: 'black'}}>Delete Your Post</button>
                      <button id={`editPostBTN${props.post.post_id}`} onClick={() => {editPost(props.post.post_id)}} >edit</button>
                    </div>
                    : null }
                  </div>

                  
                  {(props.post.post_image !== 'a') ? 

                  <div>
                      <form id={`editPostForm${props.post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>
                          <textarea 
                          style={{width: '50vw'}} 
                          type="text" 
                          defaultValue={props.post.content} 
                          id={`editPostInput${props.post.post_id}`} onChange={() => handleEditPost(props.post.post_id)} 
                          
                          />

                          <br />

                          <input 
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          
                          />

                          <button type='submit' className="textEditPost" style={{marginRight: '30px'}}>Update</button>
                          <button  onClick={()=>{canclePostEdit(props.post.post_id)}} type='button' className="textEditPost">Cancle</button>
                      </form>
                  </div>

                  : 
                  
                  <div>
                
                <form id={`editPostForm${props.post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>

                    <textarea 
                      style={{width: '50vw'}} 
                      type="text" 
                      defaultValue={props.post.content} 
                      id={`editPostInput${props.post.post_id}`} 
                      onChange={() => handleEditPost(props.post.post_id)}/>

                    <input 
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}/>

                    <br />

                    <button type='submit' onClick={() => {
                                    updatePostEdit(props.post.post_id);
                                  }}>Update</button>
                    <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(props.post.post_id)}}  type='button'>Cancle</button>

                </form>
                </div>
                }
              </div>
            </div>
            <div className="postTopRight">
            </div>
        </div>
        <div className="postCenter">
          <span id={`post${props.post.post_id}`} className="postText">{props.post.content}</span>
          {(props.post.post_image) != 'a' ? 
          <img className='postImg' src={require(`../images/${props.post.post_image}`)} alt="" />
        : null 
        }
          </div>
        <div className="postBottom">
          <div className="postBottomLeft">
                    {
                    likes.map((like , index_like) => {
                      if (like.user_id == current_ID && like.post_id == props.post.post_id){
                        return ( flagLike = true )
                      }})}

                      {( flagLike == true ) ?
                              <form action="" onSubmit={removeLikePost}>
                                <button type='submit' style={{background : 'none' , border : 'none' , color : '#0d6efd' , textDecoration : 'underLine' }} onClick={()=>handleLikePost(props.post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                  <i className="far fa-thumbs-up me-2" />
                                  <p className="mb-0" style={{color : 'blue' , fontWeight : 'bold'}}>Liked</p>
                                </button>
                              </form>
                      :
                              <form action="" onSubmit={likePost}>
                                  <button type='submit' style={{background : 'none' , border : 'none' , color : '#0d6efd' , textDecoration : 'underLine' }} onClick={()=>handleLikePost(props.post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                    <i className="far fa-thumbs-up me-2" />
                                    <p className="mb-0">Like</p>
                                  </button>
                              </form>
                      }
            {likes.map((count)=>{
              if(count.post_id == props.post.post_id){
                like_count++;
              }
            })}
            <span className="postLikeCounter">{like_count} People like it</span>

          <a onClick={()=>foucsOnComment(props.post.post_id)} href="#!" className="d-flex align-items-center me-3">
                      <i className="far fa-comment-dots me-2" />
                      <p style={{display : 'none'}}>{comment_count = 0}</p>
                      {comments.map((count)=>{
                        if (count.post_id == props.post.post_id){
                        comment_count++
                        }
                      })}
                      <p className="mb-0">Comment({comment_count})</p>
                    </a>
                  </div>
                </div>
                <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>


                <div className="w-100" id={`littleCommentsOnPost${props.post.post_id}`}>
                  <p style={{display : 'none'}}>{comment_count_show = 0}</p>
                  { comments.map((comment,index_comment) => {
                    if (comment.post_id == props.post.post_id){
                      if (comment_count_show < 1){
                        comment_count_show++
                    return (
                      <div key={index_comment}>
                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                          <div>
                            <img className="rounded-circle shadow-1-strong me-3" alt='' src={require(`../images/${comment.image}`)} style={{width : "3vw" , height : "3vw"}} />
                            <span>{comment.first_name}</span>
                          </div>
                          {(comment.user_id == current_ID) ? 
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                              <button id={`editCommentBTN${comment.comment_id}`} onClick={() => {editComment(comment.comment_id)}}><FaEdit /></button>
                          </div> : (props.post.user_id == current_ID) ?
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                          </div>
                          : null }
                        </div>
                        <br />
                        <div className="form-outline w-100">

                            <p id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                            <form id={`editCommentForm${comment.comment_id}`} action="" style={{display : 'none'}} onSubmit={handleEditCommentSubmit}>
                              <input type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)}/>
                              <button type='submit' onClick={() => {
                                              updateCommentEdit(
                                                comment.comment_id
                                              );
                                            }} >Update</button>
                              <button style={{background : 'red' , color : 'white'}} onClick={()=>{cancleCommentEdit(comment.comment_id)}}  type='button'>Cancle</button>
                            </form>

                            <p>{comment.comment_created_at}</p>
                        </div>
                        <hr />
                    </div>
                    )}}})}
                    {(comment_count > comment_count_show)?
                      <div id='showMoreComments' style={{cursor : 'pointer' , color : 'blue'}} onMouseOver={()=>{changeColor('showMoreComments')}} onMouseOut={()=>{returnColor('showMoreComments')}} onClick={()=>{showMoreComments(props.post.post_id)}}>Load more comments</div>
                      : null  
                    }
                  </div>

                  <div className="w-100" id={`allCommentsOnPost${props.post.post_id}`} style={{display : 'none'}}>
                  <p style={{display : 'none'}}>{comment_count_show = 0}</p>
                  {comments.map((comment,index_comment) => {
                    if (comment.post_id == props.post.post_id){
                    return (
                      <div key={index_comment}>
                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                          <div>
                            <img className="rounded-circle shadow-1-strong me-3" alt='' src={require(`../images/${comment.image}`)} style={{width : "3vw" , height : "3vw"}} />
                            <span>{comment.first_name}</span>
                          </div>
                          {(comment.user_id == current_ID) ? 
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                              <button id={`editCommentBTN${comment.comment_id}`} onClick={() => {editComment(comment.comment_id)}}><FaEdit /></button>
                          </div> : (props.post.user_id == current_ID) ?
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                          </div>
                          : null }
                        </div>
                        <br />
                        <div className="form-outline w-100">

                            <p id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                            <form id={`editCommentForm${comment.comment_id}`} action="" style={{display : 'none'}} onSubmit={handleEditCommentSubmit}>
                              <input type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)}/>
                              <button type='submit'>Update</button>
                              <button style={{background : 'red' , color : 'white'}} onClick={()=>{cancleCommentEdit(comment.comment_id)}}  type='button'>Cancle</button>
                            </form>

                            <p>{comment.comment_created_at}</p>
                        </div>
                        <hr />
                    </div>
                    )}})}
                    {(comment_count > comment_count_show)?
                      <div id='showLittleComments' style={{cursor : 'pointer' , color : 'blue'}} onMouseOver={()=>{changeColor('showMoreComments')}} onMouseOut={()=>{returnColor('showMoreComments')}} onClick={()=>{showLittleComments(props.post.post_id)}}>Load less comments</div>
                      : null  
                    }
                  </div>


          <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="d-flex flex-start w-100">
                  {user.map((Oneuser)=>{
                   return(              
                    <img className="rounded-circle shadow-1-strong me-3" src={require(`../images/${Oneuser.image}`)} alt="avatar" style={{width : "3vw" , height : "3vw"}} />
                    )
                    })}
                    <form className="form-outline w-100" onSubmit={handleCreateComment}>
                      <textarea className="form-control" id={props.post.post_id} name={current_ID} rows={4} style={{background: '#fff'}} onChange={handleChange}/>
                      <button type="submit" className="btn btn-primary btn-sm">Post comment</button>
                    </form>
                  </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
              </div>
            </div>
      </div>
    </>

  )
}