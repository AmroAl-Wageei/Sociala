import React from "react";
import "../post/post.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../feed/Feed";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import Dropdown from "react-bootstrap/Dropdown";
import { CgBorderStyleDotted } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { CgSoftwareUpload } from "react-icons/cg";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function SinglePost({ post }) {
  const [like, setLike] = useState("");

  const { profile_id } = useParams();
  const { postID } = useParams();

  const current_Fname = JSON.parse(localStorage.getItem("first_name"));
  const current_Lname = JSON.parse(localStorage.getItem("last_name"));
  const current_ID = JSON.parse(localStorage.getItem("id"));
  const current_Email = JSON.parse(localStorage.getItem("email"));

  const [inputs, setInputs] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getPosts();
    getUser();
    getComments();
    getLikes();
  }, []);

  function getUser() {
    axios
      .get(
        `http://localhost:80/platform/react_project/userProfile.php/${profile_id}`
      )
      .then((response) => {
        setUser(response.data);
      });
  }

  // Posts

  function getPosts() {
    axios
      .get(
        `http://localhost:80/platform/react_project/singlePost.php/${postID}`
      )
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        getComments();
        getLikes();
      });
  }

  const handleImagePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("post", inputs);
    formData.append("user_id", current_ID);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:80/platform/react_project/posts.php",
        formData
      );
      console.log(response.data);
      window.location.assign(`/profile/${profile_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = (e) => {
    const value = e.target.value;
    setInputs(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const post_id = e.target.id;
    const user_id = e.target.name;
    setInputs({ comment_content: value, post_id: post_id, user_id: user_id });
  };

  const editPost = (id) => {
    console.log(id);
    document.getElementById(`post${id}`).style.display = "none";
    document.getElementById(`editPostForm${id}`).style.display = "block";
    document.getElementById(`editPostBTN${id}`).style.display = "none";
    document.getElementById(`drpDwn${id}`).style.display = "none";
  };

  const handleEditPost = (id) => {
    const post_id = id;
    const value = document.getElementById(`editPostInput${id}`).value;
    setInputs({ post_content: value, post_id: post_id });
  };

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();

    const formEditData = new FormData();

    formEditData.append("post_content", inputs["post_content"]);
    formEditData.append("post_id", inputs["post_id"]);
    formEditData.append("file", file);

    console.log(formEditData);

    try {
      const response = await axios.post(
        "http://localhost:80/platform/react_project/postEdit.php",
        formEditData
      );
      console.log(response.data);
      window.location.assign(`/profile/${profile_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:80/platform/react_project/posts.php/${id}`)
      .then(function (response) {
        window.location.assign(`/profile/${profile_id}`);
      });
  };

  // Comments

  function getComments() {
    axios
      .get(`http://localhost:80/platform/react_project/comments.php/`)
      .then((response) => {
        setComments(response.data);
      });
  }

  const handleCreateComment = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:80/platform/react_project/comments.php/", inputs)
      .then((document.getElementById(inputs.post_id).value = ""))
      .then(getPosts());
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:80/platform/react_project/comments.php/${id}`)
      .then(function (response) {
        getComments();
      });
  };

  const editComment = (id) => {
    document.getElementById(`comment${id}`).style.display = "none";
    document.getElementById(`editCommentForm${id}`).style.display = "block";
    document.getElementById(`editCommentBTN${id}`).style.display = "none";
    document.getElementById(`editCommentBTN${id}`).style.display = "none";
  };

  const updatePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    document.getElementById(`drpDwn${id}`).style.display = "block";
    getPosts();
  };

  const updatePostEditImage = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    document.getElementById(`imgPost${id}`).style.display = "block";
    getPosts();
  };

  const updateCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
    document.getElementById(`drpDwnCom${id}`).style.display = "block";
    document.getElementById(`editCommentBTN${id}`).style.display =
      "inline-block";
      getComments();
      getPosts();
  };

  const handleEditComment = (id) => {
    const comment_id = id;
    const value = document.getElementById(`editCommentInput${id}`).value;
    setInputs({ comment_content: value, comment_id: comment_id });
  };

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:80/platform/react_project/comments.php/", inputs)
      .then(getPosts());
  };

  const foucsOnComment = (id) => {
    document.getElementById(id).focus();
  };

  const canclePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    document.getElementById(`drpDwn${id}`).style.display = "block";
  };

  const cancleCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
    document.getElementById(`drpDwnCom${id}`).style.display = "block";
    document.getElementById(`editCommentBTN${id}`).style.display ="inline-block";
  };

  // Likes

  const getLikes = () => {
    axios
      .get(`http://localhost:80/platform/react_project/likes.php/`)
      .then((response) => {
        setLikes(response.data);
      });
  };

  const handleLikePost = (id) => {
    const post_id = id;
    const user_id = current_ID;
    setInputs({ user_id: user_id, post_id: post_id });
  };

  const likePost = (e) => {
    e.preventDefault();
    console.log(inputs);
    axios
      .post("http://localhost:80/platform/react_project/likes.php/", inputs)
      .then(getPosts());
  };
  const removeLikePost = (e) => {
    e.preventDefault();
    console.log(inputs);
    axios
      .post(
        "http://localhost:80/platform/react_project/likeDelete.php/",
        inputs
      )
      .then(getPosts());
  };

  var flagLike = false;
  var like_count = 0;

  return (
    <div>
      {user.map((user) => {
        console.log(user);
        return (
          <>
            <Topbar />
            <div className="profile">
              <Sidebar />

              <div className="profileRight">
                <div className="profilerightTop">
                  <div className="profileCover">
                    <img
                      className="profileCoverImg"
                      src="http://www.prodraw.net/fb_cover/images/fb_cover_52.jpg"
                      alt=""
                    />
                    <img
                      className="profileUserImg"
                      src={require(`../images/${user.image}`)}
                      alt=""
                    />
                  </div>
                  <div className="profileInfo">
                    <h4 className="profileInfoName">
                      {user.first_name} {user.last_name}
                    </h4>
                    <span className="profileInfoDesc">
                      Welcome To my Profile
                    </span>
                  </div>
                </div>
                <div
                  className="profilerightBottom"
                  style={{ width: "60vw", marginLeft: "9vw" }}
                >
                  {posts.map((post) => {
                    return (
                      <>
                        <div className="post">
                          <div className="postWrapper">
                            <div className="postTop">
                              <div className="postTopLeft flex">
                                <div>
                                  <img
                                    className="postProfileImg"
                                    src={require(`../images/${post.image}`)}
                                    alt=""
                                  />
                                  <span className="postUsername">
                                    {post.first_name} {post.last_name}
                                  </span>
                                  <p className="postDate">
                                    {post.created_at}
                                  </p>
                                </div>
                                <div>
                                {post.user_id === current_ID ? (
                  <div id={`drpDwn${post.post_id}`} style={{ marginLeft: "38vw" , marginBottom : '6vh' }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="text-dark"
                        id="dropdown-basic"
                        bsPrefix
                      >
                        <BiDotsHorizontalRounded />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div>
                          <Dropdown.Item
                            id={`editPostBTN${post.post_id}`}
                            onClick={() => {
                              editPost(post.post_id);
                            }}
                          >
                            <BiEdit />
                            Edit
                          </Dropdown.Item>
                        </div>
                        <div>
                          <Dropdown.Item
                            variant="danger"
                            onClick={() => {
                              deletePost(post.post_id);
                            }}
                          >
                            <MdDeleteForever />
                            Delete
                          </Dropdown.Item>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : null}
              </div>
              {post.post_image !== "a" ? (
                <div>
                <form
                  id={`editPostForm${post.post_id}`}
                  action=""
                  style={{ display: "none" }}
                  onSubmit={handleEditPostSubmit}
                >
                  <textarea
                 
                    style={{ width: "40vw" }}
                    type="text"
                    defaultValue={post.content}
                    id={`editPostInput${post.post_id}`}
                    onChange={() => handleEditPost(post.post_id)}
                  />

                  <br />

                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                  />

                  <div className="BTNEDITPOST">
                  <label className="label" for="file">
                    <CgSoftwareUpload size={20} />
                    Choose file
                  </label>
                  
                      <button type="submit" className="UpdateBtn" onClick={() => {
                          updatePostEditImage(post.post_id);
                        }}>
                        Update
                      </button>

                      <button
                        style={{ marginLeft : '10px'}}
                        onClick={() => {
                          canclePostEdit(post.post_id);
                        }}
                        type="button"
                        className="CancelBtn"
                      >
                        Cancle
                      </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <form
                  id={`editPostForm${post.post_id}`}
                  action=""
                  style={{ display: "none" }}
                  onSubmit={handleEditPostSubmit}
                >
                  <textarea
                    style={{ width: "50vw" }}
                    type="text"
                    defaultValue={post.content}
                    id={`editPostInput${post.post_id}`}
                    onChange={() => handleEditPost(post.post_id)}
                  />

                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <br />

                  <button type="submit" onClick={() => {
                          updatePostEdit(post.post_id);
                        }}>Update</button>
                  <button
                    style={{ background: "red", color: "white" }}
                    onClick={() => {
                      canclePostEdit(post.post_id);
                    }}
                    type="button"
                  >
                    Cancle
                  </button>
                </form>
              </div>
              )}
                              </div>
                            </div>
                          </div>
                          <div className="postCenter">
                            <p
                              id={`post${post.post_id}`}
                              className="postText"
                              style={{marginLeft : '7vw'}}
                            >
                              {post.content}
                            </p>
                            {post.post_image != "a" ? (
                              <img
                                className="postImg"
                                src={require(`../images/${post.post_image}`)}
                                alt=""
                                style={{width : '60vw'}}
                              />
                            ) : null}
                          </div>
                          <div className="postBottom">
                          <div className="postBottomLeft">
            {likes.map((like, index_like) => {
              if (
                like.user_id === current_ID &&
                like.post_id === post.post_id
              ) {
                return (flagLike = true);
              }
            })}

            {flagLike === true ? (
              <form action="" onSubmit={removeLikePost}>
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0d6efd",
                    textDecoration: "underLine",
                  }}
                  onClick={() => handleLikePost(post.post_id)}
                  href="#!"
                  className="d-flex align-items-center me-3"
                >
                  <i className="far fa-thumbs-up me-2" />
                  <FcLike className="like-icon" />{" "}
                </button>
              </form>
            ) : (
              <form action="" onSubmit={likePost}>
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0d6efd",
                    textDecoration: "underLine",
                  }}
                  onClick={() => handleLikePost(post.post_id)}
                  href="#!"
                  className="d-flex align-items-center me-3"
                >
                  <i className="far fa-thumbs-up me-2" />{" "}
                  <FcLikePlaceholder className="like-icon" />
                </button>
              </form>
            )}
            {likes.map((count) => {
              if (count.post_id == post.post_id) {
                like_count++;
              }
            })}
            <span className="postLikeCounter">{like_count} People like it</span>
          </div>
                          </div>

                          <div
                            className="card-footer py-3 border-0"
                            style={{ backgroundColor: "rgb(239 241 242 / 89%)" }}
                          >
                            <div className="w-100">
                              {comments.map((comment, index_comment) => {
                                if (comment.post_id == post.post_id) {
                                  return (
                                    <div key={index_comment}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div style={{marginLeft : '2vw'}}>
                                          <img
                                            className="rounded-circle shadow-1-strong me-3"
                                            src={require(`../images/${comment.image}`)}
                                            alt="avatar"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              
                                            }}
                                          />
                                          <span>{comment.first_name} {comment.last_name}</span>
                                          <p style={{fontSize : '12px' , color : 'gray' , marginLeft : '3.5vw'}}>{comment.comment_created_at}</p>
                                        </div>
                                        {comment.user_id == current_ID ? (
                                          <div id={`drpDwnCom${comment.comment_id}`}>






                  <div style={{ marginLeft: "10%" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="text-dark"
                        id="dropdown-basic"
                        bsPrefix
                      >
                        <BiDotsHorizontalRounded />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div>
                          <Dropdown.Item
                            id={`editCommentBTN${comment.comment_id}`}
                            onClick={() => {
                              editComment(comment.comment_id);
                            }}
                          >
                            <BiEdit />
                            Edit
                          </Dropdown.Item>
                        </div>
                        <div>
                          <Dropdown.Item
                            onClick={() => {
                              deleteComment(
                                comment.comment_id
                              );
                            }}
                          >
                            <MdDeleteForever />
                            Delete
                          </Dropdown.Item>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div> 
                  </div>)
                
                           : post.user_id == current_ID ? (
                                          <div id={`drpDwnCom${comment.comment_id}`}>
                                          <div style={{ marginLeft: "10%" }}>
                                            <Dropdown>
                                              <Dropdown.Toggle
                                                variant="text-dark"
                                                id="dropdown-basic"
                                                bsPrefix
                                              >
                                                <BiDotsHorizontalRounded />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <div>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      deleteComment(
                                                        comment.comment_id
                                                      );
                                                    }}
                                                  >
                                                    <MdDeleteForever />
                                                    Remove comment
                                                  </Dropdown.Item>
                                                </div>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div> 
                                          </div>)
                                          : null}
                                      </div>
                                      <br />
                                      <div className="form-outline w-100" style={{marginLeft : '5vw'}}>
                                        <p id={`comment${comment.comment_id}`}>
                                          {comment.comment_content}
                                        </p>




                <div>
                <form
                  id={`editCommentForm${comment.comment_id}`}
                  action=""
                  style={{ display: "none" }}
                  onSubmit={handleEditCommentSubmit}
                >
                  <textarea
                 
                    style={{ width: "40vw" }}
                    type="text"
                    defaultValue={
                      comment.comment_content
                    }
                    id={`editCommentInput${comment.comment_id}`}
                    onChange={() =>
                      handleEditComment(
                        comment.comment_id
                      )
                    }
                  />

                  <br />

                  <div className="BTNEDITPOST">          
                      <button className="UpdateBtn" type="submit" onClick={() => {
                                              updateCommentEdit(
                                                comment.comment_id
                                              );
                                            }}>
                        Update
                      </button>

                      <button
                        style={{ marginLeft : '10px'}}
                        onClick={() => {
                          cancleCommentEdit(
                            comment.comment_id
                          );
                        }}
                        type="button"
                        className="CancelBtn"
                      >
                        Cancle
                      </button>
                  </div>
                </form>
              </div>

                                        
                                      </div>
                                      <hr />
                                    </div>
                                  );
                                }
                              })}
                            </div>
                            <div
                              className="card-footer py-3 border-0"
                              style={{ backgroundColor: "rgb(239 241 242 / 89%)" , width : '57vw' , marginLeft : '2vw' }}
                            >
                              <div className="d-flex flex-start w-100">
                                <img
                                  className="rounded-circle shadow-1-strong me-3"
                                  src={require(`../images/${post.image}`)}
                                  alt="avatar"
                                  style={{ width: "40px", height: "40px" }}
                                />
                                <form
                                  className="form-outline w-100"
                                  onSubmit={handleCreateComment}
                                >
                                  <textarea
                                    className="form-control"
                                    id={post.post_id}
                                    name={current_ID}
                                    rows={4}
                                    placeholder='Write Your Comment . . .'
                                    style={{ background: "#fff" }}
                                    onChange={handleChange}
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                    style={{marginTop : '1vw' , marginLeft : '45vw'}}
                                  >
                                    Post comment
                                  </button>
                                </form>
                              </div>
                            </div>
                            <div className="float-end mt-2 pt-1"></div>
                          </div>
                        </div>
                      </>
                    );
                  })}

                  <div style={{ height: "100vh" }}></div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default SinglePost;
