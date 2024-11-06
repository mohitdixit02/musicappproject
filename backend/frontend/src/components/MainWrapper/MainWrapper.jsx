import React, { createContext, useContext, useState } from 'react';
import Leftpannel from '../LeftPannel/Leftpannel';
import Play from '../AudioPlayer/Player/Play';
import "../../App.css";

const trackContext = createContext();

export default function MainWrapper({ children }) {
    const [trackslist, setTrackslist] = useState(['']);
    const [actvstate, setActivestate] = useState(0);
    const [current_track, setCurrent_track] = useState({});

    const contextValue = {
        trackslist,
        setTrackslist,
        actvstate,
        setActivestate,
        current_track,
        setCurrent_track
    }

    return (
        <trackContext.Provider value={contextValue}>
            <div className='top'>
                <Leftpannel />
                <div className='app_content_box'>
                    {children}
                </div>
                <Play />
            </div>
        </trackContext.Provider >
    )
}

export const useTrackContext = () => useContext(trackContext);