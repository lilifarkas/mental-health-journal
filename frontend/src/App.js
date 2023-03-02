import React, { useState, useEffect, Outlet } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Register from './Components/Register/Register.jsx';
import Profile from "./Components/Profile/Profile"
import LandingPage from "./Components/LandingPage/LandingPage";
import Tasks from "./Components/Tasks/Tasks";
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login.jsx';
import EditProfile from './Components/Profile/EditProfile'
import jwt_decode from "jwt-decode";
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    localStorage.setItem("jwtToken", token);
    setUser(jwt_decode(token));
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  return (
    <>
      {user && <NavBar handleLogout={handleLogout} user={user}/>}

      <Routes>
        <Route index element ={<LandingPage />} />
        <Route path='/registration' element={<Register />} />

        <Route element={<ProtectedRoute user={user}/>}>
          <Route path='/main' element = {<MainPage/>}/>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/edit/:id" element={<EditProfile />} />
          <Route path='/tasks' element={<Tasks />}></Route>
        </Route>     
        
        <Route path='/login' element={<Login onLogin={handleLogin}/>} />
      </Routes>
    </>
  );
}

export default App;
