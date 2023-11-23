import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Form.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('https://blogging-website-main-backend.onrender.com/api/user/login', {
        email: inputs.email,
        password: inputs.password,
      });

      const data = res.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Couldn't Find User By This Email.");
      } else if (error.response && error.response.status === 400) {
        alert('Incorrect Password.');
      } else if (error.response && error.response.status === 403) {
        alert('User not verified. Please complete the verification process.');
      } else {
        alert('LOGIN FAILED.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        if (data) {
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem('user', JSON.stringify(data.user));
          setIsLoggedIn(true);
          navigate('/blogs');
          alert('LOGIN SUCCESSFUL.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 id="formTitle">LOGIN</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <button type="submit" id="submitButton">
          Submit
        </button>
        <Link to="/signup">
          <button type="button" id="toggleButton">
            Change To Signup
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;