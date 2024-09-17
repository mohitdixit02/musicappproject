import { useState } from "react";
import React from 'react';
import "./Login.css";
import axios from "axios";
import { backend_url } from "../../utility/url_info";

export default function Login() {
    const [login, setLogin] = useState(true);

    function closePopUp() {
        document.getElementsByClassName('LoginPopup_main')[0].style.display = 'none';
    }

    function attemptLogin() {
        let username = document.getElementsByName('login_input_username')[0].value;
        let password = document.getElementsByName('login_input_password')[0].value;
        axios.post(`${backend_url}/user/login/`, JSON.stringify({
            'username': username,
            'password': password
        }
        ),).then((response) => {
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
                                <input type="text" name="mobile_no" placeholder="Mobile Number" />
                                <input type="date" name="dob" placeholder="Date of Birth" />
                            </div>
                            <button>
                                SignIn
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
