import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './searchpage.css'
import { GetSong } from '../utility/server_request_functions';
import conv from '../utility/time_conv'
import p from '../../media/playicon.jpg'
import { useNavigate } from 'react-router-dom';
import { ref, set, onValue, remove } from "firebase/database"
import database from '../../Firebase/Firebase'
import { GetMusicinfo, GetArtistinfo, GetAlbuminfo, GetCategory } from '../utility/server_request_functions';
import { backend_url } from '../utility/url_info';
import { getTrackConetxt, useTrackContext } from "../MainWrapper/MainWrapper";
import { toast } from 'react-toastify';

function Searchpage(props) {
  const navigate = useNavigate();
  const [genere, setGenere] = useState();
  const [song, setSong] = useState([]);
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [top, setTopinfo] = useState([]);
  const [type, setType] = useState('');
  const user = sessionStorage.getItem('user') || "none";

  const {
    trackslist,
    setTrackslist,
    actvstate,
    setActivestate,
    current_track,
    setCurrent_track
  } = useTrackContext();

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

  //Playing audio function
  const trackfn = setTrackslist;
  const tracklist = trackslist;
  const ctrack = current_track;
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
      setActivestate(temp);
    }
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
        let begin = document.getElementsByClassName('spansearch_class');
        for (let i of begin) {
          i.className = 'spansearch_class';
        }
        let index = document.getElementById(`${ctrack.id} index`);
        let name = document.getElementById(`${ctrack.id} name`);
        if (index) {
          index.className = 'songtd index_class activenow';
        }
        if (name) {
          name.className = 'spansearch_class activenow_class';
        }
      } catch (error) { }
    }, 100)

  }, [ctrack]);


  //Random background color
  function backgroundColor_generator(value) {
    let l1 = 200 * Math.random()
    let l2 = 200 * Math.random()
    let l3 = 200 * Math.random()
    if (l1 < 50) {
      l1 = l1 + 180;
    }
    if (l2 < 50) {
      l2 = l2 + 130;
    }
    if (l3 < 50) {
      l3 = l3 + 100;
    }
    let color = `rgb(${l1}, ${l2}, ${l3})`;
    return color
  }

  //Artist Info function
  function artistinfo(e) {
    if (!e.target.id.includes('play')) {
      GetArtistinfo(e.target.id).then((response) =>
        navigate('/info', {
          state: {
            'data': response,
            'type': 'artist'
          }
        })
      );
    }
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

  //Search Value Index
  let value = props.search;
  useEffect(() => {
    if (value != '') {
      try {
        axios.get(`${backend_url}/req_data/search/${value}`).then((response) => {
          setSong(response.data['song']);

          const artist_data = response.data['artist'];
          const artist_separate = [];

          // generating data for display
          function artistdivide_length() {
            if (window.innerWidth > 1411) {
              return 5;
            }
            else if (window.innerWidth > 1151) {
              return 4;
            }
            else if (window.innerWidth > 703) {
              return 3;
            }
            else {
              return 2;
            }
          }
          for (let i = 0; i < artist_data.length; i = i + artistdivide_length()) {
            let temp = artist_data.slice(i, i + artistdivide_length())
            artist_separate.push(temp);
          }
          setArtist(artist_separate);

          setAlbum(response.data['album']);

          if (response.data['song'].length == 0) {
            let w = document.getElementById('songlist_maindiv');
            w.style.display = 'none';
            if (response.data['album'].length == 0) {
              setTopinfo(response.data['artist']);
              setType('artist');
            }
            else {
              setTopinfo(response.data['album']);
              setType('album');
            }
          }
          else {
            let w = document.getElementById('songlist_maindiv');
            if (w) {
              w.style.display = 'block';
            }
            setTopinfo(response.data['song']);
            setType('song');
          }
          if (response.data['album'].length == 0) {
            let w = document.getElementById('albumbox_main');
            w.style.display = 'none';
          }
          else {
            let w = document.getElementById('albumbox_main');
            w.style.display = 'block';
          }
          if (response.data['artist'].length == 0) {
            let k = document.getElementById('artistbox_main');
            k.style.display = 'none';
          }
          else {
            let w = document.getElementById('artistbox_main');
            w.style.display = 'block';
          }
        })
      }
      catch { }
    }
  }, [value])

  //Reseting search
  useEffect(() => {
    let fn = props.setSearchvalue;
    fn('');
  }, [window.location.pathname])

  //Liked Songs function
  function liked_song(e) {
    if(user === "none"){
      toast.warn("Please login to like songs")
      return;
    }

    let icon_id = e.target.id;
    icon_id = icon_id.substr(6, icon_id.length - 5);
    let k = document.getElementById(e.target.id);
    if (user != 'none') {
      if (k.className == 'bi bi-heart') {
        k.className = 'bi bi-heart-fill heart_icon';
        //Setting database
        axios.get(`${backend_url}/req_data/${icon_id}`).then((response) => {
          const data = response.data[0];
          set(ref(database, 'users/' + user + '/liked/' + icon_id + '/'), {
            song: data
          })
        })
        toast.success('Added to Liked Songs');
      }
      else {
        k.className = 'bi bi-heart';
        // removing data
        remove(ref(database, 'users/' + user + '/liked/' + icon_id + '/'))
        toast.success('Removed from Liked Songs');
      }
    }
  }

  //Setting Liked Songs on Load
  useEffect(() => {
    if (user != 'none') {
      let t = document.getElementsByClassName('heart_icon');
      for (let item of t) {
        item.className = 'bi bi-heart';
      }
      setTimeout(() => {
        onValue(ref(database, 'users/' + user + '/liked/'), (snapshot) => {
          const data = snapshot.val();
          for (let key in data) {
            let w = document.getElementsByClassName('bi-heart');
            for (let item of w) {
              if (item.id == `heart ${key}`) {
                item.className = 'bi bi-heart-fill heart_icon';
              }
              else {
                item.className = 'bi bi-heart';
              }
            }
          }
        })
      }, 50)
    }
  }, [value])

  //Music playing function
  function musicinfo(e) {
    if (!e.target.id.includes('play')) {
      GetMusicinfo(e.target.id).then((response) => {
        navigate('/info', {
          state: {
            'data': response,
            'type': 'music'
          }
        })
      })
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
            'type': "Category"
          }
        })
      })
    } catch { }
  }

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

  if (value == '') {
    // if (genere != undefined) {
    //   return (
    //     <div className='search_main'>
    //       <div className="categories">
    //         <span>Trending Hits</span>
    //         <div className="catgflex">
    //           {
    //             // genere.map((value, index) => {
    //             //   return (
    //             //     <div className="catg" key={index} style={{ 'backgroundColor': `${backgroundColor_generator()}` }} id={value.genere} onClick={(e) => { showCategory(e.target.id) }}>
    //             //       <span id={value.genere}>{value.genere}</span>
    //             //     </div>
    //             //   )
    //             // })
    //           }
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }
    // else {
    return (
      <div className='search_main' id="loading">
        <div>
          <i className="bi bi-headphones"></i>
          Start typing to dive into the world of <span>Music</span> !!
        </div>
      </div>
    )
    // }
  }
  else {
    return (
      <div className='search_main'>
        <div className="searchresult">
          <div className="upsearch">
            <div>
              <h3>Top Result</h3>
              <div className="topresult">
                <div className="serachtopsongname">
                  {
                    top.map((top_key, index) => {
                      if (type == 'song') {
                        if (index == 0) {
                          return (
                            <div key={top_key.id} className='searchcover_box'>
                              <div className="search_genbox">
                                <div>
                                  <img src={`${top_key.firebase_image_url}`} alt="Image" className="searchresult_img" />
                                </div>
                                <div>
                                  <div className="searchresult_text1">
                                    {top_key.name}
                                  </div>
                                  <div className="searchresult_text2">
                                    {top_key.artist}
                                  </div>
                                </div>
                              </div>
                              <div className="searchmusic_cover" id={top_key.id} onMouseEnter={getelement_search} onMouseLeave={removeelement_search} onClick={musicinfo}>
                                <img src={p} className='playicon_design_search' onClick={playaudio} id={`${top_key.id} play`} />
                              </div>
                            </div>
                          )
                        }
                      }
                      else if (type == 'artist') {
                        return (
                          <div key={top_key.id} className='searchcover_box'>
                            <div className="search_genbox">
                              <div>
                                <img src={`${top_key.firebase_artist_image_url}`} alt="Image" className="searchresult_img" />
                              </div>
                              <div>
                                <div className="searchresult_text1">
                                  {top_key.name}
                                </div>
                                <div className="searchresult_text2">
                                  Artist
                                </div>
                              </div>
                            </div>
                            <div className="searchmusic_cover" id={top_key.name} onMouseEnter={getelement_search} onMouseLeave={removeelement_search} onClick={artistinfo}>
                              <img src={p} className='playicon_design_search' id={`${top_key.name} play`} onClick={artistPlay} />
                            </div>
                          </div>
                        )
                      }
                      else if (type == 'album') {
                        return (
                          <div key={top_key.id} className='searchcover_box'>
                            <div className="search_genbox">
                              <div>
                                <img src={`${top_key.firebase_image_url}`} alt="Image" className="searchresult_img" />
                              </div>
                              <div>
                                <div className="searchresult_text1">
                                  {top_key.album}
                                </div>
                                <div className="searchresult_text2">
                                  Album
                                </div>
                              </div>
                            </div>
                            <div className="searchmusic_cover" id={top_key.album} onMouseEnter={getelement_search} onMouseLeave={removeelement_search} onClick={getAlbum}>
                              <img src={p} className='playicon_design_search' id={`${top_key.album} play`} />
                            </div>
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </div>
            </div>

            <div id='songlist_maindiv'>
              <h3>Songs</h3>
              <div className="songsearch_list">
                <table className='listtablesearch' cellSpacing={0}>
                  <tbody>
                    {
                      song.map((song, index) => {
                        let plays = song.plays
                        plays = plays.toLocaleString();
                        let duration = conv(song.duration);
                        return (
                          <tr id={song.id} key={index} className='songlist_search_active' onClick={playsongtd}>
                            <td style={{ 'textAlign': 'center', 'borderTopLeftRadius': '5px', 'borderBottomLeftRadius': '5px', 'width': '7%' }} className='songtd index_class' id={`${song.id} index`}>{index + 1}</td>
                            <td id={song.id} style={{ 'display': 'flex' }} className='songtd search_impinfo'>
                              <img src={`${song.firebase_image_url}`} className='songtdsearch_img' />
                              <div id={song.id} className='songtdsearch_div'>
                                <span className='spansearch_class' id={`${song.id} name`}>{song.name}</span>
                                {song.artist}
                              </div>
                            </td>
                            <td className='songtd search_addtninfo' style={{ 'borderBottomRightRadius': '5px', 'borderTopRightRadius': '5px', 'width': '20%' }}><div style={{ 'display': 'flex', 'columnGap': '30px', 'paddingRight': '5px' }}><i className="bi bi-heart" id={`heart ${song.id}`} onClick={liked_song}></i><span>{duration}</span></div></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="belowsearch">
            <div id="artistbox_main">
              <div className='heading_search'>Artist</div>
              <div className="genbox_flex_search">
                {
                  artist.map((val) => {
                    return (
                      <div className='search_artist_col_flex'>
                        {
                          val.map((artist_key) => {
                            return (
                              <div key={artist_key.id} className='artist_cover_box' >
                                <div className="genbox_search">
                                  <div>
                                    <img src={`${artist_key.firebase_artist_image_url}`} alt="Image" className="searchresult_img artist" />
                                  </div>
                                  <div className="searchresult_text1 artisttext">
                                    {artist_key.name}
                                  </div>
                                  <div className="searchresult_text2">Artist</div>
                                </div>
                                <div className="search_artist_cover" id={artist_key.name} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={artistinfo}>
                                  <img src={p} className='playicon_design' id={`${artist_key.name} play`} onClick={artistPlay} />
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div></div>

            <div id="albumbox_main">
              <div className='heading_search'>Album</div><br />
              <div className="search_artist_col_flex">
                {
                  album.map((album_key) => {
                    return (
                      <div key={album_key.id} className='artist_cover_box' >
                        <div className="genbox_search">
                          <div>
                            <img src={`${album_key.firebase_image_url}`} alt="Image" className="searchresult_img albumimg" />
                          </div>
                          <div className="searchresult_album_main">
                            {album_key.album}
                          </div>
                          <div className="searchresult_album">Album</div>
                        </div>
                        <div className="search_artist_cover" id={album_key.album} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={getAlbum}>
                          {/* <img src={p} className='playicon_design' id={`${album_key.album} play`} /> */}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//Search
function getelement_search(e) {
  let w = document.getElementById(`${e.target.id} play`)
  try {
    w.style.display = 'block'
    setTimeout(() => {
      w.className = `playicon_design_search animateicon`
    }, 200)
  } catch (error) { }
}
function removeelement_search(e) {
  let w = document.getElementsByClassName('playicon_design_search')
  try {
    for (let item of w) {
      item.style.display = 'none'
      item.className = `playicon_design_search`
    }
  } catch (error) { }
}

//Normal Artist function
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

export default Searchpage
