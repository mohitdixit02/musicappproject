import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function User(props) {
  const [buttonstate, setButtonstate] = useState(false);
  const [displayuser, setDisplayuser] = useState('User');
  const user = props.user;
  const setUser = props.setUser;
  const navigate = useNavigate();

  //Login Pannel function
  function triggerLoginPannel() {
    document.querySelector('.LoginPopup_main').style.display = 'flex';
  }

  //get user name
  setTimeout(() => {
    axios.get('/user/getuser/').then((response) => {
      const resp = response.data[0];
      setDisplayuser(resp['first_name']);
      setUser(resp['user_id']);
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
            
          </div>
               )}
      </div>
    </div>
  )
}

export default User