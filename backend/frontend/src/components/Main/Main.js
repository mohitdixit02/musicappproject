import React, { useState, useEffect } from 'react';
import './main.css';
import img_data from '../utility/mediafile.js'
import p from '../../media/playicon.jpg'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GetSong, GetArtist, GetArtistinfo, GetAlbuminfo, GetMusicinfo, GetCategory } from '../utility/server_request_functions.js';
import { backend_url } from '../utility/url_info.js';
import { useTrackContext } from '../MainWrapper/MainWrapper.jsx';

import i1 from "../../media/explore_back_cover/Bollywood.jpg";
import i2 from "../../media/explore_back_cover/English.jpg";
import i3 from "../../media/explore_back_cover/Kpop.jpg";
import i4 from "../../media/explore_back_cover/Punjabi.jpg";

const Main = () => {
    const { setTrackslist } = useTrackContext();
    let trackfn = setTrackslist;
    const [genere, setGenere] = useState();
    const navigate = useNavigate();

    const browse_image_holder = {
        "Bollywood": i1,
        "KPOP": i3,
        "English": i2,
        "Punjabi": i4
    }

    async function getGenere() {
        try {
            GetSong().then((response) => {
                setGenere(response);
            });
        }
        catch { }
    }
    useEffect(() => {
        getGenere();
    }, [])

    // Wish Time
    function current_time() {
        let k = new Date();
        let h = k.getHours()
        if (h <= 12) {
            return ('Good Morning');
        }
        else if (h > 12 && h < 16) {
            return ('Good Afternoon');
        }
        else {
            return ('Good Evening');
        }
    }
    let ctime = current_time();

    //audio playing function
    function playaudio(e) {
        let play_id = e.target.id;
        play_id = play_id.substr(0, play_id.length - 5);
        try {
            axios.get(`${backend_url}/req_data/${play_id}`).then((response) => {
                trackfn([response.data[0]]);
            })
        } catch { }
    }

    //Artist Info function
    function artistinfo(e) {
        if (!e.target.id.includes('play')) {
            try {
                GetArtistinfo(e.target.id).then((response) =>
                    navigate('/info', {
                        state: {
                            'data': response,
                            'type': 'artist'
                        }
                    })
                );
            } catch { }
        }
    }

    //Music Info function
    function musicinfo(e) {
        if (!e.target.id.includes('play')) {
            try {
                GetMusicinfo(e.target.id).then((response) => {
                    navigate('/info', {
                        state: {
                            'data': response,
                            'type': 'music'
                        }
                    })
                })
            } catch { }
        }
    }
    //Album Calling function
    function getAlbum(e) {
        try {
            GetAlbuminfo(e.target.id).then((response) => {
                navigate('/info', {
                    state: {
                        'data': response,
                        'type': 'album'
                    }
                })
            })
        } catch { }
    }

    //Category Calling Function
    function showCategory(value) {
        try {
            GetCategory(value).then((response) => {
                navigate('/catg', {
                    state: {
                        'data': response,
                        'type': 'Category'
                    }
                })
            })
        } catch { }
    }

    //All Artists Calling function
    function showArtistlist() {
        try {
            GetArtist().then((data) => {
                navigate('/catg', {
                    state: {
                        'data': data,
                        'type': 'artist'
                    }
                })
            }).catch((error) => { })
        } catch { }
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

    // Data Fetch on loading
    const [data, getData] = useState([]);
    const [artist, getArtistData] = useState([]);
    useEffect(() => {
        let load_value = false
        if (!load_value) {
            try {
                GetSong().then((data) => getData(data)).catch((error) => {
                    if (error) {
                        let w = document.getElementsByClassName('main');
                        w[0].style.display = 'none';
                        let k = document.getElementsByClassName('error_div');
                        k[0].style.display = 'block';
                    }
                });
                GetArtist().then((data) => {
                    if (data.length < 5) {
                        getArtistData(data)
                    }
                    else {
                        let temp = data.splice(0, 5);
                        getArtistData(temp);
                    }
                }).catch((error) => {
                    if (error.message == 'Network Error') {
                        let w = document.getElementsByClassName('main');
                        w[0].style.display = 'none';
                        let k = document.getElementsByClassName('error_div');
                        k[0].style.display = 'block';
                    }
                });
            } catch (error) { }
        }
        load_value = true
    }, []);

    // album top scroll
    function listLeft() {
        try {
            let a = document.getElementsByClassName('albumflex')[0];
            a.scroll({
                left: (a.scrollLeft - a.scrollWidth / 5),
                behavior: 'smooth'
            })
        } catch { }
    }

    function listRight() {
        try {
            let a = document.getElementsByClassName('albumflex')[0];
            a.scroll({
                left: (a.scrollLeft + a.scrollWidth / 5),
                behavior: 'smooth'
            })
        } catch { }
    }

    //Category Calling Function
    function showCategory(value) {
        try {
            GetCategory(value).then((response) => {
                navigate('/catg', {
                    state: {
                        'data': response,
                        'type': "Category"
                    }
                })
            })
        } catch { }
    }

    //Return
    return (
        <>
            <div className='main'>
                <div className='album'>
                    <div id='wish'>{ctime} Buddy !!</div><br />
                    {/* <i className="bi bi-chevron-left albumflex_left" onClick={listLeft}></i>
                    <i className="bi bi-chevron-right albumflex_right" onClick={listRight}></i> */}
                    <div className="albumflex">
                        <div className='topbox'>
                            <img src={img_data['top_banner']} alt="" />
                        </div>
                    </div>
                </div>
                {
                    data.slice(0, 1).map((genere_key, index) => {
                        let song_array = genere_key.list[0]
                        if (song_array.length > 5) {
                            song_array = song_array.slice(0, 5);
                        }
                        return (
                            <div className="genbox_main" key={index}>
                                <div className='heading_holder_main'>
                                    <div className='heading'>{genere_key.genere}</div><br />
                                    <div className="allopt" id={genere_key.genere} onClick={(e) => { showCategory(e.target.id) }}>SEE ALL</div>
                                </div>
                                <div className="genbox_flex">
                                    {
                                        song_array.map((song_key) => {
                                            return (
                                                <div key={song_key.id} className='cover_box'>
                                                    <div className="genbox">
                                                        <div>
                                                            <img src={`${song_key.firebase_image_url}`} alt="Image" className="genbox_img" />
                                                        </div>
                                                        <div className="genbox_text1">
                                                            {song_key.name}
                                                        </div>
                                                        <div className="genbox_text2">
                                                            {song_key.artist}
                                                        </div>
                                                    </div>
                                                    <div className="music_cover" id={song_key.id} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={musicinfo}>
                                                        <img src={p} className='playicon_design' onClick={playaudio} id={`${song_key.id} play`} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    )
                }
                <div className='genbox_main'>
                    <div className='heading_holder_main'>
                        <div className='heading'>Explore</div><br />
                    </div>
                    <div className='genere_holder_main'>
                        {
                            genere?.map((genere_key, index) => {
                                return (
                                    <div key={`genere_holder_collection${index}`} className='genere_holder'>
                                        <div id={genere_key.genere} onClick={(e) => { showCategory(e.target.id) }} className='genere_holder_1' style={{ 'backgroundImage': `url(${browse_image_holder[genere_key.genere]})` }}></div>
                                        <div id={genere_key.genere} onClick={(e) => { showCategory(e.target.id) }} className='genere_holder_2'>
                                            {genere_key.genere}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    data.slice(1).map((genere_key, index) => {
                        let song_array = genere_key.list[0]
                        if (song_array.length > 5) {
                            song_array = song_array.slice(0, 5);
                        }
                        return (
                            <div className="genbox_main" key={index}>
                                <div className='heading_holder_main'>
                                    <div className='heading'>{genere_key.genere}</div><br />
                                    <div className="allopt" id={genere_key.genere} onClick={(e) => { showCategory(e.target.id) }}>SEE ALL</div>
                                </div>
                                <div className="genbox_flex">
                                    {
                                        song_array.map((song_key) => {
                                            return (
                                                <div key={song_key.id} className='cover_box'>
                                                    <div className="genbox">
                                                        <div>
                                                            <img src={`${song_key.firebase_image_url}`} alt="Image" className="genbox_img" />
                                                        </div>
                                                        <div className="genbox_text1">
                                                            {song_key.name}
                                                        </div>
                                                        <div className="genbox_text2">
                                                            {song_key.artist}
                                                        </div>
                                                    </div>
                                                    <div className="music_cover" id={song_key.id} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={musicinfo}>
                                                        <img src={p} className='playicon_design' onClick={playaudio} id={`${song_key.id} play`} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    )
                }
                <div className="genbox_main">
                    <div className='heading_holder_main'>
                        <div className='heading'>Artists</div><br />
                        <div className="allopt" onClick={showArtistlist}>SEE ALL</div>
                    </div>
                    <div className="genbox_flex">
                        {
                            artist.map((artist_key) => {
                                let temp = artist_key[0];
                                return (
                                    <div key={temp.id} className='cover_box' >
                                        <div className="genbox">
                                            <div>
                                                <img src={`${temp.firebase_artist_image_url}`} alt="Image" className="genbox_img_artist" />
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
                <br /> <br /> <br /> <br /> <br />
            </div>
            <div className='error_div'>
                <i className="bi bi-emoji-frown"></i>
                <div>Unfortunately, Server is not responding..</div>
            </div>
        </>
    );
}


// JS Begins
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

// TopBox playicon
function getelement_top(e) {
    let w = document.getElementById(`${e.target.id} play`)
    try {
        w.style.display = 'block'
        setTimeout(() => {
            w.className = `playicon_design2 animateicon2`
        }, 100)
    } catch (error) { }
}
function removeelement_top(e) {
    let w = document.getElementsByClassName('playicon_design2')
    try {
        for (let item of w) {
            item.style.display = 'none'
            item.className = `playicon_design2`
        }
    } catch (error) { }
}

export default Main;
