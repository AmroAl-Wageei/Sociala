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
  };

  const updatePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    getPosts();
  };

  const updateCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
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
    document.getElementById(`imgPost${id}`).style.display = "block";
  };

  const cancleCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
    document.getElementById(`editCommentBTN${id}`).style.display =
      "inline-block";
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
                                  <span className="postDate">
                                    {post.created_at}
                                  </span>
                                </div>
                                <div>
                                  {post.user_id == current_ID ? (
                                    <div>
                                      <button
                                        onClick={() => {
                                          deletePost(post.post_id);
                                        }}
                                      >
                                        Delete Your Post
                                      </button>
                                      <button
                                        id={`editPostBTN${post.post_id}`}
                                        onClick={() => {
                                          editPost(post.post_id);
                                        }}
                                      >
                                        edit
                                      </button>
                                    </div>
                                  ) : null}
                                </div>

                                {post.post_image != "a" ? (
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
                                        onChange={() =>
                                          handleEditPost(post.post_id)
                                        }
                                      />

                                      <br />

                                      <input
                                        type="file"
                                        id="file"
                                        onChange={(e) =>
                                          setFile(e.target.files[0])
                                        }
                                      />

                                      <button type="submit">Update</button>
                                      <button
                                        style={{
                                          background: "red",
                                          color: "white",
                                        }}
                                        onClick={() => {
                                          canclePostEdit(post.post_id);
                                        }}
                                        type="button"
                                      >
                                        Cancle
                                      </button>
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
                                        onChange={() =>
                                          handleEditPost(post.post_id)
                                        }
                                      />

                                      <input
                                        type="file"
                                        id="file"
                                        onChange={(e) =>
                                          setFile(e.target.files[0])
                                        }
                                      />

                                      <br />

                                      <button type="submit">Update</button>
                                      <button
                                        style={{
                                          background: "red",
                                          color: "white",
                                        }}
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
                            <div className="postTopRight"></div>
                          </div>
                          <div className="postCenter">
                            <span
                              id={`post${post.post_id}`}
                              className="postText"
                            >
                              {post.content}
                            </span>
                            {post.post_image != "a" ? (
                              <img
                                className="postImg"
                                src={require(`../images/${post.post_image}`)}
                                alt=""
                              />
                            ) : null}
                          </div>
                          <div className="postBottom">
                            <div className="postBottomLeft">
                              {likes.map((like, index_like) => {
                                if (
                                  like.user_id == current_ID &&
                                  like.post_id == post.post_id
                                ) {
                                  return (flagLike = true);
                                }
                              })}

                              {flagLike == true ? (
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
                                    <p
                                      className="mb-0"
                                      style={{
                                        color: "blue",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Liked
                                    </p>
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
                                    <i className="far fa-thumbs-up me-2" />
                                    <FcLike className="like-icon" />{" "}
                                  </button>
                                </form>
                              )}
                              {likes.map((count) => {
                                if (count.post_id == post.post_id) {
                                  like_count++;
                                }
                              })}
                              <span className="postLikeCounter">
                                {like_count}
                                <AiFillLike className="like-icon" />
                              </span>
                            </div>
                          </div>

                          <div
                            className="card-footer py-3 border-0"
                            style={{ backgroundColor: "#f8f9fa" }}
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
                                        <div>
                                          <img
                                            className="rounded-circle shadow-1-strong me-3"
                                            src={require(`../images/${comment.image}`)}
                                            alt="avatar"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                            }}
                                          />
                                          <span>{comment.first_name}</span>
                                        </div>
                                        {comment.user_id == current_ID ? (
                                          <div>
                                            <button
                                              onClick={() => {
                                                deleteComment(
                                                  comment.comment_id
                                                );
                                              }}
                                            >
                                              Remove comment
                                            </button>
                                            <button
                                              id={`editCommentBTN${comment.comment_id}`}
                                              onClick={() => {
                                                editComment(comment.comment_id);
                                              }}
                                            >
                                              Edit
                                            </button>
                                          </div>
                                        ) : post.user_id == current_ID ? (
                                          <div>
                                            <button
                                              onClick={() => {
                                                deleteComment(
                                                  comment.comment_id
                                                );
                                              }}
                                            >
                                              Remove comment
                                            </button>
                                          </div>
                                        ) : null}
                                      </div>
                                      <br />
                                      <div className="form-outline w-100">
                                        <p id={`comment${comment.comment_id}`}>
                                          {comment.comment_content}
                                        </p>
                                        <form
                                          id={`editCommentForm${comment.comment_id}`}
                                          action=""
                                          style={{ display: "none" }}
                                          onSubmit={handleEditCommentSubmit}
                                        >
                                          <input
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
                                          <button type="submit">Update</button>
                                          <button
                                            style={{
                                              background: "red",
                                              color: "white",
                                            }}
                                            onClick={() => {
                                              cancleCommentEdit(
                                                comment.comment_id
                                              );
                                            }}
                                            type="button"
                                          >
                                            Cancle
                                          </button>
                                        </form>

                                        <p>{comment.comment_created_at}</p>
                                      </div>
                                      <hr />
                                    </div>
                                  );
                                }
                              })}
                            </div>
                            <div
                              className="card-footer py-3 border-0"
                              style={{ backgroundColor: "#f8f9fa" }}
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
                                    style={{ background: "#fff" }}
                                    onChange={handleChange}
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-sm"
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
