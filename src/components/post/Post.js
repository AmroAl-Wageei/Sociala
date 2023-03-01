import React from "react";
import "./post.css";
import { Users } from "../../dummyData";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import Dropdown from "react-bootstrap/Dropdown";
import { CgBorderStyleDotted } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { CgSoftwareUpload } from "react-icons/cg";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function Post({ post }) {
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

  useEffect(() => {
    getPosts();
    getComments();
    getLikes();
  }, []);

  // Posts

  async function getPosts() {
    await axios
      .get(`http://localhost:80/platform/react_project/posts.php/`)
      .then((response) => {
        setPosts(response.data);
        getComments();
        getLikes();
      })
      .then(async function getLikes() {
        await axios
          .get(`http://localhost:80/platform/react_project/likes.php/`)
          .then((response) => {
            setLikes(response.data);
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

  const deletePost = async (id) => {
    await axios
      .delete(`http://localhost:80/platform/react_project/posts.php/${id}`)
      .then(function (response) {
        window.location.assign(`/profile/${profile_id}`);
      });
  };

  // Comments

  async function getComments() {
    await axios
      .get(`http://localhost:80/platform/react_project/comments.php/`)
      .then((response) => {
        setComments(response.data);
      });
  }

  const handleCreateComment = async (e) => {
    e.preventDefault();
    await axios
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

  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();
    await axios
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

  const getLikes = async () => {
    await axios
      .get(`http://localhost:80/platform/react_project/likes.php/`)
      .then((response) => {
        setLikes(response.data);
      });
  };

  const handleLikePost = async (id) => {
    const post_id = id;
    const user_id = current_ID;
    setInputs({ user_id: user_id, post_id: post_id });
  };

  const likePost = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await axios
      .post("http://localhost:80/platform/react_project/likes.php/", inputs)
      .then(getPosts());
  };
  const removeLikePost = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await axios
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
                <h3 className="postDate">{post.created_at}</h3>
              </div>
              <div>
                {post.user_id === current_ID ? (
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

                        <button type="submit" className="UpdateBtn">
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

                    <button type="submit">Update</button>
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
          <span id={`post${post.post_id}`} className="postText">
            {post.content}
          </span>
          {post.post_image !== "a" ? (
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
          <div className="postBottomRight">
            <a
              href={`/profile/${profile_id}/post/${post.post_id}`}
              className="postCommenttextLink"
            >
              <span className="postCommenttext">Comments</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
