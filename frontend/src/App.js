import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Register from './Components/Register/Register.jsx';
import Profile from "./Components/Profile/Profile"
import LandingPage from "./Components/LandingPage/LandingPage";
import Tasks from "./Components/Tasks/Tasks";
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login.jsx';
import EditProfile from './Components/Profile/EditProfile'
import Admin from './Components/Admin/Admin'
import jwt_decode from "jwt-decode";
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
      setToken(token)
      navigate('/main', { replace: true });
    }
  }, []);

  const handleLogin = (responeToken) => {

    if (responeToken) {
      localStorage.setItem("jwtToken", responeToken);
      setUser(jwt_decode(responeToken));
      navigate('/main', { replace: true });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    setToken(null);
    navigate('/', { replace: true });
  };

  return (
    <>
      {user && <NavBar handleLogout={handleLogout} user={user}/>}
      <div className='container-fluid p-0'>
        <Routes>        
          <Route element={<ProtectedRoute user={user}/>}>
            <Route path='/main' element = {<MainPage/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path='/tasks' element={<Tasks user={user} jwtToken={token} />}/>
            <Route path='/admin' element={<Admin />} />
          </Route>     
          
        {!user && (<><Route path='/login' element={<Login onLogin={handleLogin}/>} />
          <Route path = '/' element ={<LandingPage />} />
          <Route path='/registration' element={<Register />} /></>)}
        </Routes>
      </div>
    </>
  );
}

export default App;
