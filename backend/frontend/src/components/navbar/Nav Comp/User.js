import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { backend_url } from "../../utility/url_info";
import user_image from "../../../media/user_logo.jpg";
import { toast } from 'react-toastify';

function User() {
  const [user, setUser] = useState('none');
  const [displayUser, setDisplayUser] = useState('none');

  useEffect(() => {
    let user = sessionStorage.getItem('user');
    if (user) {
      setUser(user);
      setDisplayUser(sessionStorage.getItem('first_name') || "Guest");
    }
  },[user]);

  const navigate = useNavigate();

  //Login Pannel function
  function triggerLoginPannel() {
    document.querySelector('.LoginPopup_main').style.display = 'flex';
  }

  // Logout function
  function triggerLogout() {
    axios.get(`${backend_url}/user/logout/`).then((response) => {
      const resp = response.data;
      if (resp.code === "success") {
        setUser("none");
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('first_name');
        toast.success("Logged out successfully");
        navigate('/');
        setTimeout(() => {
          window.location.reload();
        })
      }
    });
  }

  return (
    <div>
      <div className="user">
        <div className='about_user_icon'>
          <i className="bi bi-question-circle"></i>
        </div>
        {(user == "none" ?
          <div className='about_user_icon'>
            <button className='login_button_profile' onClick={triggerLoginPannel}>
              Login
            </button>
          </div>
          :
          <div className='profile_main_holder'>
            <div>
              <img src={user_image} alt="user_image" className='profile_main_image' />
              <p>{displayUser}</p>
              {/* <i className='bi bi-caret-down-fill'></i> */}
            </div>
            <button className='logout_button' onClick={triggerLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default User