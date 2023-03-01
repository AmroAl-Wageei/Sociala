import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit } from "react-icons/fa";
import { useState , useEffect } from 'react';




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






    // Return

  return (
    <div>
      <a href="/logout">Logout</a><br />
      <a href={`/profile/${current_ID}`}>profile</a>

                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                    <form className="form-outline w-100" onSubmit={handleImagePost}>
                      <textarea placeholder='Write something . . .' className="form-control"  id={current_ID} rows={4} style={{background: '#fff'}} onChange={handlePost}/>
                      <input type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}/>
                      <button type="submit" className="btn btn-primary btn-sm">Share</button>
                    </form>
                  </div>
                { posts.map((post,index_post) => {
                  var flagLike = false;
                    return (
      <section style={{backgroundColor: '#eee'}} key={index_post}>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center" style={{justifyContent : 'space-between'}}>
                    <div>
                      <div style={{display : 'flex'}}>
                          <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={60} height={60} />
                        <div>
                          <h6 className="fw-bold text-primary mb-1">{post.first_name}</h6>
                          <p className="text-muted small mb-0">{post.created_at}</p>
                        </div>
                      </div>
                    </div>
                    {(post.user_id == current_ID) ?
                    <div>
                      <button onClick={() => {deletePost(post.post_id)}}>Delete Your Post</button>
                      <button id={`editPostBTN${post.post_id}`} onClick={() => {editPost(post.post_id)}}><FaEdit /></button>
                    </div>
                    : null }
                  </div>

                  
                  {(post.post_image != 'a') ? 

                  <div>
                      <p id={`post${post.post_id}`} className="mt-3 mb-4 pb-2">{post.content}</p>

                      <form id={`editPostForm${post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>
                          <textarea 
                          style={{width: '50vw'}} 
                          type="text" 
                          defaultValue={post.content} 
                          id={`editPostInput${post.post_id}`} onChange={() => handleEditPost(post.post_id)}/>

                          <br />

                          <input 
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}/>

                          <button type='submit'>Update</button>
                          <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(post.post_id)}} type='button'>Cancle</button>
                      </form>

                      <img id={`imgPost${post.post_id}`} width={'700vw'} height={'500vh'} src={require(`./images/${post.post_image}`)} alt='' />
                  </div>

                  : 
                  
                  <div>
                  
                  <p id={`post${post.post_id}`} className="mt-3 mb-4 pb-2">
                  {post.content}
                </p> 
                
                <form id={`editPostForm${post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>

                    <textarea 
                      style={{width: '50vw'}} 
                      type="text" 
                      defaultValue={post.content} 
                      id={`editPostInput${post.post_id}`} 
                      onChange={() => handleEditPost(post.post_id)}/>

                    <input 
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}/>

                    <br />

                    <button type='submit'>Update</button>
                    <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(post.post_id)}}  type='button'>Cancle</button>

                </form>
                

                </div>
                }
                  <div className="small d-flex justify-content-start">
                    {
                    likes.map((like , index_like) => {
                      if (like.user_id == current_ID && like.post_id == post.post_id){
                        return ( flagLike = true )
                      }})}

                      {( flagLike == true ) ?

                          <div>
                              <form action="" onSubmit={removeLikePost}>
                                <button type='submit' style={{background : 'none' , border : 'none' , color : '#0d6efd' , textDecoration : 'underLine' }} onClick={()=>handleLikePost(post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                  <i className="far fa-thumbs-up me-2" />
                                  <p className="mb-0" style={{color : 'blue' , fontWeight : 'bold'}}>Liked</p>
                                </button>
                              </form>
                          </div> 
                      :
                              <form action="" onSubmit={likePost}>
                                  <button type='submit' style={{background : 'none' , border : 'none' , color : '#0d6efd' , textDecoration : 'underLine' }} onClick={()=>handleLikePost(post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                    <i className="far fa-thumbs-up me-2" />
                                    <p className="mb-0">Like</p>
                                  </button>
                              </form>
                  
                      }
                     
                    <a onClick={()=>foucsOnComment(post.post_id)} href="#!" className="d-flex align-items-center me-3">
                      <i className="far fa-comment-dots me-2" />
                      <p className="mb-0">Comment</p>
                    </a>
                  </div>
                </div>
                <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="w-100">
                  { comments.map((comment,index_comment) => {
                    if (comment.post_id == post.post_id){
                    return (
                    <div key={index_comment}>
                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                          <div>
                            <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                            <span>{comment.first_name}</span>
                          </div>
                          {(comment.user_id == current_ID) ? 
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                              <button id={`editCommentBTN${comment.comment_id}`} onClick={() => {editComment(comment.comment_id)}}><FaEdit /></button>
                          </div> : (post.user_id == current_ID) ?
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
                  </div>
                  <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                    <form className="form-outline w-100" onSubmit={handleCreateComment}>
                      <textarea className="form-control" id={post.post_id} name={current_ID} rows={4} style={{background: '#fff'}} onChange={handleChange}/>
                      <button type="submit" className="btn btn-primary btn-sm">Post comment</button>
                    </form>
                  </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                )})}
    </div>
  )
}

export default FirstPageCreated;
