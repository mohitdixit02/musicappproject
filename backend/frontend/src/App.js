import './App.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Leftpannel from './components/LeftPannel/Leftpannel';
import Main from './components/Main/Main';
import Navbar from './components/navbar/Navbar';
import Open from './components/DisplayView/Open';
import Play from './components/AudioPlayer/Player/Play';
import { Routes, Route } from "react-router-dom";
import Showtracks from './components/AudioPlayer/ShowTracks/Showtracks';
import Searchpage from './components/Search/Searchpage';
import Library from './components/Library/Library';
import Catgdisplay from './components/DisplayView/Catgdisplay';
import Profile from './components/User/Profile';
import Likedsongs from './components/Playlists/LikedSongs/Likedsongs';
import Musicdisplay from './components/AudioPlayer/MusicDisplay/Musicdisplay';
import Playlist from './components/Playlists/Playlists/Playlist';
import Login from './components/User/Login/Login';


function App() {
  const [trackslist, setTrackslist] = useState(['']);
  const [actvstate, setActivestate] = useState(0);
  const [current_track, setCurrent_track] = useState({});
  const [searchvalue, setSearchvalue] = useState('');
  const [user, setUser] = useState('none');

  return (
    <div className='app'>
      <Login user={user} setUser={setUser} />
      <Routes>
        <Route exact path='*' element={
          <div className='top'>
            <Leftpannel state={'home'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Main className='main' trackfn={setTrackslist} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/search' element={
          <div className='top'>
            <Leftpannel state={'search'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'block'} setSearchvalue={setSearchvalue} user={user} setUser={setUser} />
              <Searchpage search={searchvalue} current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} setSearchvalue={setSearchvalue} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/library' element={
          <div className='top'>
            <Leftpannel state={'library'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Library />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/info' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(45, 45, 110, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Open current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/currenttrack' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Showtracks current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/catg' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Catgdisplay current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/profile' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Profile />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/liked' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Likedsongs current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/playlist' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} user={user} setUser={setUser} />
              <Playlist current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
        <Route path='/audiodisplay' element={
          <div className='top'>
            {(window.innerWidth < 896) ? <Leftpannel state={'none'} user={user} /> : <></>}
            <div className='top'>
              <Musicdisplay current_track={current_track} />
            </div>
            <Play tracklist={trackslist} actv={actvstate} user={user} trackfn={setTrackslist} current_track={current_track} actvfn={setActivestate} setCurrent_track={setCurrent_track} />
          </div>
        } />
      </Routes>
      {/* <Play tracklist={trackslist} actv={actvstate} current_track={current_track} setCurrent_track={setCurrent_track} /> */}
    </div>
  );
}


export default App;
