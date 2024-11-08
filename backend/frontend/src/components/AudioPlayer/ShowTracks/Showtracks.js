import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ref, set, onValue, remove } from "firebase/database"
import database from '../../../Firebase/Firebase';
import conv from '../../utility/time_conv'
import axios from 'axios';
import './Showtrack.css';
import { backend_url } from "../../utility/url_info";
import { useTrackContext } from '../../MainWrapper/MainWrapper';
import {toast} from 'react-toastify';

function Showtracks(props) {
    const {
        trackslist,
        setTrackslist,
        actvstate,
        setActivestate,
        current_track,
        setCurrent_track
    } = useTrackContext();

    let location = useLocation();
    const song = location?.state?.data;
    const user = sessionStorage.getItem('user') || 'none';
    const trackfn = setTrackslist;
    const tracklist = trackslist;
    const ctrack = current_track;
    function playsongtd(e) {
        let temp = e.target.parentElement.id;
        if (temp != '') {
            if (tracklist != song) {
                if (props.type == 'music') {
                    trackfn([song]);
                }
                else {
                    trackfn(song);
                }
            }
            setActivestate(temp);
        }
    }

    //Liked Songs function
    function liked_song(e) {
        if(user === 'none'){
            toast.warn('Please login to like songs');
            return;
        }
        let icon_id = e.target.id;
        icon_id = icon_id.substr(6, icon_id.length - 5);
        let k = document.getElementById(e.target.id);
        if (user !== 'none') {
            if (k.className == 'bi bi-heart') {
                k.className = 'bi bi-heart-fill heart_icon';
                //Setting database
                axios.get(`${backend_url}/req_data/${icon_id}`).then((response) => {
                    const data = response.data[0];
                    set(ref(database, 'users/' + user + '/liked/' + icon_id + '/'), {
                        song: data
                    })
                })
                toast.success('Added to Liked Songs');
            }
            else {
                k.className = 'bi bi-heart';
                // removing data
                remove(ref(database, 'users/' + user + '/liked/' + icon_id + '/'))
                toast.success('Removed from Liked Songs');
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
        })
    }

    //Color change of active song
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

    if (song == 'blank') {
        return (
            <div className="showtrack_list">
                <div id='blank'>Nothing to Show</div>
                <div id="blank2">Play some music to start..</div>
            </div>
        )
    }
    else {
        return (
            <div className="showtrack_list">
                <h2>Queue</h2>
                <table className='tracklisttable' cellSpacing={0}>
                    <tbody>
                        {
                            song?.map((element, index) => {
                                let plays = element.plays
                                plays = plays.toLocaleString();
                                let duration = conv(element.duration);
                                return (
                                    <tr key={index} id={element.id} className='songlist2_active' onClick={playsongtd}>
                                        <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px', 'width': '20%', 'textAlign': 'center' }} id={`${element.id} index`} className='songtd index_class'>{index + 1}</td>
                                        <td id={element.id} style={{ 'display': 'flex', 'width': '50vw' }} className='songtd'>
                                            <img src={`${element.firebase_image_url}`} className='songtd_img' />
                                            <div id={element.id} className='songtd_div'>
                                                <span className='span_class' id={`${element.id} name`}>{element.name}</span>
                                                {element.artist}
                                            </div>
                                        </td>
                                        <td className='songtd' style={{ 'width': '65%' }}>{element.album}</td>
                                        <td className='songtd' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px', 'width': '30%', 'textAlign': 'right', 'paddingRight': '15px' }}><div style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '5px' }}><i className="bi bi-heart" id={`heart ${element.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Showtracks
