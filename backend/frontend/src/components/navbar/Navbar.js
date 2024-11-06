import React from 'react';
import { useLocation } from "react-router-dom";
import './Navbar.css'
import Button from './Nav Comp/Button';
import Search from './Nav Comp/Search';
import User from './Nav Comp/User';

const Navbar = (props) => {
    const location = useLocation();
    // if(location.pathname!='/info'){
    return (
        <>
            <div className='nav' style={{
                'backgroundColor': props.bgcolor
            }}>
                <div className="left_nav">
                    <Button />
                    <Search display={props.display} setSearchvalue={props.setSearchvalue} />
                </div>
                <User/>
            </div>
        </>
    );
    // }
    // else if(location.state.type=='music' || location.state.type=='album'){
    //     return (
    //         <>
    //         <div className='nav' style={{
    //             'backgroundColor': 'rgba(210,58,95,255)'
    //         }}>
    //             <div className="left_nav">
    //             <Button/>
    //             <Search display={props.display}/>
    //             </div>
    //             <User user={props.user} setUser={props.setUser}/>
    //         </div>
    //     </>
    //     );
    // }
    // else if(location.state.type=='artist'){
    //     return (
    //         <>
    //         <div className='nav' style={{
    //             'backgroundColor':'rgba(48,88,208,255)'
    //         }}>
    //         <div className="left_nav">
    //             <Button/>
    //             <Search display={props.display}/>
    //             </div>
    //             <User user={props.user} setUser={props.setUser}/>
    //         </div>
    // </>
    // );
    // }
}

export default Navbar;

