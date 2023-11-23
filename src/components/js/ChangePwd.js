import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Form.css';

const ChangePwd = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user,setUser] = useState('');
    useEffect(() => {
        const path = location.pathname;
        if(path === '/ChangePwd'){
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if(storedUser){
                setUser(storedUser);
            }
        }
    },[location]);
    const [inputs,setInputs] = useState({
        oldpassword: '',
        newpassword: '',
        cnewpassword: ''
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(inputs.newpassword === inputs.cnewpassword){
                await axios.post(`https://blogging-website-main-backend.onrender.com/api/user/ChangePwd`,{
                    email: user.email,
                    oldpassword: inputs.oldpassword,
                    newpassword: inputs.newpassword
                });
                alert('Password Updated Successfully.');
                navigate('/profile');
            } else {
                alert('New Password and Re-Entered New Password does not match.');
            }
        } 
        catch(err) {
            if(err.response && err.response.status === 403) {
                alert('Entered Old Password did not match the Old Password in the Database.');
            }
            else if(err.response && err.response.status === 404) {
                alert('User not found');
            }
            else {
                alert(err);
            };
        }
    };
  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <label>OLD PASSWORD</label>
            <input type="password" placeholder='Enter your Old Password'  name='oldpassword' value={inputs.oldpassword} onChange={handleChange} required />
            <label>NEW PASSWORD</label>
            <input type="password" placeholder='Enter your New Password' name='newpassword' value={inputs.newpassword} onChange={handleChange} minLength="6" required />
            <label>RE-ENTER NEW PASSWORD</label>
            <input type="password" placeholder='Re-Enter your New Password' name='cnewpassword' value={inputs.cnewpassword} onChange={handleChange} minLength="6" required />
            <button type='submit' id='toggleButton'>Change Password</button>
        </form>
    </div>
  );
}

export default ChangePwd