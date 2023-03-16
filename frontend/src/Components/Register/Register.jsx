import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';
import { HiCheck } from 'react-icons/hi';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';


export default function Register() {

  let loader = document.querySelector('.RegLoadingContainer');
  //let regContainer = document.querySelector('.RegisterContainer');
  let cancelButton = document.querySelector('#cancelBtn');
  let check = document.querySelector('.RegCheck');
  let text = document.querySelector('.RegSubmitText');
  let submitBtn = document.querySelector('#RegSubmitBtn');
  let nameInput = document.querySelector('#name-input');
  let emailInput = document.querySelector('#email-input');
  let passwordInput = document.querySelector('#pwInput');
  let passwordInput2 = document.querySelector('#ConfPwInput');
  let emailError = document.querySelector('.emailError');
  let nameError = document.querySelector('.nameError');
  let pwError = document.querySelector('.pwError');
  let ValidateBtn = document.querySelector('#ValidateBtn');
  let validateLoader = document.querySelector('.ValidateLoader');
  let submitError = document.querySelector('.RegSubmitError');
  let submitErrorText = document.querySelector('.RegSubmitErrorMessage');

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

  async function ValidateInputs() {
    nameInput.classList.value = 'form-control correct';
    isEmailOK = await validateEmail();
    isNameOK = validateName();
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
        let format = /^(?=.*\d).{8,}$/;
        //let format = /^(?=.*[a-zA-Z0-9]).{8,}$/g;
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
          pwError.innerHTML = `Please make sure your password contains at least one decimal number`;
        }
      }
    }
    if (isEmailOK && isPwOK && isNameOK) {
      submitBtn.disabled = false;
      ValidateBtn.style.display = 'none';
    }

    return false;
  }
  useEffect(() => {
    const submitBtnRendered = document.querySelector('#RegSubmitBtn');
    setTimeout(async () => {
      ValidateBtn.style.display = 'inline-block';
      submitBtnRendered.disabled = true;
    }, 10);
  }, [email, password])

  function validateName() {
    if (/^\s*$/.test(userName.trim()) || userName.includes(" ")) {
      // Username contains spaces
      nameInput.classList.value = 'form-control error';
      nameError.innerHTML = 'Please provide a valid username (no space allowed)';
      nameError.style.visibility = 'visible';
      return false;
    }
    nameInput.classList.value = 'form-control correct';
    nameError.style.visibility = 'hidden';
    return true;
  }

  async function validateEmail() {
    validateLoader.style.visibility = 'visible';
    let response = await fetch('https://localhost:7270/welcome/validate', {
      body: JSON.stringify({
        "Name": userName,
        "Password": password,
        "Email": email.toLowerCase()
      }),
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 500) {
      submitErrorText.style.visibility = 'visible';
      submitError.style.visibility = 'visible';
      submitBtn.classList.value = 'btn btn-danger';
      validateLoader.tyle.visibility = 'hidden';
      setTimeout(() => {
        submitErrorText.style.visibility = 'hidden';
        submitError.style.visibility = 'hidden';
        submitBtn.classList.value = 'btn btn-success';
      }, 2000)
    }

    let emailFormat = /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;
    if (email === '') {
      validateLoader.style.visibility = 'hidden';
      emailError.style.visibility = 'visible';
      emailInput.classList.value = 'form-control error';
      emailError.innerHTML = 'Please enter a valid email address';
      return false;
    }
    else if (emailFormat.test(email) === false) {
      validateLoader.style.visibility = 'hidden';
      emailError.style.visibility = 'visible';
      emailInput.classList.value = 'form-control error';
      emailError.innerHTML = 'Please make sure you use the correct format (example@email.com)';
      return false;
    }
    else if (response.status === 400) {
      validateLoader.style.visibility = 'hidden';
      emailError.style.visibility = 'visible';
      emailInput.classList.value = 'form-control error';
      emailError.innerHTML = 'An account is already registered with this email';
      return false;
    }
    validateLoader.style.visibility = 'hidden';
    emailError.style.visibility = 'hidden';
    emailInput.classList.value = 'form-control correct';
    return true;
  }


  async function RegisterUser(e) {

    e.preventDefault();
    controller = new AbortController();
    const signal = controller.signal;
    cancelButton.style.visibility = 'visible';
    text.style.visibility = 'hidden';
    loader.style.visibility = 'visible';
    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch('https://localhost:7270/welcome/register', {
          signal: signal,
          body: JSON.stringify({
            "Name": userName,
            "Password": password,
            "Email": email.toLowerCase()
          }),
          method: "POST",
          headers: { 'Content-Type': 'application/json' }
        });
        let result = await response.json();

        if (response.ok) {
          check.style.visibility = 'visible';
          console.log(response);
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
        }

        else {
          loader.style.visibility = 'hidden';
          submitBtn.classList.value = 'btn btn-danger';
          submitBtn.disabled = true;
          submitError.style.visibility = 'visible';
          submitErrorText.style.visibility = 'visible';
          console.error(`ERROR: ${error}`);
          setTimeout(() => {
            submitBtn.disabled = false;
            submitErrorText.style.visibility = 'hidden';
            submitBtn.classList.value = 'btn btn-success';
            submitError.style.visibility = 'hidden';
            text.style.visibility = "visible";
          }, 2000)
        }
      }
      cancelButton.style.visibility = 'hidden';
      loader.style.visibility = 'hidden';
    }, 2000);
    console.log(timeoutId)
  }

  return (
    <div className='register-background'>
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
          <div className='flex-row'>
            <div className='reg-password-fields'>
              <div className="form-floating mb-1 pw">
                <input onChange={(e) => setPassword(e.target.value)} type={pwType} className="form-control pw-input" id="pwInput" placeholder="Password" />
                <label className='input-label' htmlFor="button-addon1">Password</label>
              </div>
              <div className="input-group form-floating mb-1 pw">
                <input onChange={(e) => setPasswordConfirm(e.target.value)} type={pwType} className="form-control pw-input" id="ConfPwInput" placeholder="Confirm Password" />
                <label className='input-label' htmlFor="button-addon1">Confirm Password</label>

              </div>
            </div>
            <span className="input-group-text eyeIcon mb-3" id="basic-addon1">
              <button type='button' className="btn eyeBtn" onClick={(e) => ChangePasswordType(e)}><img className='eye' src={eyeType} alt={"eye"} /></button>
            </span>
          </div>

          <button type="submit" id='RegSubmitBtn' className="btn btn-success">
            <span className='RegSubmitText'>Register</span>
            <div className='RegLoadingContainer'>
              <span className="RegLoader"></span>
            </div>
            <div className='RegCheck'>
              <HiCheck />
            </div>
            <div className='RegSubmitError'>
              <MdOutlineReportGmailerrorred />
            </div>
          </button>
          <button type='button' id='ValidateBtn' className='btn btn-secondary' onClick={() => ValidateInputs()}>
            <span className='ValidateText'>Validate</span>
            <span className='ValidateLoader'></span>
          </button>
          {valid === true && navigate("/login")}
          <button type='button' onClick={() => AbortFunction()} id='cancelBtn' className='btn btn-secondary'>Cancel</button>
          <span className='RegSubmitErrorMessage'>Unable to reach the server! Please try again later! </span>
        </form>
      </div>
    </div>
  )
}
