import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Register from './Components/Register/Register.jsx';
import Profile from "./Components/Profile/Profile"
import LandingPage from "./Components/LandingPage/LandingPage";
import Tasks from "./Components/Tasks/Tasks";
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login.jsx';
import EditProfile from './Components/Profile/EditProfile'
import Admin from './Components/Admin/Admin'

function App() {
  const location = useLocation();
  const excludedPaths = ['/', '/registration', '/login', '/profile/edit'];

  return (
    <div>
      {!excludedPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/registration' element={<Register />} />
        <Route path="/main" element={<MainPage />}></Route>
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/edit" element={<EditProfile />} />
        <Route path='/tasks' element={<Tasks />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
