import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FiMail, FiUser } from 'react-icons/fi';
import { AiFillLock } from 'react-icons/ai';
import eye from './img/eye.svg';
import eyeslash from './img/eye-slash.svg';

export default function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [pwType, setPwType] = useState('password');
    const [eyeType, setEyeType] = useState(eye);

    const params = {
        username: userName,
    }

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

    // async function loginFunction(e) {
    //     e.preventDefault();
    //     let response = await fetch(`/login`, {
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
            <div className='LogLoadingContainer'>
              <span className="LogLoader"></span>
            </div>
            <h1 className='header mb-5 center'>Sign In</h1>
            <form className='needs-validation' noValidate>
              <div className="form-floating mb-3">
                <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" autoComplete='off' id='floatingUsername' placeholder="Username" autoFocus />
                <label className='input-label' htmlFor="floatingInput">Username</label>
              </div>
              <div className='password-fields'>
                <div id='LoginPwInput' className="form-floating mb-3">
                  <input onChange={(e) => setPassword(e.target.value)} type={pwType} className="form-control" id="button-addon1" placeholder="Password" />
                  <label className='input-label' htmlFor="button-addon1">Password</label>
                </div>
              </div>
    
              <button type="submit" id='submitBtn' className="btn btn-success">
                Login
              </button>
            </form>
          </div>
        </>
      )
}