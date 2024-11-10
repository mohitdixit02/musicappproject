import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Library.css'
import { ref, onValue} from "firebase/database"
import database from '../../Firebase/Firebase'

function Library() {
    const user = sessionStorage.getItem('user') || "none";

    useEffect(() => {
        onValue(ref(database, 'users/' + user + '/playlist/'), (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        })
    });

    return (
        <div className="Library_main">
            {user === "none" ?
                <div className='lib_text_holder_main'>
                    <div id='lib_text1'>
                        Library is Empty
                        <div id="lib_text2">Looks like you are not logged in to your account</div>
                    </div>
                </div>
                : <div className='library_display'>
                    <Link to='/liked' style={{ 'textDecoration': 'none', 'color': 'white' }}><div className="liked_songs_library">
                        <div className="icon_holder_liked_library"><i className='bi bi-heart-fill'></i></div>
                        <div className="txt_liked_songs_library">Liked Songs</div>
                    </div>
                    </Link>
                </div>}
        </div>
    )
}

export default Library
