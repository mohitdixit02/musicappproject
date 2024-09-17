import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Library.css'

function Library() {
    const [checkuser, checksetUser] = useState("");
    setTimeout(() => {
        axios.get('/user/getuser/').then((response) => {
            const resp = response.data[0];
            checksetUser(resp['user_id']);
        });
    }, 100);
    return (
        <div className="Library_main">
            {checkuser == "User" ?
                <div id='lib_text1'>Library is Empty
                    <div id="lib_text2">Looks like you are Logout from your account</div>
                </div>
                : <div className='library_display'>
                    <Link to='/liked' style={{'textDecoration':'none', 'color':'white'}}><div className="liked_songs_library">
                        <div className="icon_holder_liked_library"><i className='bi bi-heart-fill'></i></div>
                        <div className="txt_liked_songs_library">Liked Songs</div>
                    </div>
                    </Link>
                </div>}
        </div>
    )
}

export default Library
