import React from 'react';
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';

export default function Login() {

  let loader = document.querySelector('.loadingContainer');
  let regContainer = document.querySelector('.RegisterContainer');
  let cancelButton = document.querySelector('.btn-secondary');
  const controller = new AbortController();
  const { signal } = controller;

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [pwType, setPwType] = useState('password');
  const [eyeType, setEyeType] = useState(eye);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);


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

  let timeoutId;
  function AbortFunction() {
    controller.abort();
    clearTimeout(timeoutId)
    loader.style.visibility = 'hidden';
    cancelButton.style.visibility = 'hidden';
  }


  async function RegisterUser(e) {
    setLoading(true);
    e.preventDefault();
    cancelButton.style.visibility = 'visible';
    loader.style.visibility = 'visible';
    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch('https://localhost:7270/users/add', {
          signal,
          body: JSON.stringify({
            "Name": userName,
            "Password": password,
            "Email": email,
            "Points": 0
          }),
          method: "POST",
          headers: { 'Content-Type': 'application/json' }
        });
        let result = await response.json();

        if (response.ok) {
          console.log(`Success!\nUser ID: ${JSON.stringify(result.id)}`);
          setValid(true);
        }
        else {
          console.warn(`Something went wrong! Please try again later\nERROR:\n ${result}`);
        }
      }
      catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request was cancelled by the user');
        } else {
          console.error(`ERROR: ${error}`);
        }
      }
      cancelButton.style.visibility = 'hidden';
      loader.style.visibility = 'hidden';
    }, 2000);
    setLoading(false)
  }

  return (
    <>
      <div className='RegisterContainer'>
        <div className='loadingContainer'>
          <span className="loader"></span>
        </div>
        <h1 className='header mb-5 center'>Create Account</h1>
        <form className='needs-validation' onSubmit={(e) => RegisterUser(e)} noValidate>
          <div className="form-floating mb-3">
            <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id='floatingUsername' placeholder="Username" />
            <label className='input-label' htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label className='input-label' htmlFor="floatingInput">Email address</label>
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
          <div className='password-fields'>
            <div className="form-floating mb-3 pw">
              <input onChange={(e) => setPassword(e.target.value)} type={pwType} className="form-control" id="button-addon1" placeholder="Password" />
              <label className='input-label' htmlFor="button-addon1">Password</label>
            </div>
            <div className="input-group form-floating mb-3 pw">
              <input onChange={(e) => setPasswordConfirm(e.target.value)} type={pwType} className="form-control" id="button-addon2" placeholder="Confirm Password" />
              <label className='input-label' htmlFor="button-addon2">Confirm Password</label>
              <span className="input-group-text" id="basic-addon1">
                <button type='button' className="btn" onClick={(e) => ChangePasswordType(e)}><img src={eyeType} /></button>
              </span>
            </div>
          </div>

          <button type="submit" id='submitBtn' className="btn btn-success">
            Register
          </button>
          {valid === true && navigate("/main")}
          {/* {valid === true && navigate("/login")} */}
          <button type='button' onClick={() => AbortFunction()} id='cancelBtn' className='btn btn-secondary'>Cancel</button>
        </form>
      </div>
    </>
  )
}
