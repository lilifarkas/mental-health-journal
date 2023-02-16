import React from 'react';
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Login.css'

export default function Login() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const params = {
        username: userName,
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

    </>
  )
}
