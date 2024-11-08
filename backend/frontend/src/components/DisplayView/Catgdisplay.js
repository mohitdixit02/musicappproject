import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, set, onValue, remove } from "firebase/database"
import database from '../../Firebase/Firebase';
import p from '../../media/playicon.jpg'
import axios from 'axios';
import conv from '../utility/time_conv';
import '../DisplayView/Catgdisplay.css';
import '../Main/main.css';
import { GetArtistinfo } from '../utility/server_request_functions';
import { backend_url } from '../utility/url_info';
import { useTrackContext } from '../MainWrapper/MainWrapper';

function Catgdisplay(props) {
    const {
        trackslist,
        setTrackslist,
        setActivestate,
        current_track,
    } = useTrackContext();
    let location = useLocation();
    const data = location.state.data;
    const navigate = useNavigate();
    const user = sessionStorage.getItem('user');
    const trackfn = setTrackslist;
    const tracklist = trackslist;
    const ctrack = current_track;

    //Liked Songs function
    function liked_song(e) {
        let icon_id = e.target.id;
        icon_id = icon_id.substr(6, icon_id.length - 5);
        let k = document.getElementById(e.target.id);
        if (user != 'none') {
            if (k.className == 'bi bi-heart') {
                k.className = 'bi bi-heart-fill heart_icon';
                //Setting database
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
                remove(ref(database, 'users/' + user + '/liked/' + icon_id + '/'))
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

    if (location.state['type'] === 'Category') {
        const song = data['list'];
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
        return (
            <div className="catg_list">
                <h2>{data['genere']}</h2>
                <table className='catglisttable' cellSpacing={0}>
                    <tbody>
                        {
                            song.map((element, index) => {
                                let plays = element.plays
                                plays = plays.toLocaleString();
                                let duration = conv(element.duration);
                                return (
                                    <tr key={index} id={element.id} className='songlist2_active' onClick={playsongtd}>
                                        <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px', 'width': '15%', 'textAlign': 'center' }} id={`${element.id} index`} className='songtd index_class'>{index + 1}</td>
                                        <td id={element.id} style={{ 'display': 'flex', 'width': '50vw' }} className='songtd'>
                                            <img src={`${element.firebase_image_url}`} className='songtd_img' />
                                            <div id={element.id} className='songtd_div'>
                                                <span className='span_class' id={`${element.id} name`}>{element.name}</span>
                                                {element.artist}
                                            </div>
                                        </td>
                                        <td className='songtd catg_album_name' style={{ 'width': '65%' }}>{element.album}</td>
                                        <td className='songtd timeinfo_catg' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px', 'width': '30%' }}><div style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '5px' }}><i className="bi bi-heart" id={`heart ${element.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    else if (location.state['type'] === 'artist') {
        //Artist Info function
        function artistinfo(e) {
            if (!e.target.id.includes('play')) {
                GetArtistinfo(e.target.id).then((response) =>
                    navigate('/info', {
                        state: {
                            'data': response,
                            'type': 'artist'
                        }
                    })
                );
            }
        }

        //Artist Play
        function artistPlay(e) {
            let play_id = e.target.id;
            play_id = play_id.substr(0, play_id.length - 5);
            try {
                axios.get(`${backend_url}/req_data/artist/${play_id}`).then((response) => {
                    let temp = response.data[0]
                    trackfn(temp['artist_song_list']);
                })
            } catch (error) { }
        }

        return (
            <div className="catg_list">
                <h2>Artist</h2>
                <div className="flex_hold">
                    <div className="artist_display_flex">
                        {
                            data.map((artist_key, index) => {
                                let temp = artist_key[0];
                                return (
                                    <div key={temp.id} className='cover_box' >
                                        <div className="genbox">
                                            <div className='genbox_img_holder'>
                                                <img src={`${temp.firebase_artist_image_url}`} alt="Image" className="genbox_img artist" />
                                            </div>
                                            <div className="genbox_text1 artisttext">
                                                {temp.name}
                                            </div>
                                            <div className="genbox_text2">Artist</div>
                                        </div>
                                        <div className="artist_cover" id={temp.name} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={artistinfo}>
                                            <img src={p} className='playicon_design' id={`${temp.name} play`} onClick={artistPlay} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        )
    }
}

//Play icon for genbox
function getelement(e) {
    let w = document.getElementById(`${e.target.id} play`)
    try {
        w.style.display = 'block'
        setTimeout(() => {
            w.className = `playicon_design animateicon`
        }, 200)
    } catch (error) { }
}
function removeelement(e) {
    let w = document.getElementsByClassName('playicon_design')
    try {
        for (let item of w) {
            item.style.display = 'none'
            item.className = `playicon_design`
        }
    } catch (error) { }
}

export default Catgdisplay
