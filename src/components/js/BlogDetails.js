import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../css/BlogDetails.css';

const BlogDetails = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const fetchDetails = async() => {
    const res = await axios.get(`http://127.0.0.1:4000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=> {
    fetchDetails().then(data => {
      setBlog(data.blog);
      setInputs({title:data.blog.title,description:data.blog.description,imageURL: data.blog.image});
    })
  },[id]);
  const sendRequest = async () => {
    const default_image_url = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.webp?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";
    const imageUrl = inputs.imageURL || default_image_url;
    const res = axios.put(`http://127.0.0.1:4000/api/blog/update/${id}`,{
      title: inputs.title,
      description: inputs.description,
      image: imageUrl
    }).catch(err => alert(err));

    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(alert("Blog Updated Successfully.")).then(() => navigate("/myBlogs"));
  }
  return (
    <>
      {inputs &&
      <form className="editblog" onSubmit={handleSubmit}>
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
      </form>}
    </>
  );
};

export default BlogDetails