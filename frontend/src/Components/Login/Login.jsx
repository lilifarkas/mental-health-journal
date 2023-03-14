import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useState } from 'react';
import {HiCheck} from 'react-icons/hi';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let loginText = document.querySelector('.LoginText');
  let loginLoader = document.querySelector('.LoginLoaderContainer');
  let emailInput = document.querySelector('#login-email-input');
  let pwInput = document.querySelector('#login-pw-input');
  let errorText = document.querySelector('.inputError');
  let check = document.querySelector('.LogCheck');

  async function loginFunction(e) {
    e.preventDefault();

    try {
      loginLoader.style.visibility = 'visible';
      loginText.style.visibility = 'hidden';
      let response = await fetch(`https://localhost:7270/welcome/login`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      let result = await response.json();
      if (response.ok) {
        loginLoader.style.visibility = 'hidden';
        emailInput.classList.value = 'form-control correct'
        pwInput.classList.value = 'form-control correct'
        check.style.visibility = 'visible';
        setTimeout(()=>{
          onLogin(result.token);
        }, 1000)
      }
      if (response.status === 400) {
        errorText.style.visibility = 'visible';
        emailInput.classList.value = 'form-control error';
        pwInput.classList.value = 'form-control error';
        loginLoader.style.visibility = 'hidden';
        loginText.style.visibility = 'visible';
      }
      else {
        console.warn('error', result.error);
      }
    }
    catch (error) {
      console.error(error);
    }
    // .then(response => response.json())
    // .then(data => onLogin(data.token))
    // .catch(error => console.error(error));
  }

  useEffect(() => {
    setTimeout(async () => {
      errorText.style.visibility = 'hidden';
      emailInput.classList.value = 'form-control'
      pwInput.classList.value = 'form-control'
    }, 50)
  }, [email, password])

  return (
    <>
      <div className='LoginContainer'>
        <h1 className='header mb-5 center'>Sign In</h1>
        <span className='inputError'>Incorrect email or password</span>
        <form className='needs-validation' noValidate>
          <div className="form-floating mb-3">
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" autoComplete='off' id='login-email-input' placeholder="Email" autoFocus />
            <label className='input-label' htmlFor="floatingInput">Email address</label>
          </div>
          <div className='password-fields'>
            <div id='LoginPwInput' className="form-floating mb-3">
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="login-pw-input" placeholder="Password" />
              <label className='input-label' htmlFor="button-addon1">Password</label>
            </div>
          </div>

          <button type="submit" id='LoginSubmitBtn' className="btn btn-success" onClick={loginFunction}>
            <span className='LoginText'>Login</span>
            <div className='LoginLoaderContainer'>
              <span className='LoginLoader'></span>
            </div>
            <div className='LogCheck'>
              <HiCheck />
            </div>
          </button>

        </form>
      </div>
    </>
  )
}