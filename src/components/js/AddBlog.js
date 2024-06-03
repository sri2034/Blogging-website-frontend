import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/AddBlog.css';

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    const default_image_url = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.webp?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";
      const imageUrl = inputs.imageURL || default_image_url;
      const res = await axios.post("https://blogging-website-main-backend.onrender.com/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: imageUrl,
        user: localStorage.getItem("userId"),
      }).catch(err => console.log(err));
      const data = res.data;
      return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(alert("Blog Added Successfully.")).then(() => {
      navigate("/myBlogs");
    });
  };

  return (
      <form className="addblog" onSubmit={handleSubmit}>
        <table>
          <caption><h1>POST YOUR BLOG</h1></caption>
          <tbody>
            <tr>
              <td><label>Title</label></td>
            </tr>
            <tr>
              <td><input type="text" name="title" value={inputs.title} onChange={handleChange} required/></td>
            </tr>
            <tr>
              <td><label>Description</label></td>
            </tr>
            <tr>
              <td><textarea name="description" value={inputs.description} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>ImageURL</label></td>
            </tr>
            <tr>
              <td><input type="text" name="imageURL" value={inputs.imageURL} onChange={handleChange}/></td>
            </tr>
            <tr>
              <td className="center"><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
      </form>
  );
};
export default AddBlog
