import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/js/Header';
import UserBlogs from './components/js/UserBlogs';
import Blogs from './components/js/Blogs';
import BlogDetails from './components/js/BlogDetails';
import AddBlog from './components/js/AddBlog';
import SignupForm from './components/js/SignupForm';
import LoginForm from './components/js/LoginForm';
import Profile from './components/js/Profile';
import ChangePwd from './components/js/ChangePwd';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
      <header>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Routes>
          <Route
            path="/signup"
            element={<SignupForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          {isLoggedIn && (
            <React.Fragment>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/ChangePwd" element={<ChangePwd />} />
            </React.Fragment>
          )}
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/blogs" />
              ) : (
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;