import './App.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Main from './components/Main/Main';
import Navbar from './components/navbar/Navbar';
import Open from './components/DisplayView/Open';
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
import MainWrapper from "./components/MainWrapper/MainWrapper";

function App() {
  const [searchvalue, setSearchvalue] = useState('');

  return (
    <div className='app'>
      <ToastContainer />
      <Login />
      <Routes>
        <Route exact path='*' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Main className='main' />
          </MainWrapper>
        } />
        <Route path='/search' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'block'} setSearchvalue={setSearchvalue} />
            <Searchpage search={searchvalue} setSearchvalue={setSearchvalue} />
          </MainWrapper>
        } />
        <Route path='/library' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Library />
          </MainWrapper>
        } />
        <Route path='/info' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(45, 45, 110, 0.541)' display={'none'} />
            <Open />
          </MainWrapper>
        } />
        <Route path='/currenttrack' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Showtracks />
          </MainWrapper>
        } />
        <Route path='/catg' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Catgdisplay />
          </MainWrapper>
        } />
        <Route path='/profile' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Profile />
          </MainWrapper>
        } />
        <Route path='/liked' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Likedsongs />
          </MainWrapper>
        } />
        <Route path='/playlist' element={
          <MainWrapper>
            <Navbar bgcolor='rgba(21, 21, 32, 0.541)' display={'none'} />
            <Playlist />
          </MainWrapper>
        } />
        <Route path='/audiodisplay' element={
          <MainWrapper>
            <Musicdisplay />
          </MainWrapper>
        } />
      </Routes>
    </div>
  );
}


export default App;
