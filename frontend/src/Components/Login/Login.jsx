import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let loginText = document.querySelector('.LoginText');
  let loginLoader = document.querySelector('.LoginLoaderContainer');

  function loginFunction(e) {
    e.preventDefault();
    loginLoader.style.visibility = 'visible';
    loginText.style.visibility = 'hidden';
    fetch(`https://localhost:7270/welcome/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => onLogin(data.token))
      .catch(error => console.error(error));
  }

  return (
    <>
      <div className='LoginContainer'>
        <h1 className='header mb-5 center'>Sign In</h1>
        <form className='needs-validation' noValidate>
          <div className="form-floating mb-3">
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" autoComplete='off' id='floatingUsername' placeholder="Email" autoFocus />
            <label className='input-label' htmlFor="floatingInput">Email address</label>
          </div>
          <div className='password-fields'>
            <div id='LoginPwInput' className="form-floating mb-3">
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="button-addon1" placeholder="Password" />
              <label className='input-label' htmlFor="button-addon1">Password</label>
            </div>
          </div>

          <button type="submit" id='LoginSubmitBtn' className="btn btn-success" onClick={loginFunction}>
            <span className='LoginText'>Login</span>
            <div className='LoginLoaderContainer'>
              <span className='LoginLoader'></span>
            </div>
          </button>

        </form>
      </div>
    </>
  )
}