import React from "react";
import "./sharePost.css";
import { Users } from "../../dummyData";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CgSoftwareUpload } from "react-icons/cg";

export default function Share({ user }) {

  console.log(user)
  const [like, setLike] = useState("");

  const { profile_id } = useParams();

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

  function getPosts() {
    axios
      .get(`http://localhost:80/platform/react_project/posts.php/`)
      .then((response) => {
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

  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={handleImagePost}>
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={require(`../images/${user.image}`)}
              alt=""
            />
            <input
              id={current_ID}
              placeholder={`What's in your mind ${user.first_name}?`}
              className="shareInput"
              onChange={handlePost}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
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
              </div>
            </div>
            <div className="shareOptions">
              <div className="shareOption">
                <button type="submit" className="shareButton">
                  Share
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// <div className="shareOption">
//                     <input type="file" className="shareInput" id="file" onChange={(e) => setFile(e.target.files[0])} hidden/>
