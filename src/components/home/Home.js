import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEdit } from "react-icons/fa";
import { CgSoftwareUpload } from "react-icons/cg";
import { useState, useEffect } from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import "./Home.css";

function Home() {
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
    getComments();
    getLikes();
    getUser();
  }, []);

  function getUser() {
    axios
      .get(
        `http://localhost:80/platform/react_project/userProfile.php/${current_ID}`
      )
      .then((response) => {
        setUser(response.data);
      });
  }

  // Posts

  async function getPosts() {
    await axios
      .get(
        `http://localhost:80/platform/react_project/specificPosts.php/${current_ID}`
      )
      .then((response) => {
        setPosts(response.data);
        getLikes();
      })
      .then(async function getLikes() {
        await axios
          .get(`http://localhost:80/platform/react_project/likes.php/`)
          .then((response) => {
            setLikes(response.data);
          });
      })
      .then(async function getComments() {
        await axios
          .get(`http://localhost:80/platform/react_project/comments.php/`)
          .then((response) => {
            setComments(response.data);
          });
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
      window.location.assign('/home');
      // getPosts();
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

    try {
      const response = await axios.post(
        "http://localhost:80/platform/react_project/postEdit.php",
        formEditData
      );
      // window.location.assign('/home');
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:80/platform/react_project/posts.php/${id}`)
      .then(function (response) {
        getPosts();
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
  const updatePostEditImage = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    document.getElementById(`imgPost${id}`).style.display = "block";
    getPosts();
  };
  const updatePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = "block";
    document.getElementById(`editPostForm${id}`).style.display = "none";
    document.getElementById(`editPostBTN${id}`).style.display = "inline-block";
    getPosts();
  };

  const cancleCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
    document.getElementById(`editCommentBTN${id}`).style.display =
      "inline-block";
  };
  const updateCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = "block";
    document.getElementById(`editCommentForm${id}`).style.display = "none";
    document.getElementById(`editCommentBTN${id}`).style.display =
      "inline-block";
      getComments();
      getPosts();
  };

  // Likes

  const getLikes = async () => {
    await axios
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

  const likePost = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:80/platform/react_project/likes.php/", inputs)
      .then(getPosts());
  };
  const removeLikePost = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:80/platform/react_project/likeDelete.php/",
        inputs
      )
      .then(getPosts());
  };

  function changeColor(id) {
    document.getElementById(id).style.color = "red";
  }
  function returnColor(id) {
    document.getElementById(id).style.color = "blue";
  }
  function showMoreComments(id) {
    document.getElementById(`littleCommentsOnPost${id}`).style.display = "none";
    document.getElementById(`allCommentsOnPost${id}`).style.display = "block";
  }
  function showLittleComments(id) {
    document.getElementById(`littleCommentsOnPost${id}`).style.display =
      "block";
    document.getElementById(`allCommentsOnPost${id}`).style.display = "none";
  }

  var like_count = 0;
  var comment_count = 0;
  var comment_count_show = 0;

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div
        className="homeContainer"
        style={{ top: "86px", position: "absolute", left: "215px" }}
      >
        <div
          style={{
            width: "40vw",
            position: "absolute",
            top: "8vw",
            left: "10vw",
          }}
          className="d-flex flex-start"
        >
          {user.map((Oneuser, index_user) => {
            return (
              <img
                key={index_user}
                className="rounded-circle shadow-1-strong me-3"
                src={require(`../images/${Oneuser.image}`)}
                alt="avatar"
                style={{ width: "5vw", height: "5vw", marginLeft: "3vw" }}
              />
            );
          })}
          <form
            className="form-outline"
            onSubmit={handleImagePost}
            style={{ bottom: "-3vw", position: "absolute", left: "10vw" }}
          >
            <textarea
              placeholder="Write something . . ."
              className="form-control"
              id={current_ID}
              rows={4}
              style={{ background: "#fff", width: "50vw" }}
              onChange={handlePost}
            />
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
            <label className="label" for="file">
              <CgSoftwareUpload size={20} />
              Choose file
            </label>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              id="ShareBtnHome"
            >
              Share
            </button>
          </form>
        </div>
        <div>
          {posts.map((post, index_post) => {
            like_count = 0;
            var flagLike = false;
            console.log(posts);
            return (
              <section
                style={{ backgroundColor: "#eee", marginTop: "17vw" }}
                key={index_post}
              >
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <img
                                  className="rounded-circle shadow-1-strong me-3"
                                  src={require(`../images/${post.image}`)}
                                  alt="avatar"
                                  style={{ width: "3vw", height: "3vw" }}
                                />
                                <div>
                                  <h6 className="fw-bold text-primary mb-1">
                                    {post.first_name} {post.last_name}
                                  </h6>
                                  <p className="text-muted small mb-0">
                                    {post.created_at}
                                  </p>
                                </div>
                                {post.group_id > 0 ? (
                                  <p
                                    style={{
                                      marginTop: "-2px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    {" "}
                                    shared this post in{" "}
                                    <a href={`/groups/${post.group_id}/show`}>
                                      {post.group_name}
                                    </a>{" "}
                                    group
                                  </p>
                                ) : null}
                              </div>
                            </div>
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
                                  <FaEdit />
                                </button>
                              </div>
                            ) : null}
                          </div>
                          {post.post_image != "a" ? (
                            <div>
                              <p
                                id={`post${post.post_id}`}
                                className="mt-3 mb-4 pb-2"
                              >
                                {post.content}
                              </p>

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

                                <br />

                                <input
                                  type="file"
                                  id="file"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />

                                <button type="submit" onClick={() => {
                                    updatePostEditImage(post.post_id);
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

                              <img
                                id={`imgPost${post.post_id}`}
                                src={require(`../images/${post.post_image}`)}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div>
                              <p
                                id={`post${post.post_id}`}
                                className="mt-3 mb-4 pb-2"
                              >
                                {post.content}
                              </p>

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
                          <div
                            className="small d-flex"
                            style={{
                              justifyContent: "space-between",
                              gap: "1px",
                            }}
                          >
                            {likes.map((like, index_like) => {
                              if (
                                like.user_id == current_ID &&
                                like.post_id == post.post_id
                              ) {
                                return (flagLike = true);
                              }
                            })}

                            {flagLike == true ? (
                              <div>
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
                              </div>
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
                                  <p className="mb-0">Like</p>
                                </button>
                              </form>
                            )}
                            {likes.map((count) => {
                              if (count.post_id == post.post_id) {
                                like_count++;
                              }
                            })}
                            <span
                              className="postLikeCounter"
                              style={{ marginRight: "38vw" }}
                            >
                              ({like_count})people like it
                            </span>

                            <a
                              onClick={() => foucsOnComment(post.post_id)}
                              href="#!"
                            >
                              <i className="far fa-comment-dots me-2" />
                              <p style={{ display: "none" }}>
                                {(comment_count = 0)}
                              </p>
                              {comments.map((count) => {
                                if (count.post_id == post.post_id) {
                                  comment_count++;
                                }
                              })}
                              <p className="mb-0">Comment({comment_count})</p>
                            </a>
                          </div>
                        </div>
                        <div style={{ backgroundColor: "#f8f9fa" }}>
                          <div id={`littleCommentsOnPost${post.post_id}`}>
                            <p style={{ display: "none" }}>
                              {(comment_count_show = 0)}
                            </p>
                            {comments.map((comment, index_comment) => {
                              if (comment.post_id == post.post_id) {
                                if (comment_count_show < 1) {
                                  comment_count_show++;
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
                                            alt=""
                                            src={require(`../images/${comment.image}`)}
                                            style={{
                                              width: "3vw",
                                              height: "3vw",
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
                                              <FaEdit />
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
                                          <button type="submit" onClick={() => {
                                              updateCommentEdit(
                                                comment.comment_id
                                              );
                                            }}>Update</button>
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
                              }
                            })}
                            {comment_count > comment_count_show ? (
                              <div
                                id="showMoreComments"
                                style={{ cursor: "pointer", color: "blue" }}
                                onMouseOver={() => {
                                  changeColor("showMoreComments");
                                }}
                                onMouseOut={() => {
                                  returnColor("showMoreComments");
                                }}
                                onClick={() => {
                                  showMoreComments(post.post_id);
                                }}
                              >
                                Load more comments
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="w-100"
                            id={`allCommentsOnPost${post.post_id}`}
                            style={{ display: "none" }}
                          >
                            <p style={{ display: "none" }}>
                              {(comment_count_show = 0)}
                            </p>
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
                                          alt=""
                                          src={require(`../images/${comment.image}`)}
                                          style={{
                                            width: "3vw",
                                            height: "3vw",
                                          }}
                                        />
                                        <span>{comment.first_name}</span>
                                      </div>
                                      {comment.user_id == current_ID ? (
                                        <div>
                                          <button
                                            onClick={() => {
                                              deleteComment(comment.comment_id);
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
                                            <FaEdit />
                                          </button>
                                        </div>
                                      ) : post.user_id == current_ID ? (
                                        <div>
                                          <button
                                            onClick={() => {
                                              deleteComment(comment.comment_id);
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
                                          defaultValue={comment.comment_content}
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
                            {comment_count > comment_count_show ? (
                              <div
                                id="showLittleComments"
                                style={{ cursor: "pointer", color: "blue" }}
                                onMouseOver={() => {
                                  changeColor("showMoreComments");
                                }}
                                onMouseOut={() => {
                                  returnColor("showMoreComments");
                                }}
                                onClick={() => {
                                  showLittleComments(post.post_id);
                                }}
                              >
                                Load less comments
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="card-footer py-3 border-0"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="d-flex flex-start w-100">
                              {user.map((Oneuser, index) => {
                                return (
                                  <img
                                    key={index}
                                    className="rounded-circle shadow-1-strong me-3"
                                    src={require(`../images/${Oneuser.image}`)}
                                    alt="avatar"
                                    style={{ width: "3vw", height: "3vw" }}
                                  />
                                );
                              })}
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
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      {" "}
    </div>
  );
}

export default Home;
