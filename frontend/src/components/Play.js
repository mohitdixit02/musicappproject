import React, { useState, useRef, useEffect } from 'react'
import './CSS/play.css'
import Audiocontrols from './Audiocontrols';
import conv from './service component/time_conv'
import dummy from './media/spotify_dummy.png'
import { useNavigate, Link } from 'react-router-dom';
import { backend_url } from './service component/url_info';

export default function Play(props) {
  //Variables
  let tracklist = props.tracklist;

  //defined states
  const [isPlaying, setPlaystate] = useState(false);
  const song_current = useRef(new Audio(''));
  const progress_interval = useRef();
  const [index, setIndex] = useState(0);
  const [trackprogress, SetProgress] = useState(0);
  const [volume_level, setVolume] = useState(100);
  const [repeat, setRepeat] = useState(false);
  const current_track = props.current_track;
  const setCurrent_track = props.setCurrent_track;
  const actv = props.actv;
  const navigate = useNavigate();

  // functions
  useEffect(() => {
    if (tracklist != ['']) {
      // console.log((song_current.current.src != (window.location.href)+'undefined') && (song_current.current.src != (window.location.href)))
      song_current.current.pause();
      let tempsong = tracklist[0];
      song_current.current = new Audio(backend_url+`${tempsong['song_source']}`);
      setPlaystate(true);
      setIndex(0);
      setCurrent_track(tracklist[0]);
      song_current.current.play();
    }
  }, [tracklist]);

  useEffect(() => {
    setPlaystate(false);
    song_current.current.pause();
    let tempsong = tracklist[index];
    song_current.current = new Audio(backend_url+`${tempsong['song_source']}`);
    song_current.current.play();
    setPlaystate(true);
    setCurrent_track(tracklist[index]);
  }, [index]);

  // activestate
  useEffect(() => {
    for (let i = 0; i < tracklist.length; i++) {
      let temp_obj = tracklist[i];
      if (temp_obj['id'] == actv) {
        setIndex(i);
      }
    }
  }, [actv])

  //Tracking the song
  const duration = useRef();
  let durn = current_track['duration'];
  if (durn == undefined) {
    durn = 0
  }
  duration.current = conv(durn);
  function setTimer() {
    clearInterval(progress_interval);
    progress_interval.current = setInterval(() => {
      if (parseInt(song_current.current.currentTime) == durn) {
        if (!repeat) {
          if (index != (tracklist.length - 1)) {
            setIndex(index + 1);
          }
          else {
            setIndex(0);
          }
        }
      }
      else {
        SetProgress(song_current.current.currentTime);
      }
    }, 1000)
  }

  useEffect(() => {
    if (current_track['id'] == undefined) {
      let w = document.getElementById('playsong_img');
      w.src = `${dummy}`;
    }
    else {
      setTimer();
    }
  }, [current_track])


  //Function to show tracks list
  useEffect(() => {
    if (window.location.pathname == '/currenttrack') {
      let temp = document.getElementById('musiclist');
      temp.style.color = 'rgba(32,215,97,255)';
    }
    else {
      let temp = document.getElementById('musiclist');
      temp.style.color = 'lightgrey';
    }

  }, [window.location.pathname])

  function showTracks() {
    if (window.location.pathname != '/currenttrack') {
      if (tracklist[0] == '') {
        navigate('/currenttrack', {
          state: {
            'data': 'blank'
          }
        })
      }
      else {
        navigate('/currenttrack', {
          state: {
            'data': tracklist
          }
        })
      }
    }
    else {
      navigate(-1);
    }
  }

  // Volume Slider
  const [definedvolume, changedefinedVolume] = useState(100);
  function volumechange(value) {
    setVolume(value);
    song_current.current.volume = (value / 100);
    changedefinedVolume(value);
    if (value < 1) {
      let k = document.getElementById('volume_bttn');
      k.className = 'bi bi-volume-mute';
    }
    else {
      let k = document.getElementById('volume_bttn');
      k.className = 'bi bi-volume-up';
    }
  }

  useEffect(() => {
    if (!song_current.current.src.includes('undefined')) {
      song_current.current.volume = (definedvolume / 100);
    };
  }, [current_track])

  //Mute button
  const [lastvolume, setLastvolume] = useState();
  function volume_bttn(value) {
    if (value.className == 'bi bi-volume-up') {
      value.className = 'bi bi-volume-mute';
      setLastvolume(song_current.current.volume * 100);
      volumechange(0);
    }
    else if (value.className == 'bi bi-volume-mute') {
      value.className = 'bi bi-volume-up';
      volumechange(lastvolume);
    }
  }

  return (
    <div className='play'>
      <Link to='/audiodisplay' style={{'textDecoration':'none'}}>
      <div className="left">
        <img src={`${backend_url}${current_track.song_img}`} id='playsong_img' />
        <div id='playtext'>{current_track.name}<br /> <span id='artist'>{current_track.artist}</span></div>
      </div></Link>
      <Audiocontrols isPlaying={isPlaying} isPlayingstate={setPlaystate} song={song_current} index={index} setIndex={setIndex} track={tracklist} progress={trackprogress} ctrack={current_track} SetProgress={SetProgress} duration={duration.current} original_duration={durn} repeat={repeat} setrepeat={setRepeat} />
      <div className="right">
        <i className="bi bi-music-note-list" id='musiclist' onClick={showTracks}></i>
        <i className="bi bi-volume-up" id='volume_bttn' onClick={(e) => volume_bttn(e.target)}></i>
        <div className="volume_slider" value='100'>
          <input type='range' id='volume_slider' value={volume_level} min='0' max='100' onChange={(e) => volumechange(e.target.value)} />
        </div>
      </div>
    </div>
  )
}