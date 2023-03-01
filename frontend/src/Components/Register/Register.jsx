import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';
import { HiCheck } from 'react-icons/hi';
export default function Login() {


export default function Register() {

  let loader = document.querySelector('.RegLoadingContainer');
  //let regContainer = document.querySelector('.RegisterContainer');
  let cancelButton = document.querySelector('.btn-secondary');
  let check = document.querySelector('.RegCheck');
  let text = document.querySelector('.RegSubmitText');
  let submitBtn = document.querySelector('#RegSubmitBtn');
  let nameInput = document.querySelector('#name-input');
  let emailInput = document.querySelector('#email-input');
  let passwordInput = document.querySelector('#pwInput');
  let passwordInput2 = document.querySelector('#ConfPwInput');
  let nameError = document.querySelector('.nameError');
  let emailError = document.querySelector('.emailError');
  let pwError = document.querySelector('.pwError');

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [pwType, setPwType] = useState('password');
  const [eyeType, setEyeType] = useState(eye);
  const [valid, setValid] = useState(false);

  let isNameOK = false;
  let isEmailOK = false;
  let isPwOK = false;
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

  async function ValidateInputs(e) {
    e.preventDefault();
    const response = await fetch('https://localhost:7270/users');
    let result = await response.json();
    isNameOK = validateName(result);
    isEmailOK = validateEmail(result);
    if (password !== passwordConfirm) {
      pwError.style.visibility = 'visible';
      passwordInput.classList.value = 'form-control error';
      passwordInput2.classList.value = 'form-control error';
      pwError.innerHTML = 'Please make sure your passwords are matching';
    }
    if (password === passwordConfirm) {
      if (password.length < 8) {
        pwError.style.visibility = 'visible';
        passwordInput.classList.value = 'form-control error';
        passwordInput2.classList.value = 'form-control error';
        pwError.innerHTML = 'Please make sure you password contains at least 8 characters';
      }
      else {
        let format = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (format.test(password) === true) {
          pwError.style.visibility = 'hidden';
          passwordInput.classList.value = 'form-control correct';
          passwordInput2.classList.value = 'form-control correct';
          isPwOK = true;
        }
        else {
          pwError.style.visibility = 'visible';
          passwordInput.classList.value = 'form-control error';
          passwordInput2.classList.value = 'form-control error';
          pwError.innerHTML = `Please make sure you password contains ()`;
        }
      }
    }
    if (isEmailOK && isNameOK && isPwOK) {
      submitBtn.disabled = false;
    }
    return false;
  }
  useEffect(() => {
    setTimeout(async () => {
      submitBtn.disabled = true;
    }, 10);
  }, [userName, email, password])

  function validateName(result) {
    for (const user of result.$values) {
      if (userName === '') {
        nameInput.classList.value = 'form-control error';
        nameError.style.visibility = 'visible';
        nameError.innerHTML = 'Please enter a valid username';
        return false;
      }
      else if (user.name === userName) {
        nameInput.classList.value = 'form-control error';
        nameError.style.visibility = 'visible';
        nameError.innerHTML = 'An account is already registered with this username';
        return false;
      }
    }
    nameInput.classList.value = 'form-control correct';
    nameError.style.visibility = 'hidden';
    return true;
  }

  function validateEmail(result) {
    let emailFormat = /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;
    for (const user of result.$values) {
      if (email === '') {
        emailError.style.visibility = 'visible';
        emailInput.classList.value = 'form-control error';
        emailError.innerHTML = 'Please enter a valid email address';
        return false;
      }
      else if (emailFormat.test(email) === false) {
        emailError.style.visibility = 'visible';
        emailInput.classList.value = 'form-control error';
        emailError.innerHTML = 'Please make sure you use the correct format (example@email.com)';
        return false;
      }
      else if (user.email === email) {
        emailError.style.visibility = 'visible';
        emailInput.classList.value = 'form-control error';
        emailError.innerHTML = 'An account is already registered with this email';
        return false;
      }
    }
    emailError.style.visibility = 'hidden';
    emailInput.classList.value = 'form-control correct';
    return true;
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
        <form className='needs-validation' onSubmit={(e) => RegisterUser(e)}>
          <span className='nameError'>.</span>
          <div className="form-floating mb-3">
            <input onChange={(e) => setUserName(e.target.value)} type="text" autoComplete='off' className="form-control " id='name-input' placeholder="Username" autoFocus />
            <label className='input-label' htmlFor="floatingInput">Username</label>
          </div>
          <span className='emailError'>.</span>
          <div className="form-floating mb-3">
            <input onChange={(e) => setEmail(e.target.value)} type="email" autoComplete='off' className="form-control " id='email-input' placeholder="name@example.com" />
            <label className='input-label' htmlFor="floatingInput">Email address</label>
          </div>
          <span className='pwError'>.</span>
          <div className='password-fields'>
            <div className="form-floating mb-3 pw">
              <input onChange={(e) => setPassword(e.target.value)} type={pwType} className="form-control pw-input" id="pwInput" placeholder="Password" />
              <label className='input-label' htmlFor="button-addon1">Password</label>
            </div>
            <div className="input-group form-floating mb-3 pw">
              <input onChange={(e) => setPasswordConfirm(e.target.value)} type={pwType} className="form-control pw-input" id="ConfPwInput" placeholder="Confirm Password" />
              <label className='input-label' htmlFor="button-addon2">Confirm Password</label>
              <span className="input-group-text" id="basic-addon1">
                <button type='button' className="btn" onClick={(e) => ChangePasswordType(e)}><img src={eyeType} /></button>
              </span>
            </div>
          </div>

          <button type="submit" id='RegSubmitBtn' className="btn btn-success" disabled>
            <span className='RegSubmitText'>Register</span>
            <div className='RegLoadingContainer'>
              <span className="RegLoader"></span>
            </div>
            <div className='RegCheck'>
              <HiCheck />
            </div>
          </button>
          <button type='button' id='RegValidateBtn' className='btn btn-secondary' onClick={(e) => ValidateInputs(e)}>Validate</button>
          {valid === true && navigate("/login")}
          {/* {valid === true && navigate("/login")} */}
          <button type='button' onClick={() => AbortFunction()} id='cancelBtn' className='btn btn-secondary'>Cancel</button>
        </form>
      </div>
    </>
  )
}
