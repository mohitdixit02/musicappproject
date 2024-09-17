import './Open.css'
import p from '../../media/playicon.jpg';
import tick from '../../media/tick.jpg';
import { useLocation } from 'react-router-dom'
import OpenSonglist from './OpenSonglist'
import { backend_url } from '../utility/url_info';

const Open = (props) => {
    const location = useLocation();
    if (location.state.type == 'music') {
        let temp = location.state.data[0];
        let song_data = location.state.data
        song_data = song_data[0]

        //Play fn
        function play_open_audio(e) {
            props.trackfn([song_data]);
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
                        <img className='open_top_heading_img' src={`${temp.firebase_image_url}`}/>
                        <div className='heading_text'>
                            <ul type='none'>
                                <li style={{ 'marginLeft': '6px' }}>{temp.album}</li>
                                <li className='open_name_head'>{temp.name}</li>
                                <br />
                                <li style={{ 'marginLeft': '6px' }}>{temp.artist} . 1 song</li>
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
                    <OpenSonglist songlist={song_data} type={'music'} tracklist={props.track} actvfn={props.actvfn} trackfn={props.trackfn} ctrack={props.current_track} user={props.user} />
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
            let trackfn = props.trackfn
            trackfn(artist_song_data);
        }
        return (
            <div className="open_display">
                <div className="top_div">
                    {/* <div className='musicshow_wrapper' style={{
                    'backgroundImage': `url(${artist_info.about_img})`
                    }}></div> */}
                    <div className='open_top_heading'>
                        <img className='open_top_heading_img_artist' src={`${artist_info.firebase_artist_image_url}`} style={{
                            'borderRadius': '300px'
                        }} />
                        <div className='heading_text' style={{ 'paddingTop': '28px' }}>
                            <ul type='none'>
                                <li style={{ 'display': 'flex' }}><img src={tick} height={'40px'} width={'75px'} /><span style={{ 'position': 'relative', 'top': '10px', 'right': '18px' }}>Verified Artist</span>
                                </li>
                                <li className='open_name_head' style={{'marginLeft': '28px' }}>{artist_info.name}</li>
                                <br />
                                <li style={{ 'marginLeft': '32px' }}>{listn} monthly listeners</li>
                                <button style={{ 'marginLeft': '29px' }} onClick={play_open_artistaudio}>
                                    Play
                                </button>
                            </ul>
                        </div>
                    </div></div>
                <div className="open_bottom_area">
                    {/* <div>
                        <div style={{ 'display': 'flex' }}>
                            <i className="bi bi-play-circle" onClick={play_open_artistaudio}></i>
                        </div>
                    </div> */}
                    <OpenSonglist ctrack={props.current_track} trackfn={props.trackfn} songlist={artist_song_data} tracklist={props.track} type={'album'} actvfn={props.actvfn} user={props.user} />
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
            props.trackfn(song_data);
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
                            <i className="bi bi-play-circle"  onClick={play_open_album}></i>
                        </div>
                    </div>
                    <OpenSonglist ctrack={props.current_track} trackfn={props.trackfn} songlist={song_data} tracklist={props.track} type={'album'} actvfn={props.actvfn} user={props.user} />
                </div>
            </div>
        )
    }
}

export default Open
