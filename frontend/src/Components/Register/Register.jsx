import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';
import { HiCheck } from 'react-icons/hi';

export default function Login() {


  let loader = document.querySelector('.RegLoadingContainer');
  //let regContainer = document.querySelector('.RegisterContainer');
  let cancelButton = document.querySelector('.btn-secondary');
  let check = document.querySelector('.RegCheck');
  let text = document.querySelector('.RegSubmitText');

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [pwType, setPwType] = useState('password');
  const [eyeType, setEyeType] = useState(eye);
  const [valid, setValid] = useState(false);
  let controller = new AbortController();


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
  let loaderTimeoutId;
  function AbortFunction() {
    controller.abort();
    console.log(clearTimeout(timeoutId)); //undefined
    console.log(clearTimeout(loaderTimeoutId)); //undefined
    loader.style.visibility = 'hidden';
    text.style.visibility = 'visible';
    cancelButton.style.visibility = 'hidden';
  }


  async function RegisterUser(e) {

    e.preventDefault();
    controller = new AbortController();
    const signal = controller.signal;
    text.style.visibility = 'hidden';
    cancelButton.style.visibility = 'visible';
    loader.style.visibility = 'visible';
    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch('https://localhost:7270/users/add', {
          signal: signal,
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
          check.style.visibility = 'visible';
          loaderTimeoutId = setTimeout(async () => {
            text.style.visibility = 'visible';
            check.style.visibility = 'hidden';
            console.log(`Success!\nUser ID: ${JSON.stringify(result.id)}`);
            setValid(true);
          }, 2000)
        }
        else {
          console.warn(`Something went wrong! Please try again later\nERROR:\n ${result}`);
        }
        if (signal.aborted) {
          console.warn("Request cancelled!");
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
    console.log(timeoutId)
  }

  return (
    <>
      <div className='RegisterContainer'>
        <h1 className='header mb-5 center'>Create Account</h1>
        <form className='needs-validation' onSubmit={(e) => RegisterUser(e)} noValidate>
          <div className="form-floating mb-3">
            <input onChange={(e) => setUserName(e.target.value)} type="text" autoComplete='off' className="form-control" id='floatingUsername' placeholder="Username" autoFocus />
            <label className='input-label' htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input onChange={(e) => setEmail(e.target.value)} type="email" autoComplete='off' className="form-control" id="floatingInput" placeholder="name@example.com" />
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

          <button type="submit" id='RegSubmitBtn' className="btn btn-success">
            <span className='RegSubmitText'>Register</span>
            <div className='RegLoadingContainer'>
              <span className="RegLoader"></span>
            </div>
            <div className='RegCheck'>
              <HiCheck />
            </div>
          </button>
          {valid === true && navigate("/login")}
          {/* {valid === true && navigate("/login")} */}
          <button type='button' onClick={() => AbortFunction()} id='cancelBtn' className='btn btn-secondary'>Cancel</button>
        </form>
      </div>
    </>
  )
}
