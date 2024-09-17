import React, { useState, useEffect } from 'react'
import './LikedSongs.css'
import axios from 'axios'
import p from '../../../media/playicon.jpg'
import conv from '../../utility/time_conv'
import { ref, set, onValue, remove } from "firebase/database"
import database from '../../../Firebase/Firebase'
import { backend_url } from '../../utility/url_info'

function Likedsongs(props) {
    //Getting Song_data
    const [song_data, setData] = useState([]);
    const [data_length, setDatalength] = useState();
    const user = props.user;

    //Playlist Owner
    const [name, SetName] = useState('');
    axios.get('/user/getuser/').then((response) => {
        const resp = response.data[0];
        SetName(resp['first_name'] + " . ");
    })

    // Fetching Song_data
    if (user != 'none') {
        setTimeout(() => {
            onValue(ref(database, 'users/' + user + '/liked/'), (snapshot) => {
                const value = snapshot.val();
                if (value) {
                    const value_length = Object.keys(value).length;
                    let temp_array = song_data;
                    let array_length = temp_array.length;
                    for (let key in value) {
                        if (array_length < value_length) {
                            let temp = value[key];
                            temp = temp['song'];
                            temp_array.push(temp);
                            array_length++;
                        }
                    }
                    setData(song_data);
                    setDatalength(value_length);
                }
                else {
                    // sending data
                    setData('none');
                    setDatalength(null);
                }
            })
        }, 50)
    }
    // const data = song_data;

    const data = song_data;
    function songno() {
        if (data_length == 1) {
            return ('1 song');
        }
        else if (data_length > 1) {
            return (`${data_length} songs`)
        }
        else {
            return ('No songs')
        }
    }

    //Play Audio
    let trackfn = props.trackfn;
    function play_open_like() {
        trackfn(data);
    }


    // Play single audio fn
    const tracklist = props.tracklist;
    function playsongtd(e) {
        let temp = e.target.parentElement.id;
        if (temp != '') {
            if (tracklist != data) {
                if (props.type == 'music') {
                    trackfn([data]);
                }
                else {
                    trackfn(data);
                }
            }
            let fn = props.actvfn;
            fn(temp);
        }
    }

    //Liked Songs function
    function liked_song(e) {
        let icon_id = e.target.id;
        icon_id = icon_id.substr(6, icon_id.length - 5);
        let k = document.getElementById(e.target.id);
        if (user != 'none') {
            if (k.className == 'bi bi-heart') {
                k.className = 'bi bi-heart-fill heart_icon';
                //Setting data
                axios.get(`/req_data/${icon_id}`).then((response) => {
                    const data = response.data[0];
                    set(ref(database, 'users/' + user + '/liked/' + icon_id + '/'), {
                        song: data
                    })
                })
            }
            else {
                k.className = 'bi bi-heart';
                // removing data
                remove(ref(database, 'users/' + user + '/liked/' + icon_id + '/'));
                let target_row_no = document.getElementById(`${icon_id} index`).innerText;
                let target_table = document.getElementsByClassName('likedtable');
                target_table = target_table[0];
                target_table.deleteRow(parseInt(target_row_no) + 1);

                //reducing index after deletion
                let rows_set = document.getElementsByClassName('index_class');
                for (let key of rows_set) {
                    let check_value = parseInt(key.innerText) + 1;
                    let comp_value = parseInt(target_row_no) + 1;
                    if (check_value > comp_value) {
                        key.innerText = (check_value - 2);
                    }
                }
            }
        }
    }
    //Setting Liked Songs on Load
    if (user != 'none') {
        setTimeout(() => {
            onValue(ref(database, 'users/' + user + '/liked/'), (snapshot) => {
                const data = snapshot.val();
                for (let key in data) {
                    let k = document.getElementById(`heart ${key}`);
                    if (k) {
                        k.className = 'bi bi-heart-fill heart_icon';
                    }
                }
            })
        }, 50)
    }

    //Color change of active song
    const ctrack = props.current_track;
    useEffect(() => {
        //changing layout
        setTimeout(() => {
            let beginrow = document.getElementsByClassName('index_class');
            for (let k of beginrow) {
                k.className = 'songtd index_class';
            }
            let begin = document.getElementsByClassName('span_class');
            for (let i of begin) {
                i.className = 'span_class';
            }
            let index = document.getElementById(`${ctrack.id} index`);
            let name = document.getElementById(`${ctrack.id} name`);
            if (index) {
                index.className = 'songtd index_class activenow';
            }
            if (name) {
                name.className = 'span_class activenow_class';
            }
        }, 100)

    }, [ctrack]);

    return (
        <div className="liked_display">
            <div className="liked_top_div">
                <div className='liked_top_div_wrapper'></div>
                <div className='open_top_heading'>
                    <i className="bi bi-heart-fill" id='liked_playlist_heart' />
                    <div className='heading_text'>
                        <ul type='none'>
                            <li style={{ 'marginLeft': '6px' }}>Playlist</li>
                            <li className='liked_head'>Liked Songs</li>
                            <br />
                            <li style={{ 'marginLeft': '6px' }}>{name} {songno()}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="liked_bottom_area">
                <div>
                    {user == 'none' || song_data == 'none' ? <></> :
                    <div style={{ 'display': 'flex' }}>
                        <img src={p} className='playicon_open' onClick={play_open_like} id='playicon_main_liked' />
                    </div>}
                </div>
                {(user != 'none' && song_data != 'none' ?
                    <div className="liked_list">
                        <table className='likedtable' cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th style={{ 'width': '5%', 'textAlign': 'center' }}>#</th>
                                    <th style={{ 'width': '65%' }}>TITLE</th>
                                    <th className='table_plays' style={{ 'width': '50%' }}>PLAYS</th>
                                    <th style={{ 'width': '30%', 'textAlign': 'right', 'paddingRight': '15px' }}><i className="bi bi-clock"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td colSpan={5}><hr className='tabletopline' /></td></tr>
                                {
                                    data.map((element, index) => {
                                        let plays = element.plays
                                        plays = plays.toLocaleString();
                                        let duration = conv(element.duration);
                                        return (
                                            <tr key={index} id={element.id} className='likedlist2_active' onClick={playsongtd}>
                                                <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px' }} id={`${element.id} index`} className='likedtd index_class'>{index + 1}</td>
                                                <td id={element.id} style={{ 'display': 'flex' }} className='likedtd'>
                                                    <img src={`${element.firebase_image_url}`} className='likedtd_img' />
                                                    <div id={element.id} className='likedtd_div'>
                                                        <span className='liked_span_class' id={`${element.id} name`}>{element.name}</span>
                                                        {element.artist}
                                                    </div>
                                                </td>
                                                <td className='likedtd table_plays'>{plays}</td>
                                                <td className='likedtd' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px' }}><div className='durn_open_list' style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '10px' }}><i className="bi bi-heart" id={`heart ${element.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='error_show'>
                        <div>Nothing to show <br />
                        <span id='error_small_show'>
                            {user == 'none' ? "You have to Login to access this feature" : "You haven't liked any song yet, Let's Start"}
                        </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Likedsongs
