import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';




function Group() {


const current_ID = JSON.parse(localStorage.getItem('id'));

const [groups , setGroups] = useState([]);

const [text, setText] = useState("");
const [file, setFile] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("user_id", current_ID);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:80/platform/react_project/upload.php",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


    useEffect(()=>{
        getGroups();
    } , [])

    function getGroups(){
        axios.get(`http://localhost:80/platform/react_project/upload.php/`)
        .then(response => {
            console.log(response.data);
            setGroups(response.data);
            window.location.assign('/group');
        })
    }


    const  deleteGroup = (id) => {
      axios.delete(`http://localhost:80/platform/react_project/upload.php/${id}`).then(function(response){
        getGroups();
      })
    }

    let i = 1;

  return (
    <div>


    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Text</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>


    <table style={{width : '100%'}}>
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Admin</th>
            <th scope="col">Name of Group</th>
            <th scope="col">Image</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
                { groups.map((element,index) => {
                    return <tr key={index}>
                        {console.log(element.id)}
                        <td  style={{paddingLeft : "10px" }}>{i++}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.first_name} {element.last_name}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.group_name}</td>
                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src={require(`./images/${element.group_image}`)} /></td>
                        <td><button onClick={() => {deleteGroup(element.group_id)}} style={{backgroundColor : 'red' , color : 'white'}}>Delete</button></td>
                    </tr>
                })}
        </tbody>
      </table>







    </div>
  );
}

export default Group
