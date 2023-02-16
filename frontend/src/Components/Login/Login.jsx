import React from 'react';
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';
export default function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [pwType, setPwType] = useState('password');
  const [eyeType, setEyeType] = useState(eye);
  const [pwStatus, setPwStatus] = useState(2);
  const [btnVisibility, setBtnVisibility] = useState('visible');
  const params = {
    username: userName,
  }

  function ChangePasswordType() {
    if (pwType == 'password') {
      setPwType('text')
      setEyeType(eyeslash)
    }
    else {
      setPwType('password')
      setEyeType(eye)
    }
  }

  async function Submit(e) {
    e.PreventDefault();
    setBtnVisibility('hidden')
    let response = await fetch('https://localhost:3000/login');
    setPwStatus(0);
    let result = await response.json()
    if (result.ok) {
      setPwStatus(1);
    }
  }

  // async function loginFunction(e) {
  //     e.preventDefault();
  //     let response = await fetch(`/api/login`, {
  //         headers: { password: password, username: userName }
  //     });
  //     let result = await response.json()
  //     if (response.ok) {
  //         console.log(result)
  //         sessionStorage.setItem('jwt', result.token);
  //         //console.log()
  //         //navigate()
  //     }
  // }
  return (
    <>
      <div className='LoginContainer'>
        <h1 className='header mb-5 center'>Login</h1>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" id='floatingUsername' placeholder="Username" />
          <label htmlFor="floatingInput">Username</label>
        </div>

        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="input-group form-floating mb-3">
          <input type={pwType} className="form-control" id="button-addon1" placeholder="Password" />
          <label htmlFor="button-addon1">Password</label>
          <span className="input-group-text" id="basic-addon1">
            <button className="btn" onClick={(e) => ChangePasswordType(e)}><img src={eyeType} /></button>
          </span>
        </div>
        {
          pwStatus == 0 && <div className="spinner-border text-success" role="status">
            <span className="sr-only"></span>
          </div>
        }
        <button onSubmit={(e) => Submit(e)} type="submit" style={{ visibility: { btnVisibility } }} id='submitBtn' className="btn btn-success">Log In</button>
      </div>
    </>
  )
}
