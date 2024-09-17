import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {backend_url} from "../../utility/url_info";

function User(props) {
  const user = props.user;
  const setUser = props.setUser;
  const navigate = useNavigate();

  //Login Pannel function
  function triggerLoginPannel() {
    document.querySelector('.LoginPopup_main').style.display = 'flex';
  }

  // Logout function
  function triggerLogout() {
    axios.get(`${backend_url}/user/logout/`).then((response) => {
      const resp = response.data;
      if(resp.code === "success"){
        setUser("none");
      }
    });
  }

  //get user name
  setTimeout(() => {
    axios.get(`${backend_url}/user/getuser/`).then((response) => {
      const resp = response.data;
      if(resp.code === "success"){
        let data = resp.data[0];
        setUser(data['user_id'])
      }
    });
  }, 100);

  //Artist Info function
  function viewProfile() {
    try {
      axios.get('/user/fulluser').then((response) => {
        navigate('/profile', {
          state: {
            'data': response.data[0],
          }
        })
      }
      );
    } catch { }
  }

  return (
    <div>
      <div className="user">
        <i className="bi bi-question-circle"></i>
        {(user == "none" ?
          <button onClick={triggerLoginPannel}>
            Login
          </button>
          :
          <div>
            <button onClick={triggerLogout}>
              Logout
            </button>
          </div>
               )}
      </div>
    </div>
  )
}

export default User