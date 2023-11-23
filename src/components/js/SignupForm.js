import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Form.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('signup');
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    birthdate: '',
    email: '',
    password: '',
    otp: '', 
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('https://blogging-website-main-backend.onrender.com/api/user/signup', {
        name: inputs.name,
        username: inputs.username,
        birthdate: inputs.birthdate,
        email: inputs.email,
        password: inputs.password,
        otp: inputs.otp,
      });
  
      if (res.data.message === 'OTP Sent') {
        setStep('otpVerification');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("User Already Exists! Try Logging In");
        navigate('login');
      }
      else if (err.response && err.response.status === 403){
        alert("OTP Verification needs to be completed.Please complete now");
        setStep('otpVerification');
      } 
      else {
        alert('Error signing up. Please try again.');
      }
    }
  };

  const handleOtpVerificationSuccess = (data) => {
    localStorage.setItem('userId', data.user._id);
    navigate('/login');
    alert('SIGNUP SUCCESSFUL. PLEASE LOGIN NOW.');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (step === 'signup') {
      await sendRequest();
    } else if (step === 'otpVerification') {
      try {
        const res = await axios.post('https://blogging-website-main-backend.onrender.com/api/user/verify-otp', {
          email: inputs.email,
          otp: inputs.otp,
        });
  
        if (res.data.isVerified) {
          handleOtpVerificationSuccess(res.data);
        } else {
          alert('Invalid OTP. Please try again.');
        }
      } catch (err) {
        console.error(err);
        alert('Error verifying OTP. Please try again.');
      }
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2 id='formTitle'>{step === 'signup' ? 'SIGNUP' : 'OTP VERIFICATION'}</h2>
        <input
          type='text'
          placeholder='Name'
          value={inputs.name}
          onChange={handleChange}
          name='name'
          required
        />
        <input
          type='text'
          placeholder='Username'
          value={inputs.username}
          onChange={handleChange}
          name='username'
          required
        />
        <input
          type='date'
          placeholder='Birthdate'
          value={inputs.birthdate}
          onChange={handleChange}
          name='birthdate'
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={inputs.email}
          onChange={handleChange}
          name='email'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={inputs.password}
          onChange={handleChange}
          name='password'
          required
        />
        {step === 'otpVerification' && (
          <input
            type='text'
            placeholder='OTP'
            value={inputs.otp}
            onChange={handleChange}
            name='otp'
            required
          />
        )}
        <button type='submit' id='submitButton'>
          {step === 'signup' ? 'Submit' : 'Verify OTP'}
        </button>
        {step === 'signup' && (
          <Link to="/login">
            <button type='button' id='toggleButton'>Change To Login</button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default SignupForm;