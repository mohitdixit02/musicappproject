import './App.css';
import { useState } from 'react';
import Leftpannel from './components/Leftpannel';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Open from './components/Open';
import Play from './components/Play';
import { Routes, Route } from "react-router-dom";
import Showtracks from './components/Showtracks';
import Searchpage from './components/Searchpage';
import Library from './components/Library';
import Catgdisplay from './components/Catgdisplay';
import Profile from './components/Profile';
import Likedsongs from './components/Playlists/Likedsongs';
import Musicdisplay from './components/Musicdisplay';
import Playlist from './components/Playlists/Playlist';


function App() {
  const [trackslist, setTrackslist] = useState(['']);
  const [actvstate, setActivestate] = useState(0);
  const [current_track, setCurrent_track] = useState({});
  const [searchvalue, setSearchvalue] = useState('');
  const [user, setUser] = useState('none');

  return (
    <div className='app'>
      <Routes>
        <Route exact path='*' element={
          <div className='top'>
            <Leftpannel state={'home'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(53, 42, 104)' display={'none'} user={user} setUser={setUser} />
              <Main className='main' trackfn={setTrackslist} user={user} />
            </div>
          </div>
        } />
        <Route path='/search' element={
          <div className='top'>
            <Leftpannel state={'search'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(53, 42, 104)' display={'block'} setSearchvalue={setSearchvalue} user={user} setUser={setUser} />
              <Searchpage search={searchvalue} current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} setSearchvalue={setSearchvalue} user={user} />
            </div>
          </div>
        } />
        <Route path='/library' element={
          <div className='top'>
            <Leftpannel state={'library'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(7, 2, 30)' display={'none'} user={user} setUser={setUser} />
              <Library />
            </div>
          </div>
        } />
        <Route path='/info' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar display={'none'} user={user} setUser={setUser} />
              <Open current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
          </div>
        } />
        <Route path='/currenttrack' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(7, 2, 30)' display={'none'} user={user} setUser={setUser} />
              <Showtracks current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
          </div>
        } />
        <Route path='/catg' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(7, 2, 30)' display={'none'} user={user} setUser={setUser} />
              <Catgdisplay current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
          </div>
        } />
        <Route path='/profile' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(173, 179, 230)' display={'none'} user={user} setUser={setUser} />
              <Profile />
            </div>
          </div>
        } />
        <Route path='/liked' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgb(245, 89, 89)' display={'none'} user={user} setUser={setUser} />
              <Likedsongs current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
          </div>
        } />
        <Route path='/playlist' element={
          <div className='top'>
            <Leftpannel state={'none'} user={user} />
            <div className='app_content_box'>
              <Navbar bgcolor='rgba(83,83,83,255)' display={'none'} user={user} setUser={setUser} />
              <Playlist current_track={current_track} trackfn={setTrackslist} track={trackslist} actvfn={setActivestate} user={user} />
            </div>
          </div>
        } />
        <Route path='/audiodisplay' element={
          <div className='top'>
            {(window.innerWidth < 896) ? <Leftpannel state={'none'} user={user} /> : <></>}
            <div className='top'>
              <Musicdisplay current_track={current_track} />
            </div>
          </div>
        } />
      </Routes>
      <Play tracklist={trackslist} actv={actvstate} current_track={current_track} setCurrent_track={setCurrent_track} />
    </div>
  );
}


export default App;
