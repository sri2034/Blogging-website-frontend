import React from 'react';
import '../css/Blog.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  }
  const deleteRequest = async()=> {
    const res =  await axios.delete(`https://blogging-website-main-backend.onrender.com/api/blog/${id}`).catch(err => alert(err));
    const data = await res.data;
    return data
  }
  const handleDelete = () => {
    deleteRequest().then(alert("Blog Deleted successfully.")).then(() => navigate("/"));
  };
  return (
    <div className="card">
        <div className="card-content">
            <div className="card-header">
              <div className="avatar">
                <div className="avatar-letter">{userName ? userName.charAt(0) : ""}</div>
              </div>
              <div className="title">{title}</div>
            </div>
            <img className="card-image" src={imageURL} alt="CardImage" />
            <hr/>
            <div className="card-description">
            <b className='uname'>{userName}{":"}</b> {description}
            </div>
        </div>

        {isUser && (<div className="card-actions">
            <button className="edit-button" onClick={handleEdit}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>)}
    </div>

  )
}

export default Blog