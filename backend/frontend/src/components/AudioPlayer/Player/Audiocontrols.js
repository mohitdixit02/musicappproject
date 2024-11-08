import React, { useEffect } from 'react'
import './play.css'
import { useNavigate, Link } from 'react-router-dom';
import conv from '../../utility/time_conv';

function Audiocontrols(props) {
  const navigate = useNavigate();
  let tracklist = props.track;

  let i = props.index;
  let seti = props.setIndex;
  let l = props.track.length;
  function audio_play() {
    if (props.isPlaying) {
      props.isPlayingstate(false);
      props.song.current.pause();
    }
    else {
      props.isPlayingstate(true);
      props.song.current.play();
    }
  }
  useEffect(() => {
    if (props.isPlaying) {
      try {
        let w = document.getElementsByClassName('bi bi-play-circle-fill');
        w[0].className = 'bi bi-pause-circle-fill';
      }
      catch (error) { }
    }
    else {
      try {
        let w = document.getElementsByClassName('bi bi-pause-circle-fill');
        w[0].className = 'bi bi-play-circle-fill';
      }
      catch (error) { }
    }
  }, [props.isPlaying]);

  useEffect(() => {
    if (props.ctrack['id'] == undefined) {
      try {
        let w = document.getElementsByClassName('bi bi-pause-circle-fill');
        w[0].className = 'bi bi-play-circle-fill';
      }
      catch (error) { }
    }
    else {
      try {
        let w = document.getElementsByClassName('bi bi-play-circle-fill');
        w[0].className = 'bi bi-pause-circle-fill';
        props.isPlayingstate(true);
      }
      catch (error) { }
    }
  }, [props.ctrack])

  //Song changing
  function prevSong() {
    if (props.song.current.currentTime < 3) {
      if (i != 0) {
        seti(i - 1)
      }
      else {
        seti(l - 1);
      }
    }
    else {
      props.song.current.currentTime = 0;
    }
  }
  function nextSong() {
    if (i != (l - 1)) {
      seti(i + 1)
    }
    else {
      seti(0);
    }
  }

  //Audio Converting
  let update_time = props.progress
  update_time = conv(update_time);
  
  //TrackChange
  function onScrub(value) {
    props.SetProgress(value);
    props.song.current.currentTime = value;
    props.song.current.pause();
  }
  function onScrubend(value) {
    props.SetProgress(value);
    props.song.current.currentTime = value;
    if (props.isPlaying) {
      props.song.current.play();
    }
  }

  //RepeatValue Function
  let repeat = props.repeat;
  let setRepeat = props.setrepeat;
  function repeat_function() {
    let w = document.getElementById('repeat');
    if (!repeat) {
      setRepeat(true);
      props.song.current.loop = true;
      w.style.color = 'rgb(135, 117, 255)';
    }
    else {
      setRepeat(false);
      props.song.current.loop = false;
      w.style.color = 'lightgrey';
    }
  }

  // function for audio slide gradient css
  function get_progress_gradient() {
    // parseInt(props.progress) / parseInt(props.original_duration)) * 100
    let current_progress = parseInt(props.progress);
    let original_duration = parseInt(props.original_duration);
    if(original_duration === 0){
      original_duration = 1;
    }
    return `linear-gradient(
      to right,
      rgb(144, 116, 255) 0%, 
      rgb(144, 116, 255) ${(current_progress / original_duration) * 100}%, 
      #ccc ${(current_progress / original_duration) * 100}%, 
      #ccc 100%)`;
  }

  //Function to show tracks list
  useEffect(() => {
    if (window.location.pathname == '/currenttrack') {
      let temp = document.getElementById('musiclist');
      temp.style.color = 'rgb(135, 117, 255)';
    }
    else {
      let temp = document.getElementById('musiclist');
      temp.style.color = 'lightgrey';
    }

  }, [window.location.pathname])

  return (
    <div className="middle">
      <div className='middle_child'>
        <div className="slider">
          <input
            type="range"
            step='1'
            className='progress_bar'
            min={0}
            max={props.original_duration}
            value={props.progress}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={(e) => onScrubend(e.target.value)}
            style={{
              'background': get_progress_gradient(),
              'height':'5px'
            }}
          />
          <div>
            <span id='ctime'>{update_time}</span>
            <span id='ttime'>{props.duration}</span>
          </div>
        </div>
        <div className="bttns">
          <i className="bi bi-shuffle" id='shuffle'></i>
          <i className="bi bi-skip-start-fill" id='skipstart' onClick={prevSong}></i>
          <i className="bi bi-play-circle-fill" id='playbttn' onClick={audio_play}></i>
          <i className="bi bi-skip-end-fill" id='skipend' onClick={nextSong}></i>
          <i className="bi bi-repeat" id='repeat' onClick={repeat_function}></i>
        </div>
      </div>
    </div>
  )
}

export default Audiocontrols


