import React, { useEffect, useState } from 'react'
import { ref, set, onValue, remove } from "firebase/database"
import database from './Firebase/Firebase'
import './CSS/Open.css'
import conv from './service component/time_conv'
import axios from 'axios'
import {backend_url} from './service component/url_info';

function OpenSonglist(props) {
    const song = props.songlist;
    const trackfn = props.trackfn;
    const tracklist = props.tracklist;
    const ctrack = props.ctrack;
    const user = props.user;
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
        }, 50)
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
                let index = document.getElementById(`${ctrack.id} index`);
                let name = document.getElementById(`${ctrack.id} songname`);
                if (index) {
                    index.className = 'songtd index_class activenow';
                }
                if (name) {
                    name.className = 'span_class activenow_class';
                }
            } catch (error) { }
        }, 100)

    }, [ctrack]);

    // Removing Song from Playlist
    function remove_from_playlist(value,index){
        let icon_id = value;
        icon_id = icon_id.substr(7, icon_id.length -6);

        //deleting data as well as row
        let target_row_no = document.getElementById(`${icon_id} index`).innerText;
        remove(ref(database, 'users/' + user + '/playlist/' + props.url +'/data/'+ index));

        //reducing index after deletion
        let rows_set = document.getElementsByClassName('index_class');
        for (let key of rows_set) {
            let check_value = parseInt(key.innerText);
            let comp_value = parseInt(target_row_no);
            if (check_value > comp_value) {
                key.innerText = check_value-1;
            }
        }
    }

    //index of playlist
    const [row_index,setIndex]= useState(0);

    switch (props.type) {
        case 'music': {
            let song = props.songlist
            let plays = song.plays.toLocaleString();
            let duration = conv(song.duration);
            return (
                <div className="song_list">
                    <table className='listtable' cellSpacing={0}>
                        <thead>
                            <tr>
                                <th style={{ 'width': '10%', 'textAlign': 'center' }}>#</th>
                                <th style={{ 'width': '60%' }}>TITLE</th>
                                <th className='table_plays' style={{ 'width': '50%' }}>PLAYS</th>
                                <th style={{ 'width': '30%', 'textAlign': 'right', 'paddingRight': '15px' }}><i className="bi bi-clock"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={5}><hr className='tabletopline' /></td></tr>
                            <tr className='songlist2_active' id={song.id} onClick={playsongtd}>
                                <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px' }} className='songtd index_class' id={`${song.id} index`}>1</td>
                                <td id={song.id} style={{ 'display': 'flex' }} className='songtd'>
                                    <div id={song.id} className='songtd_div'>
                                        <span className='span_class' id={`${song.id} songname`}>{song.name}</span>
                                        {song.artist}
                                    </div>
                                </td>
                                <td className='table_plays songtd'>{plays}</td>
                                <td className='songtd' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px' }}><div className='durn_open_list' style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '12px' }}><i className="bi bi-heart" id={`heart ${song.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        case 'album': {
            let song = props.songlist
            return (
                <div className="song_list">
                    <table className='listtable' cellSpacing={0}>
                        <thead>
                            <tr>
                                <th style={{ 'width': '10%', 'textAlign': 'center' }}>#</th>
                                <th style={{ 'width': '60%' }}>TITLE</th>
                                <th className='table_plays' style={{ 'width': '50%' }}>PLAYS</th>
                                <th style={{ 'width': '30%', 'textAlign': 'right', 'paddingRight': '15px' }}><i className="bi bi-clock"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={5}><hr className='tabletopline' /></td></tr>
                            {
                                song.map((element, index) => {
                                    let plays = element.plays
                                    plays = plays.toLocaleString();
                                    let duration = conv(element.duration);
                                    return (
                                        <tr key={index} id={element.id} className='songlist2_active' onClick={playsongtd}>
                                            <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px' }} id={`${element.id} index`} className='songtd index_class'>{index + 1}</td>
                                            <td id={element.id} style={{ 'display': 'flex' }} className='songtd'>
                                                <img src={`${backend_url}${element.song_img}`} className='songtd_img' />
                                                <div id={element.id} className='songtd_div'>
                                                    <span className='span_class' id={`${element.id} songname`}>{element.name}</span>
                                                    {element.artist}
                                                </div>
                                            </td>
                                            <td className='table_plays songtd'>{plays}</td>
                                            <td className='songtd' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px' }}><div className='durn_open_list' style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '5px' }}><i className="bi bi-heart" id={`heart ${element.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
        case 'playlist': {
            let song = props.songlist
            console.log(song)
            return (
                <div className="song_list">
                    <table className='listtable' cellSpacing={0}>
                        <thead>
                            <tr>
                                <th style={{ 'width': '10%', 'textAlign': 'center' }}>#</th>
                                <th style={{ 'width': '60%' }}>TITLE</th>
                                <th className='table_plays' style={{ 'width': '50%' }}>PLAYS</th>
                                <th style={{ 'width': '30%', 'textAlign': 'right', 'paddingRight': '15px' }}><i className="bi bi-clock"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={5}><hr className='tabletopline' /></td></tr>
                            {
                                song.map((element, index) => {
                                    let plays = element.plays
                                    plays = plays.toLocaleString();
                                    let duration = conv(element.duration);
                                    return (
                                        <tr key={index} id={element.id} className='songlist2_active' onClick={playsongtd}>
                                            <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px' }} id={`${element.id} index`} className='songtd index_class'>{index + 1}</td>
                                            <td id={element.id} style={{ 'display': 'flex' }} className='songtd'>
                                                <img src={`${backend_url}${element.song_img}`} className='songtd_img' />
                                                <div id={element.id} className='songtd_div'>
                                                    <span className='span_class' id={`${element.id} songname`}>{element.name}</span>
                                                    {element.artist}
                                                </div>
                                            </td>
                                            <td className='table_plays songtd'>{plays}</td>
                                            <td className='songtd'><div className='durn_open_list' style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '5px' }}><i className="bi bi-heart" id={`heart ${element.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                                            <td className='songtd' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px' }}><i style={{'position':'relative', 'marginLeft':'15px','marginRight':'12px'}} className="bi bi-x" id={`delete ${element.id}`} onClick={(e)=>{remove_from_playlist(e.target.id,index)}}></i></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
        default:
            return <></>
    }
}

export default OpenSonglist