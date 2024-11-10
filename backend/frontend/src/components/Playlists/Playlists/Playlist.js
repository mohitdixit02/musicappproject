import React, { useState, useEffect } from 'react'
import '../LikedSongs/LikedSongs.css'
import './Playlist.css'
import '../../Search/searchpage.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import database from '../../../Firebase/Firebase'
import { ref, set } from 'firebase/database'
import OpenSonglist from '../../DisplayView/OpenSonglist'
import { backend_url } from '../../utility/url_info';
import { useTrackContext } from '../../MainWrapper/MainWrapper';

function Playlist(props) {
    //Playlist Owner
    const [name, SetName] = useState('User');
    const {
        trackslist,
        setTrackslist,
        setActivestate,
        current_track,
    } = useTrackContext();
    useEffect(() => {
        let user_name = sessionStorage.getItem('first_name') || "Guest";
        SetName(user_name);
    }, []);

    // Playlist Management
    const user = sessionStorage.getItem('user') || "none";
    const location = useLocation();
    const url = location.state.url;
    const [song_data, setSongdata] = useState([]);
    const [get_search_data, setSearchData] = useState(false);
    const playlist_data = location.state.data;

    //no of songs
    function songno() {
        if (playlist_data['data']) {
            let l = playlist_data['data'].length;
            if (l == 1) {
                return '1 song'
            }
            else if (l > 1) {
                return (l + ' songs')
            }
        }
        else {
            return 'No Song'
        }
    }

    //Color change of active song
    useEffect(() => {
        //changing layout
        setTimeout(() => {
            try {
                let beginrow = document.getElementsByClassName('index_class');
                for (let k of beginrow) {
                    k.className = 'songtd index_class';
                }
                let begin = document.getElementsByClassName('span_class');
                for (let i of begin) {
                    i.className = 'span_class';
                }
                let index = document.getElementById(`${current_track.id} index`);
                let name = document.getElementById(`${current_track.id} name`);
                if (index) {
                    index.className = 'songtd index_class activenow';
                }
                if (name) {
                    name.className = 'span_class activenow_class';
                }
            } catch (error) { }
        }, 100)
    }, [playlist_data]);

    // Playlist search
    const [search_song_data, setSearchsongData] = useState([]);
    function playlist_search(value) {
        if (value !== '') {
            try {
                setSearchData(true);
                axios.get(backend_url + `/req_data/search/${value}`).then((response) => {
                    setSearchsongData(response.data['song']);
                })
            } catch { }
        }
        else {
            setSearchData(false);
            setSearchsongData([]);
        }
    }

    // changing name of Playlist
    function playlist_name(elem) {
        const text = elem.innerText;
        elem.innerHTML = '<input type="text" placeholder="' + text + '" autoFocus={true} />';
    }
    function playlist_name_blur(targ) {
        let name_targ = document.getElementById('playlist_name');
        if (targ.value == '') {
            try {
                name_targ.innerHTML = playlist_data['name'];
            } catch { }
        }
        else {
            try {
                name_targ.innerHTML = targ.value;
                setTimeout(() => {
                    set(ref(database, 'users/' + user + '/playlist/' + url + '/name'), targ.value);
                })
            } catch { }
        }
    }

    useEffect(() => {
        if (location.state.type == 'new') {
            playlist_data['name'] = location.state.name
        }
    });

    //Adding songs to Playlist
    useEffect(() => {
        let k = document.getElementById('playlist_holder');
        if (playlist_data['data']) {
            setSongdata(playlist_data['data']);
            try {
                k.style.display = 'block';
                search_display(false);
            } catch { }
        }
        else {
            setSongdata([]);
            try {
                k.style.display = 'none';
            } catch { }
        }
    }, [playlist_data]);

    async function Add_to_playlist(value) {
        await axios.get(backend_url + `/req_data/${value}`).then((response) => {
            const data = response.data[0];
            let final_data = [...song_data, data];
            setSongdata(final_data);
            set(ref(database, 'users/' + user + '/playlist/' + url + '/data/'), final_data);
        })
    }

    function search_display(value) {
        let find = document.getElementById('div_show_search');
        let divshow = document.getElementById('cross_hide_search');
        if (value) {
            try {
                find.style.display = 'none';
                divshow.style.display = 'flex';
            } catch { }
        }
        else {
            try {
                find.style.display = 'block';
                divshow.style.display = 'none';
            } catch { }
        }
    }



    //Play fn
    function play_open_like() {
        setTrackslist(song_data);
    }

    return (
        <div className="liked_display">
            <div className="liked_top_div">
                <div className='open_top_heading playlist_header_top'>
                    <i className="bi bi-music-note-beamed" id='playlist_icon'></i>
                    <div className='heading_text playlist_heading_text'>
                        <ul type='none'>
                            <li style={{ 'marginLeft': '6px' }}>Playlist</li>
                            <li style={{ 'fontSize': '80px' }} id='playlist_name' onDoubleClick={(e) => { playlist_name(e.target) }} onBlur={(e) => { playlist_name_blur(e.target) }}>{playlist_data['name']}</li>
                            <br />
                            <li style={{ 'marginLeft': '6px' }}>{name}. {songno()}</li>
                            <li>
                                <button onClick={play_open_like}>
                                    Play
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="playlist_bottom_area">
                {/* Already Song list */}
                <div id="playlist_holder">
                    <OpenSonglist songlist={song_data} setSongList={setSongdata} type={'playlist'} tracklist={trackslist} actvfn={setActivestate} trackfn={setTrackslist} ctrack={current_track} url={url} />
                </div>

                {/* Playlist Search bar*/}
                <div id='cross_hide_search'>
                    <div id='cross_hide_search_internal'>
                        <div className="playlist_search">
                            <span>Let's find something for your playlist</span> <br />
                            <i className="bi bi-x-circle" onClick={() => { search_display(false) }}></i>
                        </div>
                        <input type="text" placeholder='Search for Songs' onChange={(e) => { playlist_search(e.target.value) }} autoFocus={true} />
                    </div>

                    {/* Song serach */}
                    <div className="search_songdisplay">
                        <div className='search_songdisplay_child'>
                            {get_search_data ?
                                <table className='table_playlist_search' cellSpacing={0}>
                                    <tbody>
                                        {
                                            search_song_data.map((song, index) => {
                                                return (
                                                    <tr id={song.id} key={'search_' + song.name} className='songlist_search_active'>
                                                        <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px', 'width': '7%' }} className='songtd index_class' id={`${song.id} index`}>{index + 1}</td>
                                                        <td id={song.id} style={{ 'display': 'flex', 'width': '95%' }} className='songtd'>
                                                            <img src={`${song.firebase_image_url}`} className='songtdsearch_img' />
                                                            <div id={song.id} className='songtdsearch_div'>
                                                                <span className='spansearch_class' id={`${song.id} name`}>{song.name}</span>
                                                                {song.artist}
                                                            </div>
                                                        </td>
                                                        <td style={{ 'width': '10%' }}>
                                                            <button className='add_bttn' id={song.id} onClick={(e) => { Add_to_playlist(e.target.id) }}>Add</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className='search_to_add_songs'>
                                    <span>Search to add songs</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="findmore" id='div_show_search'>
                    <div onClick={() => { search_display(true) }}>Find more</div>
                </div>
            </div>
        </div>
    )
}

export default Playlist



// Most probably i have to change table hide option to edit new playlist diaply