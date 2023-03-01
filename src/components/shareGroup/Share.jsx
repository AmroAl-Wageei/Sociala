import "./share.css";
import { MdPermMedia,MdLabelImportantOutline,MdOutlineMeetingRoom,MdEmojiEmotions } from 'react-icons/md';
import { useEffect, useState } from "react";
import axios from "axios";


export default function Share(props) {


  const group_id = props.group_id;

  const current_ID = JSON.parse(localStorage.getItem('id'));
  const ImageUser = localStorage.getItem('image');

  const [users,setUsers] = useState([]);
  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);


  const [file, setFile] = useState(null);

  useEffect(()=>{
    getUsers();
  

},[]);
  const getUsers = async () => {

    await axios.get(`http://localhost:80/platform/react_project/user.php/read/${current_ID}`)
    .then((respone)=>{
        setUsers(respone.data[0])
       
    })
}

// create post
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
    // window.location.assign(`/groups/${group_id}/show`);
  } catch (error) {
    console.error(error);
  }
};

const handlePost = (e) => {
  const value = e.target.value;
  setInputs(value)
}
  return (
    <form onSubmit={handleImagePost}>
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={require(`../images/${props.user[0]['image']}`)} alt="" />
          <input
            placeholder={`What's in your mind ${props.user[0]['first_name']}?`}
            className="shareInput"
            id={current_ID} rows={4} style={{background: '#fff'}} onChange={handlePost}
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    {/* <MdPermMedia htmlColor="tomato" className="shareIcon"/> */}
                    <input
            type="file"
            className="shareInput" id="file"
            onChange={(e) => setFile(e.target.files[0])}/>                
            </div>
            </div>
            <button type="submit" onClick={() => window.location.reload(true)} className="shareButton">Post</button>
        </div>
      </div>
    </div>
    </form>
  );
}