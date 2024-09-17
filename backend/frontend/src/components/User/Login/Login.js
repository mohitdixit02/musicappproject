import { useState } from "react";
import React from 'react';
import "./Login.css";
import axios from "axios";
import { backend_url } from "../../utility/url_info";
import getCSRFToken from "../../utility/session";

export default function Login() {
    const [login, setLogin] = useState(true);

    function closePopUp() {
        document.getElementsByClassName('LoginPopup_main')[0].style.display = 'none';
    }

    function attemptLogin() {
        let username = document.getElementsByName('login_input_username')[0].value;
        let password = document.getElementsByName('login_input_password')[0].value;

        axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();
        axios.post(`${backend_url}/user/login/`, {
            'username': username,
            'password': password
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            ,).then((response) => {
                console.log(response.data);
            })
    }

    function attemptSign() {
        let first_name = document.getElementsByName('first_name')[0].value;
        let last_name = document.getElementsByName('last_name')[0].value;
        let email = document.getElementsByName('email')[0].value;
        let user_name = document.getElementsByName('user_name')[0].value;
        let mobile_no = document.getElementsByName('mobile_no')[0].value;
        let dob = document.getElementsByName('dob')[0].value;
        let password = document.getElementsByName('password')[0].value;
        let c_password = document.getElementsByName('c_password')[0].value;

        if (password !== c_password) {
            alert("Password and Confirm Password do not match");
        }

        axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();
        axios.post(`${backend_url}/user/signup/`, {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'username': user_name,
            'number': mobile_no,
            'dob': dob,
            'password': password,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            ,).then((response) => {
                console.log(response.data);
            })
    }

    return (
        <div className="LoginPopup_main">
            <div className='LoginPopup'>
                <div className='login_popup_cross'>
                    <i className="bi bi-x-lg" onClick={closePopUp}></i>
                </div>
                <div className='tab_selector_login_popup '>
                    <div style={(login ? { "borderBottom": "2px solid rgb(87, 84, 255)" } : { "borderBottom": "none" })} onClick={() => setLogin(true)}>Login</div>
                    <div style={(!login ? { "borderBottom": "2px solid rgb(87, 84, 255)" } : { "borderBottom": "none" })} onClick={() => setLogin(false)}>Sign Up</div>
                </div>

                {
                    (login ?
                        <div className="login_popup_login">
                            <input type="text" name="login_input_username" placeholder="username" />
                            <input type="password" name="login_input_password" placeholder="password" />
                            <button onClick={attemptLogin}>
                                Login
                            </button>
                        </div>
                        :
                        <div className="login_popup_signin">
                            <div>
                                <input type="text" name="first_name" placeholder="First Name" id="" />
                                <input type="text" name="last_name" placeholder="Last Name" id="" />
                            </div>
                            <div>
                                <input type="text" name="email" placeholder="Email" />
                                <input type="text" name="user_name" placeholder="Username" />
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Enter Password" />
                                <input type="password" name="c_password" placeholder="Confirm Password" />
                            </div>
                            <div>
                                <input type="text" name="mobile_no" placeholder="Mobile Number" />
                                <input type="date" name="dob" placeholder="Date of Birth" />
                            </div>
                            <button onClick={attemptSign}>
                                SignIn
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
