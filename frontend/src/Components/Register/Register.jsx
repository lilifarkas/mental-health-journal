import React from 'react';
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';

export default function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [pwType, setPwType] = useState('password');
  const [eyeType, setEyeType] = useState(eye);
  const [pwStatus, setPwStatus] = useState(2);
  const [btnVisibility, setBtnVisibility] = useState('visible');


  function ChangePasswordType() {
    if (pwType === 'password') {
      setPwType('text')
      setEyeType(eyeslash)
    }
    else {
      setPwType('password')
      setEyeType(eye)
    }
  }

  async function RegisterUser(e) {
    e.preventDefault();
    let response = await fetch('https://localhost:5001/users/add', {
      body: JSON.stringify({
        "Name": userName,
        "Password": password,
        "Email": email,
        "Points": 0
      }),
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    })
    let result = await response.json();
    if (result.ok) {
      console.log(`Name: ${result.Name}`)
      console.log(`Email: ${result.Email}`)
      console.log(`Points: ${result.Points}`)
    }
    else {
      console.warn("Something went wrong! Please try again later");
    }
  }

  return (
    <>
      <div className='RegisterContainer'>
        <h1 className='header mb-5 center'>Create Account</h1>
        <form className='needs-validation' onSubmit={(e) => RegisterUser(e)} noValidate>
          <div className="form-floating mb-3">
            <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id='floatingUsername' placeholder="Username" />
            <label  className='input-label' htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label  className='input-label' htmlFor="floatingInput">Email address</label>
            <div class="invalid-feedback">
              Please choose a username.
            </div>
          </div>
          <div className='password-fields'>
            <div className="form-floating mb-3 pw">
              <input onChange={(e) => setPassword(e.target.value)} type={pwType} className="form-control" id="button-addon1" placeholder="Password" />
              <label className='input-label' htmlFor="button-addon1">Password</label>
              {/* <span className="input-group-text" id="basic-addon1">
            <button className="btn" onClick={(e) => ChangePasswordType(e)}><img src={eyeType} /></button>
          </span> */}
            </div>
            <div className="input-group form-floating mb-3 pw">
              <input onChange={(e) => setPasswordConfirm(e.target.value)} type={pwType} className="form-control" id="button-addon2" placeholder="Confirm Password" />
              <label  className='input-label' htmlFor="button-addon2">Confirm Password</label>
              <span className="input-group-text" id="basic-addon1">
                <button type='submit' className="btn" onClick={(e) => ChangePasswordType(e)}><img src={eyeType} /></button>
              </span>
            </div>
          </div>

          {
            pwStatus === 0 && <div className="spinner-border text-success" role="status">
              <span className="sr-only"></span>
            </div>
          }
          <button type="submit" style={{ visibility: { btnVisibility } }} id='submitBtn' className="btn btn-success">Register</button>
        </form>
      </div>
    </>
  )
}
