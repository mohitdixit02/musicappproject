import './Open.css'
import p from '../../media/playicon.jpg';
import tick from '../../media/tick.jpg';
import { useLocation } from 'react-router-dom'
import OpenSonglist from './OpenSonglist'
import { backend_url } from '../utility/url_info';
import { useTrackContext } from '../MainWrapper/MainWrapper';

const Open = () => {
    const {
        setTrackslist,
    } = useTrackContext();
    const location = useLocation();
    if (location.state.type == 'music') {
        let temp = location.state.data[0];
        let song_data = location.state.data
        song_data = song_data[0]

        //Play fn
        function play_open_audio(e) {
            setTrackslist([song_data]);
            let target = e.target;
            // if(target.className == 'bi bi-play-circle'){
            //     target.className = 'bi bi-pause-circle';
            // }
            // else{
            //     target.className = 'bi bi-play-circle';
            // }
        }

        return (
            <div className="open_display">
                <div className="top_div">
                    <div className='open_top_heading'>
                        <img className='open_top_heading_img' src={`${temp.firebase_image_url}`} />
                        <div className='heading_text'>
                            <ul type='none'>
                                <li style={{ 'marginLeft': '3px' }}>{temp.album}</li>
                                <li className='open_name_head'>{temp.name}</li>
                                <br />
                                <li style={{ 'marginLeft': '3px' }}>{temp.artist} . 1 song</li>
                                <button onClick={play_open_audio}>
                                    Play
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="open_bottom_area">
                    <div>
                    </div>
                    <OpenSonglist songlist={song_data} type={'music'} />
                </div>
            </div>
        )
    }
    else if (location.state.type == 'artist') {
        const page_data = location.state.data[0];
        let artist_info = page_data['artist_info'];
        let artist_song_data = (page_data['artist_song_list']);
        artist_info = artist_info[0];
        let listn = artist_info.monthly_listeners
        listn = listn.toLocaleString();

        //play fn
        function play_open_artistaudio() {
            setTrackslist(artist_song_data);
        }
        return (
            <div className="open_display">
                <div className="top_div">
                    <div className='open_top_heading'>
                        <img className='open_top_heading_img_artist' src={`${artist_info.firebase_artist_image_url}`} style={{
                            'borderRadius': '300px'
                        }} />
                        <div className='heading_text'>
                            <ul type='none'>
                                <li style={{ 'display': 'flex' }}><img src={tick} height={'40px'} width={'75px'} /><span style={{ 'position': 'relative', 'top': '10px', 'right': '18px' }}>Verified Artist</span>
                                </li>
                                <li className='open_name_head' style={{ 'marginLeft': '28px' }}>{artist_info.name}</li>
                                <li style={{ 'marginLeft': '32px', 'marginTop':'5px' }}>{listn} monthly listeners</li>
                                <button style={{ 'marginLeft': '29px' }} onClick={play_open_artistaudio}>
                                    Play
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="open_bottom_area">
                    {/* <div>
                        <div style={{ 'display': 'flex' }}>
                            <i className="bi bi-play-circle" onClick={play_open_artistaudio}></i>
                        </div>
                    </div> */}
                    <OpenSonglist songlist={artist_song_data} type={'album'} />
                    <div className="about">
                        <h1>About</h1>
                        <br />
                        <div className="aboutflex">
                            <div style={{ 'height': '500px', 'width': '97%', 'overflow': 'hidden' }}>
                                <img src={`${artist_info.firebase_about_image_url}`} className='aboutimg' />
                            </div>
                            <div className='aboutinfo'>
                                <div style={{ 'fontSize': '22px', 'fontWeight': 'bold' }}>{listn} Monthly Listeners</div> <br /> <br />
                                <div>{artist_info.about}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if (location.state.type == 'album') {
        const song_data = location.state.data;
        let temp = song_data[0];
        function play_open_album() {
            setTrackslist(song_data);
        }

        //no of songs
        function no_of_songs() {
            if (song_data.length > 1) {
                return (
                    <>
                        {song_data.length} songs
                    </>
                )
            }
            else {
                return (
                    <>
                        {song_data.length} song
                    </>
                )
            }
        }

        let song_no = no_of_songs();

        return (
            <div className="open_display">
                <div className="top_div">
                    <div className='musicshow_wrapper' style={{
                        'backgroundImage': `url(${temp.firebase_image_url})`,
                    }}></div>
                    <div className='open_top_heading'>
                        <img className='open_top_heading_img' src={`${temp.firebase_image_url}`} />
                        <div className='heading_text'>
                            <ul type='none'>
                                <li style={{ 'marginLeft': '6px' }}>Album</li>
                                <li className='open_name_head'>{temp.album}</li>
                                <br />
                                <li style={{ 'marginLeft': '6px' }}>{temp.artist} . {song_no}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="open_bottom_area">
                    <div>
                        <div style={{ 'display': 'flex' }}>
                            <i className="bi bi-play-circle" onClick={play_open_album}></i>
                        </div>
                    </div>
                    <OpenSonglist songlist={song_data} type={'album'} />
                </div>
            </div>
        )
    }
}

export default Open
