import React, {useEffect} from 'react'
import './CSS/play.css'
import conv from './service component/time_conv'

function Audiocontrols(props) {
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
    if(props.isPlaying){
      try{
        let w=document.getElementsByClassName('bi bi-play-circle-fill');
        w[0].className='bi bi-pause-circle-fill';
      }
      catch(error){}
    }
    else{
      try{
        let w=document.getElementsByClassName('bi bi-pause-circle-fill');
        w[0].className='bi bi-play-circle-fill';
      }
      catch(error){}
    }
  }, [props.isPlaying]);

  useEffect(()=>{
    if(props.ctrack['id']==undefined){
      try{
        let w=document.getElementsByClassName('bi bi-pause-circle-fill');
        w[0].className='bi bi-play-circle-fill';
      }
      catch(error){}
    }
    else{
    try{
      let w=document.getElementsByClassName('bi bi-play-circle-fill');
      w[0].className='bi bi-pause-circle-fill';
      props.isPlayingstate(true);
    }
    catch(error){}
  }
  },[props.ctrack])

  //Song changing
  function prevSong() {
    if(props.song.current.currentTime<3){
    if (i != 0) {
      seti(i - 1)
    }
    else {
      seti(l - 1);
    }}
    else{
      props.song.current.currentTime=0;
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
  let update_time=props.progress
  update_time=conv(update_time);

  //TrackChange
  function onScrub(value){
      props.SetProgress(value);
      props.song.current.currentTime=value;
      props.song.current.pause();
  }
  function onScrubend(value){
      props.SetProgress(value);
      props.song.current.currentTime=value;
      if(props.isPlaying){
      props.song.current.play();
      }
  }

  //RepeatValue Function
  let repeat=props.repeat;
  let setRepeat=props.setrepeat;
  function repeat_function(){
    let w=document.getElementById('repeat');
    if(!repeat){
      setRepeat(true);
      props.song.current.loop=true;
      w.style.color='rgba(32,215,97,255)';
    }
    else{
      setRepeat(false);
      props.song.current.loop=false;
      w.style.color='lightgrey';
    }
  }
  

    return (
      <div className="middle">
        <div className="bttns">
          <i className="bi bi-shuffle" id='shuffle'></i>
          <i className="bi bi-skip-start-fill" id='skipstart' onClick={prevSong}></i>
          <i className="bi bi-play-circle-fill" id='playbttn' onClick={audio_play}></i>
          <i className="bi bi-skip-end-fill" id='skipend' onClick={nextSong}></i>
          <i className="bi bi-repeat" id='repeat' onClick={repeat_function}></i>
        </div>
        <div style={{'display':'flex','justifyContent':'center'}}>
        </div>
        <div className="slider">
          <span id='ctime'>{update_time}</span>
          <input type="range" step='1' className='progress_bar' min={0} max={props.original_duration} value={props.progress} onChange={(e)=>onScrub(e.target.value)} onMouseUp={(e)=>onScrubend(e.target.value)} />
          <span id='ttime'>{props.duration}</span>
        </div>
      </div>
    )
}

export default Audiocontrols


