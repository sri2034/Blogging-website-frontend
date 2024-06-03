import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Profile.css';
import axios from 'axios';

const Profile = ({ setIsLoggedIn }) => {
    const location = useLocation();
    const [user,setUser] = useState('');
    useEffect(() => {
        const path = location.pathname;
        if(path === '/profile'){
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if(storedUser){
                setUser(storedUser);
            }
        }
    },[location]);
    const handleAccDelete = async() => {
        try {
            const res = await axios.delete(`https://blogging-website-main-backend.onrender.com/api/user/deleteAccount`, {data: {email:user.email}});
            if(res.status === 200) {
                localStorage.removeItem('userId');
                setIsLoggedIn(false);
                alert("Account Deleted Successfully.");
            }
        } 
        catch(err) {
            console.log(err);
        }
    };
  return (
    <table className='profile-table'>
        <caption>
            <div className='up'>
                <div className="name">
                    {user && user.name.charAt(0)}
                </div>
                <div className="changedp">
                    <label htmlFor='uploadfile'>
                        <i className="fa-solid fa-pen fa-2xs" style={{color: '#fff'}} ></i>
                    </label>
                    <input type='file' id='uploadfile' name='dp' accept='image/*' />
                </div>
            </div>
        </caption>
        <tbody>
            <tr>
                <td>NAME:</td>
                <td>{user && user.name }</td>
            </tr>
            <tr>
                <td>USERNAME:</td>
                <td>{user && user.username}</td>
            </tr>
            <tr>
                <td>EMAIL:</td>
                <td>{user && user.email}</td>
            </tr>
            <tr>
                <td>BIRTHDATE:</td>
                <td>{user && new Date(user.birthdate).toLocaleDateString('en-us',{day:'2-digit',month:'2-digit',year:'numeric'})}</td>
            </tr>
            <tr><td colSpan="2"></td></tr>
        </tbody>
        <tfoot>
        <tr className="no-bg">
            <td className='left'><Link to="/ChangePwd"><button className='cpbtn' >Change Password</button></Link></td>
            <td className='right'><button className='dbtn' onClick={handleAccDelete}>Delete Account</button></td>
        </tr>
        </tfoot>
    </table>
  )
}

export default Profile
